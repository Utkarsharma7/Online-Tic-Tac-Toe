import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSocket } from '../components/CreateRoom';

import cross from '../assets/cross.svg'
import circle from '../assets/circle.svg'

function PlayArea() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [players, setPlayers] = useState([]);
  const [symbol, setSymbol] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [myName, setMyName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the required state from CreateRoom/JoinRoom
    if (!location.state) {
      navigate('/'); // Redirect to home if no state
      return;
    }

    const { roomCode: code, symbol: playerSymbol, gameData } = location.state;
    const name = localStorage.getItem('name') || '';
    
    // Initialize state with data from CreateRoom/JoinRoom
    setRoomCode(code);
    setMyName(name);
    setSymbol(playerSymbol);
    setBoard(gameData.board);
    setTurn(gameData.turn);
    setPlayers(gameData.players);

    // Get the existing socket
    const socket = getSocket();

    // Set up socket listeners with the correct event names
    const handlePlayerJoined = (data) => {
      console.log('Player joined:', data);
      setPlayers(data.players);
    };

    const handleGameUpdate = (data) => {
      console.log('Game update:', data);
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(data.winner);
      setPlayers(data.players);
    };

    const handlePlayerDisconnected = (data) => {
      console.log('Player disconnected:', data);
      setPlayers(data.players);
      // Optionally show a message that opponent disconnected
    };

    // Clean up existing listeners
    socket.off('player-joined');
    socket.off('game-update');
    socket.off('player-disconnected');

    // Add new listeners
    socket.on('player-joined', handlePlayerJoined);
    socket.on('game-update', handleGameUpdate);
    socket.on('player-disconnected', handlePlayerDisconnected);

    // Cleanup function
    return () => {
      socket.off('player-joined', handlePlayerJoined);
      socket.off('game-update', handleGameUpdate);
      socket.off('player-disconnected', handlePlayerDisconnected);
    };
  }, [location.state, navigate]);

  const handleCellClick = (idx) => {
    if (winner || !symbol || board[idx] || turn !== symbol) return;
    
    const socket = getSocket();
    socket.emit('make-move', { roomCode, index: idx });
  };

  const getCellImg = (cell) => {
    if (cell === 'X') return <img src={cross} alt="X" className="w-16 h-16" />;
    if (cell === 'O') return <img src={circle} alt="O" className="w-16 h-16" />;
    return null;
  };

  const getStatus = () => {
    if (winner === 'draw') return "It's a draw!";
    if (winner) {
      const winPlayer = players.find(p => p.symbol === winner);
      return winPlayer ? `${winPlayer.name} (${winner}) wins!` : `${winner} wins!`;
    }
    if (players.length < 2) {
      return 'Waiting for opponent to join...';
    }
    if (turn && symbol) {
      const turnPlayer = players.find(p => p.symbol === turn);
      if (turn === symbol) return `Your turn (${symbol})`;
      return turnPlayer ? `Waiting for ${turnPlayer.name} (${turn})` : `Waiting for opponent...`;
    }
    return 'Loading...';
  };

  const getOpponentName = () => {
    const opponent = players.find(p => p.symbol !== symbol);
    return opponent ? opponent.name : 'Waiting...';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="mb-2">You <span className="font-bold">{myName}</span> ({symbol})</div>
      <div className="mb-2">Opponent: <span className="font-bold">{getOpponentName()}</span></div>
      <div className="mb-4 text-lg font-semibold">{getStatus()}</div>
      <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-lg">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="w-30 h-30 flex items-center justify-center bg-gray-900 rounded-lg text-3xl focus:outline-none hover:bg-gray-700 disabled:hover:bg-gray-900"
            onClick={() => handleCellClick(idx)}
            disabled={!!cell || winner || turn !== symbol || players.length < 2}
          >
            {getCellImg(cell)}
          </button>
        ))}
      </div>
      {winner && (
        <button
          className="mt-6 px-6 py-2 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-700"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      )}
      {players.length < 2 && (
        <div className="mt-4 text-yellow-400">
          Share room code "{roomCode}" with your friend to start playing!
        </div>
      )}
    </div>
  );
}

export default PlayArea