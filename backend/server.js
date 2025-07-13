const express = require('express');
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken');
const http = require('http');
const path = require('path')
const fs = require('fs').promises
const server = http.createServer(app);
const { Server } = require('socket.io');
const PORT=process.env.PORT || 8000;
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
const secret = '3456'

const activeRooms = new Set();
const games = {};

// Helper to check win
function checkWin(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell)) return 'draw';
  return null;
}

// Save match result
async function recordMatch(match) {
  const file = path.join(__dirname, 'matches.json');
  let matches = [];
  try {
    const data = await fs.readFile(file, 'utf8');
    matches = JSON.parse(data);
  } catch (e) { }
  matches.push(match);
  await fs.writeFile(file, JSON.stringify(matches, null, 2));
}

app.post('/createtoken', async (req, res) => {
  console.log('A user entered ')
  const name = req.body.name;
  const token = jwt.sign(name, secret)

  try {
    const users = await fs.readFile(path.join(__dirname, 'user.json'), 'utf8')
    const userObj = JSON.parse(users)
    userObj.push({ name: name, token: token })
    await fs.writeFile(path.join(__dirname, 'user.json'), JSON.stringify(userObj, null, 2))
    res.status(200).json({ message: 'success', token: token })
  }
  catch (error) {
    res.status(500).json({ message: 'error' })
  }
})

// Socket.io logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle room creation
  socket.on('create-room', ({ roomCode, name }) => {
    console.log(`${name} (${socket.id}) attempting to create room: ${roomCode}`);
    
    // Check if room already exists
    if (games[roomCode]) {
      socket.emit('room-creation-result', { 
        success: false, 
        message: 'Room already exists' 
      });
      return;
    }

    // Create new room
    games[roomCode] = {
      players: [],
      board: Array(9).fill(null),
      turn: 'X',
      winner: null,
      moves: [],
    };
    activeRooms.add(roomCode);
    
    // Add creator as first player (X)
    games[roomCode].players.push({ 
      id: socket.id, 
      name, 
      symbol: 'X' 
    });
    
    socket.join(roomCode);
    
    console.log(`Room ${roomCode} created successfully by ${name}`);
    socket.emit('room-creation-result', { 
      success: true, 
      message: 'Room created successfully',
      roomCode: roomCode,
      symbol: 'X',
      board: games[roomCode].board,
      turn: games[roomCode].turn,
      players: games[roomCode].players
    });
  });

  // Handle room joining
  socket.on('join-room', ({ roomCode, name }) => {
    console.log(`${name} (${socket.id}) attempting to join room: ${roomCode}`);
    
    if (!games[roomCode]) {
      socket.emit('join-room-result', { 
        success: false, 
        message: 'Room not found' 
      });
      return;
    }

    // Check if room is full
    if (games[roomCode].players.length >= 2) {
      socket.emit('join-room-result', { 
        success: false, 
        message: 'Room is full' 
      });
      return;
    }

    // Check if this player is already in the room
    const existingPlayer = games[roomCode].players.find(p => p.name === name || p.id === socket.id);
    if (existingPlayer) {
      socket.emit('join-room-result', { 
        success: false, 
        message: 'You are already in this room' 
      });
      return;
    }

    // Add player as O (second player)
    games[roomCode].players.push({ 
      id: socket.id, 
      name, 
      symbol: 'O' 
    });
    
    socket.join(roomCode);
    
    // Notify the joining player
    socket.emit('join-room-result', { 
      success: true, 
      message: 'Successfully joined room',
      roomCode: roomCode,
      symbol: 'O',
      board: games[roomCode].board,
      turn: games[roomCode].turn,
      players: games[roomCode].players
    });
    
    // Notify all players in the room about the new player
    io.to(roomCode).emit('player-joined', { 
      players: games[roomCode].players,
      message: `${name} joined the room`
    });
    
    console.log(`${name} joined room ${roomCode} as player 2 (O)`);
    console.log(`Room ${roomCode} now has ${games[roomCode].players.length} players`);
  });

  // Handle game moves
  socket.on('make-move', async ({ roomCode, index }) => {
    const game = games[roomCode];
    if (!game || game.winner) return;
    
    const player = game.players.find(p => p.id === socket.id);
    if (!player || game.turn !== player.symbol || game.board[index]) return;
    
    game.board[index] = player.symbol;
    game.moves.push({ index, symbol: player.symbol, player: player.name });
    
    const winner = checkWin(game.board);
    if (winner) {
      game.winner = winner;
      io.to(roomCode).emit('game-update', { 
        board: game.board, 
        turn: null, 
        winner, 
        players: game.players 
      });
      
      await recordMatch({
        roomCode,
        players: game.players.map(p => p.name),
        winner: winner === 'draw' ? 'draw' : game.players.find(p => p.symbol === winner)?.name,
        moves: game.moves,
        timestamp: new Date().toISOString()
      });
      
      // Clean up after some delay
      setTimeout(() => {
        delete games[roomCode];
        activeRooms.delete(roomCode);
        console.log(`Room ${roomCode} cleaned up after game completion`);
      }, 10000);
    } else {
      game.turn = game.turn === 'X' ? 'O' : 'X';
      io.to(roomCode).emit('game-update', { 
        board: game.board, 
        turn: game.turn, 
        winner: null, 
        players: game.players 
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Find and clean up rooms where this player was present
    for (const [roomCode, game] of Object.entries(games)) {
      const playerIndex = game.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        const disconnectedPlayer = game.players[playerIndex];
        // Remove player from game
        game.players.splice(playerIndex, 1);
        
        // If no players left, clean up the room
        if (game.players.length === 0) {
          delete games[roomCode];
          activeRooms.delete(roomCode);
          console.log(`Room ${roomCode} cleaned up - no players left`);
        } else {
          // Notify remaining players
          io.to(roomCode).emit('player-disconnected', { 
            players: game.players,
            message: `${disconnectedPlayer.name} disconnected`
          });
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});