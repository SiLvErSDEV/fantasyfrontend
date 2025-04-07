import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TeamSelection from './pages/TeamSelection';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamSelection />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>

        {/* Contenedor Flex para el segundo iframe y la imagen */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <iframe
          id="sofa-standings-embed-34467-70962"
          src="https://widgets.sofascore.com/es-ES/embed/tournament/34467/season/70962/standings/Liga%201%202025%2C%20Apertura?widgetTitle=Liga%201%202025%2C%20Apertura&showCompetitionLogo=true"
          style={{
            height: '1083px',
            maxWidth: '768px',
            width: '100%',
            border: 'none'
          }}
          scrolling="no"
        ></iframe>
          <img
            src="/images/nextSchedule.png"
            alt="Next Schedule"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;