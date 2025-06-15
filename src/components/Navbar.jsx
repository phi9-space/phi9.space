import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/PHI9 LOGO.svg" alt="PHI9 Logo" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link 
          to="/manifesto"
          className={`nav-link ${location.pathname === '/manifesto' || location.pathname === '/' ? 'active' : ''}`}>
            Manifesto
        </Link>
        {/* Add other links here as pages are created */}
        <Link to="#" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
