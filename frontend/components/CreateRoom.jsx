import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

// Single socket instance for the app
let socket = null;

const getSocket = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (!socket || socket.disconnected) {
    socket = io(url);
  }
  return socket;
};

function CreateRoom({isOpen, onClose}) {
    const [roomCode, setRoomCode] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // Clean up any existing listeners
            const currentSocket = getSocket();
            currentSocket.off('room-creation-result');
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        const name = localStorage.getItem('name') || '';
        if (!roomCode.trim()) {
            alert("Room code should not be empty!");
            return;
        }
        if (!name.trim()) {
            alert("Name not found. Please log in first.");
            return;
        }

        setIsCreating(true);
        const currentSocket = getSocket();
        
        // Clean up previous listeners
        currentSocket.off('room-creation-result');
        
        // Set up listener for room creation result
        currentSocket.on('room-creation-result', (data) => {
            setIsCreating(false);
            if (data.success) {
                console.log('Room created successfully:', data);
                onClose();
                // Navigate to playarea with the room data
                navigate('/playarea', { 
                    state: { 
                        roomCode: data.roomCode,
                        symbol: data.symbol,
                        isCreator: true,
                        gameData: {
                            board: data.board,
                            turn: data.turn,
                            players: data.players
                        }
                    } 
                });
            } else {
                alert(data.message || "Could not create room");
            }
        });

        // Emit create room event
        currentSocket.emit('create-room', { roomCode, name });
    };

    return (
       <>
        <div
          className={`${isOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen`}
          tabIndex="-1"
          aria-hidden={!isOpen}
        >
          <div className="relative p-8 w-full max-w-2xl h-auto ">
            {/* Modal content */}
            <div className="relative bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-4xl font-semibold text-white dark:text-white">
                 Create a room!
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className='flex flex-col justify-center items-center flex-1 gap-y-3 gap-x-10'>
                <div className="p-4 md:p-10 w-full">
                  <div className="space-y-13">
                    <div>
                      <label
                        htmlFor="roomCode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      </label>
                      <input
                        type="text"
                        name="roomCode"
                        id="roomCode"
                        className="bg-white border border-gray-300 text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Create a room code"
                        value={roomCode}
                        onChange={e => setRoomCode(e.target.value)}
                        disabled={isCreating}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isCreating}
                      className="w-full text-xl py-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-white text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                    >
                      {isCreating ? 'Creating...' : 'Create Room'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

// Export the socket getter for use in other components
export { getSocket };
export default CreateRoom;