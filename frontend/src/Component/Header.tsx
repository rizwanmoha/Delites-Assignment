import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [showNavLinks, setShowNavLinks] = useState<boolean>(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Highway Delite</Link>
        </div>
        <ul className={`nav-links ${showNavLinks ? 'active' : ''}`}>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <div className="burger" onClick={toggleNavLinks}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;