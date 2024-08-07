import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './features/header/Header'


function App() {
  return (
    <>
      <Header></Header>
    </>
  )
}

export default App
