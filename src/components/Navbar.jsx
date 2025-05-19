import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo"></h2>
      <ul className="nav-links">
        <li><Link to="/">Bosh Sahifa</Link></li>
        <li><Link to="/tarjimalar">Tarjimalar</Link></li>
        <li><Link to="/fragmentlar">Fragmentlar</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
