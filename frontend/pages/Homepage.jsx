import React, { useState } from 'react'
import LogIn from '../components/LogIn'
import Particles from '../Effect/Particles/Particles'
function Homepage() {
    const [isLogInOpen, setIsLogInOpen] = useState(false);
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-black gap-20 overflow-hidden">
            {/* Background particles */}
            <Particles particleCount={400} speed={1.5} sizeRandomness={3.0} cameraDistance={15}/>
            
            {/* Main content */}
            <p className="mt-5 text-15xl sm:text-7xl lg:text-8xl font-bold leading-tight text-white text-center font-pj">
                Play
                <span className="relative inline-flex sm:inline ml-4">
                    <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                    <span className="relative">Tic Tac Toe </span>
                </span>
                at ease 
                <p>1v1 Online Showdown</p>
            </p>
           
            <div className="flex flex-col sm:flex-row gap-6">
                
                <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center px-10 py-5 text-2xl font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-2xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                    onClick={() => setIsLogInOpen(true)}
                >
                    Enter
                </a>     
            </div>
            <LogIn isOpen={isLogInOpen} onClose={() => setIsLogInOpen(false)} />
            <Particles particleCount={400} speed={1.5} sizeRandomness={4.0}/>
        </div>
    )
}

export default Homepage
