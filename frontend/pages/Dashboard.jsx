import React, { useState } from 'react'
import JoinRoom from '../components/JoinRoom'
import CreateRoom from '../components/CreateRoom'
function Dashboard() {
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);
  const [isCreateRoomOpen,setIsCreateRoomOpen] = useState(false);
  const name=sessionStorage.getItem('name');
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-black gap-20">
        
        <p className="mt-5 text-15xl sm:text-7xl lg:text-8xl font-bold leading-tight text-white text-center font-pj">
           Welcome {name}!
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
            <a
                        href="#"
                        title=""
                        className="inline-flex items-center justify-center px-10 py-5 text-2xl font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-2xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        role="button"
                        onClick={()=>setIsCreateRoomOpen(true)}
                    >
                        Create Room
                    </a>
                    <a
                        href="#"
                        title=""
                        className="inline-flex items-center justify-center px-10 py-5 text-2xl font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-2xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        role="button"
                        onClick={() => setIsJoinRoomOpen(true)}
                    >
                        Join Room
                    </a>     
                          
                     </div>
                     <div>
                      <p className='text-white text-xl font-bold'>Creating a room or joining a room will be a little slow on the first time as this app is deployed on the free tier of render</p>
                     </div>
        <JoinRoom isOpen={isJoinRoomOpen} onClose={() => setIsJoinRoomOpen(false)} />
        <CreateRoom isOpen={isCreateRoomOpen} onClose={() => setIsCreateRoomOpen(false)} />
      </div>
      </div>
  )
}

export default Dashboard
