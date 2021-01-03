import React from 'react';
import './style.css';
import NavMenu from './NavMenu';

function Header() {
  const navMenu = ["ABOUT", "NEWS", "INTERESTING", "SETTINGS", "SIGN OUT"]
  return (
    <div className="wrapper">
        <h1>VIOLETTA</h1>
        <NavMenu navMenu = {navMenu} />
    </div>
  );
}

export default Header;