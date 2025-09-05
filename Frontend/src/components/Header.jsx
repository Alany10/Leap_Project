import React from 'react';
import { Link } from 'react-router-dom';
import HiQLogo from '../assets/HiQ-black.png'; 

function Header() {
  const headerStyle = {
    background: 'linear-gradient(270deg, #ffb6c1, #ff69b4)',
    padding: '15px 30px',
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.2s, transform 0.1s',
  };

  return (
    <header style={headerStyle}>
      <a href="https://www.hiq.se" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>
        <img src={HiQLogo} alt="HiQ Logo" style={{ width: '80px', cursor: 'pointer' }} />
      </a>

      <Link className="header-link" to="/" style={linkStyle}>
        Hem
      </Link>
      <Link className="header-link" to="/create" style={linkStyle}>
        Skapa
      </Link>
      <Link className="header-link" to="/all" style={linkStyle}>
        Se alla
      </Link>

      {/* Hover-effekt */}
      <style>
        {`
          .header-link:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
          }
        `}
      </style>
    </header>
  );
}

export default Header;
