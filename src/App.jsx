import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Certifications from './Pages/Certifications'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar/Navbar'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminDashboard from './Components/Admin/AdminDashboard'
import { Toaster } from 'react-hot-toast'

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/projects'} element={<Projects />} />
            <Route path={'/certifications'} element={<Certifications />}/>
            <Route path={'/contact'} element={<Contact />} />
          </Route>
          <Route path={'/login'} element={<AdminLogin />} />
          <Route path={'/admin'} element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
