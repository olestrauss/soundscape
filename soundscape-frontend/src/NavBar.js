// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-tabs">
        <li className="nav-tab-logo">
          <Link to="/">
            <img src="logo_no_bg.png" alt="Logo" width="150" height="22"/>
          </Link>
        </li>
        <li className="nav-tab">
          <Link to="/">Library</Link>
        </li>
        <li className="nav-tab">
          <Link to="/upload-form">Upload</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
