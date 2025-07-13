import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function LogIn({isOpen,onClose}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const url = import.meta.env.VITE_API_BASE_URL;
    const handleSubmit = async () => {
        if (!name.trim()) {
            alert("Name should not be empty!");
            return;
        }
        try {
            const response = await axios.post(`${url}/createtoken`, { name })
            const data = response.data;
            if (data.token) {
                sessionStorage.setItem('name', name);
                onClose();
                console.log(name)
                navigate('/dashboard');
            } else {
                alert("Error creating token. Try again.");
            }
        } catch (error) {
            console.log(error);
            alert("Error connecting to server.");
        }
    }
    return (
       <>
        <div
          className={`${isOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-start pt-20 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          tabIndex="-1"
          aria-hidden={!isOpen}
        >
          <div className="relative p-8 w-full max-w-2xl h-auto ">
            {/* Modal content */}
            <div className="relative bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 min-h-[450px] flex flex-col">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">

                <h3 className="text-4xl font-semibold text-white dark:text-white">
                Enter name of the user
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
              <div className='flex flex-col justify-center items-center flex-1 gap-y-3 gap-x-10'>              
                {/* Logo removed since it's not defined */}
              
              <div className="p-4 md:p-10">
                <div className="space-y-13">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full text-xl py-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-white text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
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
export default LogIn
