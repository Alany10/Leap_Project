import React from 'react';
import HiQLogo from '../assets/HiQ-pink.png'; // Justera sökvägen om det behövs

function Footer() {
  const footerStyle = {
    backgroundColor: '#000000ff',
    color: '#ffffffff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    marginTop: '40px',
  };

  const logoStyle = {
    width: '100px',
    marginBottom: '10px',
    cursor: 'pointer',
  };

  const textStyle = {
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  return (
    <footer style={footerStyle}>
      {/* HiQ-logo som länk */}
      <a href="https://www.hiq.se" target="_blank" rel="noopener noreferrer">
        <img src={HiQLogo} alt="HiQ Logo" style={logoStyle} />
      </a>

      <div style={textStyle}>
        <p>Denna webapp används för kvalitetsuppföljning och hantering av formulär.</p>
        <p>Skapad av Alan Youssef</p>
      </div>
    </footer>
  );
}

export default Footer;
