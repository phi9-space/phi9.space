import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/PHI9.SPACE.svg" alt="PHI9.SPACE Logo" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link 
          to="/manifesto"
          className={`nav-link ${location.pathname === '/manifesto' ? 'active' : ''}`}>
            Manifesto
        </Link>
        <a href="mailto:a3fckx@proton.me" className="nav-link">Contact</a>
        {/* Add other links here as pages are created */}
      </div>
    </nav>
  );
};

export default Navbar;
