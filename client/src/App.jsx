import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
import axios from 'axios'



function App() {
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials  = true;
  return (
    <>
      <Register></Register>
    </>
  )
}

export default App
