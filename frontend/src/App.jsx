import { useState } from 'react'
import Homepage from '../pages/Homepage'
import Dashboard from '../pages/Dashboard'
import PlayArea from '../pages/PlayArea'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {

 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/PlayArea' element={<PlayArea />} />

    </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
