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
        {/* Logo */}
        <div className="text-5xl font-extrabold tracking-wide text-white">VS</div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex space-x-8 text-xl">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
          <Link to="/certifications" className={linkClass('/certifications')}>Certifications</Link>
          <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
        </div>
      </div>

      {/* Mobile Menu - centered horizontally & vertically */}
      {menuOpen && (
        <div className="md:hidden px-8  space-y-6 text-lg flex flex-col items-center  h-50">
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
