import React from 'react';

import '../CSS-Files/Notes.css';
import CreateNote from './CreateNote';
import TaskList from './TaskList';
import { NavLink, Route, Routes } from 'react-router-dom';

function Notes() {
  /*
  

  */
  return (
    <div className='container'>
      <nav className='row notesNav'>
        <label htmlFor='showlist'>Show List</label>
        <NavLink to='notes' name='showlist' className='col-sm-2'>
          <button>BTN</button>
        </NavLink>
        <NavLink to='create-note' className='col-sm-2'>
          Create New
        </NavLink>
      </nav>
      <Routes>
        <Route path='create-note' element={<CreateNote />} />
        <Route path='notes' element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default Notes;
