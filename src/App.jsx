import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Certifications from './Pages/Certifications'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/projects'} element={<Projects />} />
          <Route path={'/certifications'} element={<Certifications />}/>
          <Route path={'/contact'} element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
