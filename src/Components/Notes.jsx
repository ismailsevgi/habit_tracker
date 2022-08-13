import React from 'react';

import '../CSS-Files/Notes.css';
import CreateNote from './CreateNote';
import TaskList from './TaskList';
import { NavLink, Route, Routes } from 'react-router-dom';

function Notes() {
  return (
    <div className='container'>
      <nav className='row notesNav'>
        <NavLink to='notes' name='showlist' className='col-sm-2 offset-4'>
          Show List
        </NavLink>
        <NavLink to='create-note' className='col-sm-2 offset-1'>
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
