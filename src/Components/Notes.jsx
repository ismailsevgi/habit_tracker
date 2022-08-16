import React from 'react';

import '../CSS-Files/Notes.css';
import CreateNote from './CreateNote';
import TaskList from './TaskList';
import { NavLink, Route, Routes } from 'react-router-dom';

function Notes() {
  return (
    <div className='container d-flex  align-items-center flex-column'>
      <nav className='row notesNav'>
        <NavLink to='tasks' name='showlist' className='col-sm-5'>
          Show List
        </NavLink>
        <NavLink to='create-note' className='col-sm-5'>
          Create New
        </NavLink>
      </nav>
      <Routes>
        <Route path='create-note' element={<CreateNote />} />
        <Route path='tasks' element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default Notes;
