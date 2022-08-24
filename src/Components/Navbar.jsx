import React from 'react';
import '../CSS-Files/Navbar.css';
import Logo from '../Logo/newLogo.jpg';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='container'>
      <div className='row nav'>
        <img className='col-sm-4' src={Logo} />

        <div className='col-sm-8 rowLinks'>
          <NavLink className='col-3 Logo' to='/habits'>
            Habits
          </NavLink>
          <NavLink className='col-3 Logo' to='/performance'>
            Performance
          </NavLink>
          <NavLink className='col-3 Logo' to='/notes/tasks'>
            Notes
          </NavLink>
          <NavLink className='col-3 Logo' to='/focus'>
            Focus
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
