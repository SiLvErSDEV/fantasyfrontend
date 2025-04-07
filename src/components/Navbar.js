import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importaremos un archivo CSS para los estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Fantasy Liga 1</Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/team" className="navbar-link">Elige tu Equipo</Link>
        <Link to="/auth" className="navbar-link">Login/Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;