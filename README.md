# 🎮 Online Tic-Tac-Toe

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online%20Tic%20Tac%20Toe-blue?style=for-the-badge&logo=render)](https://online-tic-tac-toe-frontend.onrender.com/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20Node.js%20%7C%20Socket.io-blue?style=for-the-badge)](https://github.com/Utkarsharma7/Online-Tic-Tac-Toe)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **Experience the classic Tic-Tac-Toe game reimagined for the modern web!** 🚀

A real-time multiplayer Tic-Tac-Toe game built with React, Node.js, and Socket.io. Challenge your friends online with beautiful animations, smooth gameplay, and an intuitive user interface.

## ✨ Features

### 🎯 Core Gameplay
- **Real-time Multiplayer**: Play with friends in real-time using WebSocket connections
- **Room-based System**: Create or join rooms with unique codes for private games
- **Turn-based Mechanics**: Smooth turn transitions with visual indicators
- **Win Detection**: Automatic win detection for rows, columns, and diagonals
- **Draw Detection**: Handles tied games gracefully

### 🎨 User Experience
- **Beautiful UI/UX**: Modern, responsive design with gradient animations
- **Particle Effects**: Stunning background particle animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant game state synchronization
- **Player Names**: Personalized experience with custom player names

### 🔧 Technical Features
- **WebSocket Communication**: Real-time bidirectional communication
- **Session Management**: Secure user authentication and session handling
- **Game State Persistence**: Match history and results tracking
- **Error Handling**: Robust error handling for network issues
- **Cross-platform**: Works on all modern browsers

###ScreenShots
<img width="1882" height="840" alt="Screenshot 2025-07-13 141548" src="https://github.com/user-attachments/assets/86e5ad4d-d5d5-4ac6-9c8b-2c6c2b061f1c" />

<img width="1874" height="781" alt="Screenshot 2025-07-13 141603" src="https://github.com/user-attachments/assets/602db91c-e2f5-4def-9f80-0c1ec31fdb0c" />

<img width="1517" height="807" alt="Screenshot 2025-07-13 141656" src="https://github.com/user-attachments/assets/ef014c92-33d6-479f-9d9c-9fac543d7c5d" />

<img width="1775" height="798" alt="Screenshot 2025-07-13 141708" src="https://github.com/user-attachments/assets/0a52ea76-5cd5-41bf-9633-ea7b5e430e85" />


## 🚀 Live Demo

**🎮 [Play Now](https://online-tic-tac-toe-frontend.onrender.com/)**

> **Pro Tip**: Duplicate the browser tab to simulate a two-player environment for testing!

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **CORS** - Cross-origin resource sharing

### Deployment
- **Render.com** - Cloud hosting platform
- **JSON File Storage** - Simple data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=8000
JWT_SECRET=your_secret_key_here
```

## 🎮 How to Play

1. **Enter the Game**: Click "Enter" on the homepage
2. **Enter Your Name**: Provide your name to get started
3. **Create or Join Room**:
   - **Create Room**: Generate a unique room code
   - **Join Room**: Enter an existing room code
4. **Share Room Code**: Send the room code to your friend
5. **Start Playing**: Take turns placing X's and O's
6. **Win Conditions**: Get three in a row to win!

## 🏗️ Project Structure

```
Online-Tic-Tac-Toe/
├── frontend/                 # React frontend application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── assets/             # Static assets (images, icons)
│   ├── Effect/             # Animation effects
│   └── src/                # Source files
├── backend/                 # Node.js backend server
│   ├── server.js           # Main server file
│   ├── matches.json        # Game history storage
│   └── user.json           # User data storage
└── README.md               # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /createtoken` - Create JWT token for user authentication

### WebSocket Events
- `create-room` - Create a new game room
- `join-room` - Join an existing room
- `make-move` - Make a game move
- `player-joined` - Player joined notification
- `game-update` - Game state updates
- `player-disconnected` - Player left notification

## 🎨 Key Components

### Frontend Components
- **Homepage**: Landing page with particle effects
- **Dashboard**: User dashboard with room options
- **PlayArea**: Main game interface
- **CreateRoom**: Room creation modal
- **JoinRoom**: Room joining modal
- **LogIn**: User authentication modal

### Backend Features
- **Room Management**: Create and manage game rooms
- **Game Logic**: Win detection and turn management
- **Real-time Communication**: WebSocket event handling
- **Data Persistence**: Match history and user data storage

## 🚀 Deployment

### Frontend (Render.com)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment**: Static site

### Backend (Render.com)
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment**: Web service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Socket.io** for real-time communication
- **Tailwind CSS** for beautiful styling
- **Vite** for fast development experience
- **Render.com** for hosting services

## 📞 Contact

**Developer**: [Utkarsh Sharma](https://github.com/Utkarsharma7)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/Utkarsharma7/Online-Tic-Tac-Toe?style=social)](https://github.com/Utkarsharma7/Online-Tic-Tac-Toe)
[![GitHub forks](https://img.shields.io/github/forks/Utkarsharma7/Online-Tic-Tac-Toe?style=social)](https://github.com/Utkarsharma7/Online-Tic-Tac-Toe)

</div>
