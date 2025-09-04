import React from 'react';
import HiQLogo from '../assets/HiQ-pink.png';

function Home() {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center',
  };

  const logoStyle = {
    width: '150px',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#ff69b4',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <img src={HiQLogo} alt="HiQ Logo" style={logoStyle} />
      <h1 style={headingStyle}>Välkommen till kvalitetsappen!</h1>
      <p style={textStyle}>
        Denna hemsida är framtagen för att på ett enkelt och strukturerat sätt följa upp
        kvaliteten på våra konsulter, säljare och samarbeten. Genom digitala kvalitetsformulär
        kan vi skapa en tydlig bild av hur samarbeten fungerar och var det finns utrymme
        för förbättring.
      </p>
      <p style={textStyle}>
        Här kan du:
        <ul style={{ textAlign: 'left', margin: '20px auto', maxWidth: '600px' }}>
          <li>Skapa nya formulär</li>
          <li>Se alla tidigare inskickade formulär</li>
          <li>Söka efter formulär med fritext eller filter</li>
          <li>Sortera baserat på olika egenskaper</li>
          <li>Redigera befintliga formulär</li>
          <li>Radera formulär som inte längre behövs</li>
        </ul>
      </p>
      <p style={textStyle}>
        Syftet med appen är att stärka samarbeten och säkerställa hög kvalitet i varje steg.
        Genom kontinuerlig uppföljning kan vi fånga upp vad som fungerar bra och identifiera
        förbättringsområden, vilket bidrar till nöjdare kunder, konsulter och säljare.
      </p>
    </div>
  );
}

export default Home;
