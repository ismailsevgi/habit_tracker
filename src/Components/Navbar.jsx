import React from 'react';
import '../CSS-Files/Navbar.css';
import Logo from '../Logo/newLogo.jpg';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='container nav'>
      <img src={Logo} />

      <div className='links'>
        <NavLink className='Logo' to='/'>
          Main Page
        </NavLink>
        <NavLink className='Logo' to='/habits'>
          Habits
        </NavLink>
        <NavLink className='Logo' to='/performance'>
          Performance
        </NavLink>
        <NavLink className='Logo' to='/notes/'>
          Notes
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
