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
      <h1>selamlar</h1>
      <Routes>
        <Route to='create-note' element={<CreateNote />} />
        <Route to='notes' element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default Notes;
