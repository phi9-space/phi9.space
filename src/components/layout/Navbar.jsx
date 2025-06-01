import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const NavLinks = ({ isMobile = false }) => {
    const links = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Contact', path: '/contact' },
    ];

    return (
      <ul className={`${isMobile ? 'flex flex-col items-center space-y-8' : 'flex items-center space-x-10'}`}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`relative group text-lg font-medium ${
                isMobile
                  ? 'text-accent hover:text-primary text-2xl py-2'
                  : 'text-accent hover:text-primary transition-colors duration-300'
              }`}
              onClick={() => isMobile && toggleMenu()}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm py-2' : 'bg-transparent py-6'}`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group">
          <div className="flex flex-col leading-none">
            <span className="logo-text text-5xl md:text-6xl text-primary group-hover:text-primary-light transition-colors duration-300">194 PHi</span>
            <span className="logo-subtext text-sm md:text-base text-accent mt-1">DOT SPACE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <NavLinks />
          <Link 
            to="/contact" 
            className="btn btn-primary ml-4"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-accent hover:text-primary focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="h-8 w-8" />
            ) : (
              <FiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 md:hidden bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center space-y-12">
          <NavLinks isMobile={true} />
          <Link
            to="/contact"
            className="btn btn-primary px-12 py-4 text-lg"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
