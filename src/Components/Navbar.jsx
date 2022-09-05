import React from 'react';
import '../CSS-Files/Navbar.css';

import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='container-fluid'>
        <div className='nav'>
          <div className='logo'>
            <NavLink to='/habits'>
              <h1>HABIT</h1>
              <h1>TRACKER</h1>
            </NavLink>
          </div>
          <div className='rowLinks'>
            <NavLink className='link' to='/habits'>
              Habits
            </NavLink>
            <NavLink className='link' to='/performance'>
              Performance
            </NavLink>

            <NavLink className='link' to='/notes/tasks'>
              Notes
            </NavLink>
            <NavLink className='link' to='/focus'>
              Focus
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
