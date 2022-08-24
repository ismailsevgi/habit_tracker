import React, { useContext } from 'react';

import '../../CSS-Files/Notes.css';
import CreateNote from './CreateNote';
import TaskList from './TaskList';
import { NavLink, Route, Routes } from 'react-router-dom';
import Toast from '../Others/Toast';
import GlobalContext from '../Context/GlobalContext';

function Notes() {
  const { toastMsg } = useContext(GlobalContext);

  return (
    <div className='container d-flex  align-items-center flex-column'>
      <nav className='row notesNav mt-3'>
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
      <Toast toastMsg={toastMsg} />
    </div>
  );
}

export default Notes;
