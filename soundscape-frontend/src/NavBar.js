// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-tabs">
        <li className="nav-tab">
          <Link to="/">Library</Link>
        </li>
        <li className="nav-tab">
          <Link to="/upload-form">Upload Song</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
