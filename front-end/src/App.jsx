import './App.css'

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
