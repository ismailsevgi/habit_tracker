import React, { useContext, useState } from 'react';
import GlobalContext from './GlobalContext';
import { useFormik } from 'formik';
import { isYesterday } from 'date-fns';

function CreateNote() {
  const { notesArray, setNotesArray } = useContext(GlobalContext);
  const [task, setTask] = useState('');

  console.log('notesArray geldi', notesArray);

  //useFormic
  //Manage form state
  //handling submission
  //validation and error massages

  const formik = useFormik({
    initialValues: {
      taskTitle: '',
      description: '',
      priority: '',
    },

    onSubmit: (values) => {
      setTask(JSON.stringify(values));
    },
  });

  console.log(formik);

  return (
    <form id='myForm' className='col-4 offset-4' onSubmit={formik.handleSubmit}>
      <div className='form-outline mb-4'>
        <label className='form-label' for='taskTitle'>
          Task Title
        </label>
        <input
          id='taskTitle'
          name='taskTitle'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.taskTitle}
          placeholder='Enter task title here...'
          className='form-control'
        />
      </div>

      <div className='form-outline mb-4'>
        <label className='form-label' for='description'>
          Task Description
        </label>
        <textarea
          type='text'
          id='description'
          onChange={formik.handleChange}
          value={formik.values.description}
          className='form-control'
          maxLength={40}
          placeholder='Enter task description...'
        />
      </div>
      <div className='form-outline mb-4'>
        <label className='form-label' htmlFor='priority'>
          Priority
        </label>
        <select
          className='form-label'
          name='priority'
          value={formik.values.priority}
          onChange={formik.handleChange}
        >
          <option value='' selected>
            --- Choose Type ---
          </option>
          <option value='High'>High</option>
          <option value='Middle'>Middle</option>
          <option value='Low'>Low</option>
        </select>
      </div>

      <button type='submit' className='btn btn-primary btn-block'>
        Sign in
      </button>
    </form>
  );
}

export default CreateNote;
