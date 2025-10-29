import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path) =>
    `pb-1 transition duration-150 border-b-2 border-transparent hover:border-[#fab13a] hover:text-[#fab13a] ${
      location.pathname === path ? 'text-[#fab13a] border-[#fab13a]' : ''
    }`;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-[#0f172a] text-white font-sans font-bold shadow-lg">
      <div className="flex justify-between items-center px-8 py-4">

        {/* 🔹 RAINBOW GLOWING LOGO */}
        <div
          className="flex items-center text-5xl font-extrabold tracking-tight
                     bg-gradient-to-r from-red-500 via-orange-400 via-yellow-300 via-green-400 via-cyan-400 via-blue-500 via-purple-500 to-red-500
                     bg-[length:400%_100%] bg-clip-text text-transparent
                     animate-[rainbow_6s_linear_infinite] leading-none select-none
                     drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
        >
          VS
          <style jsx>{`
            @keyframes rainbow {
              0% {
                background-position: 0% 50%;
              }
              100% {
                background-position: 400% 50%;
              }
            }
          `}</style>
        </div>

        {/* 🔹 HAMBURGER (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* 🔹 NAV LINKS (Desktop) */}
        <div className="hidden md:flex space-x-8 text-xl items-center">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
          <Link to="/certifications" className={linkClass('/certifications')}>Certifications</Link>
          <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
        </div>
      </div>

      {/* 🔹 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-8 space-y-6 text-lg flex flex-col items-center">
          <Link to="/" onClick={closeMenu} className={linkClass('/')}>Home</Link>
          <Link to="/projects" onClick={closeMenu} className={linkClass('/projects')}>Projects</Link>
          <Link to="/certifications" onClick={closeMenu} className={linkClass('/certifications')}>Certifications</Link>
          <Link to="/contact" onClick={closeMenu} className={linkClass('/contact')}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
