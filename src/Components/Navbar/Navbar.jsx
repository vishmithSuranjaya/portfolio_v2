import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `pb-1 transition duration-150 border-b-2 border-transparent hover:border-[#fab13a] hover:text-[#fab13a] ${
      location.pathname === path ? 'text-[#fab13a] border-[#fab13a]' : ''
    }`;

  return (
    <div className="w-full flex justify-between items-center px-8 py-4 bg-[#0f172a] text-white font-sans font-bold shadow-lg">
      
      {/* Left: Logo or Initials */}
      <div className="text-5xl font-extrabold tracking-wide text-white">
        VS
      </div>

      {/* Right: Nav Links */}
      <div className="flex space-x-8 text-xl">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/certifications" className={linkClass('/certifications')}>Certifications</Link>
        <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
