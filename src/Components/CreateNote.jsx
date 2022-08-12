import React, { useContext, useState } from 'react';
import GlobalContext from './GlobalContext';
import { useFormik } from 'formik';

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
      content: '',
      priority: '',
    },

    onSubmit: (values) => {
      setTask(JSON.stringify(values));
    },
  });

  console.log(formik);

  return (
    <form id='myForm' className='row' onSubmit={formik.handleSubmit}>
      <div className='col-sm-12'>
        <label htmlFor='taskTitle'>Task Title</label>
        <input
          id='taskTitle'
          name='taskTitle'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.taskTitle}
        />
      </div>
      <div className='col-sm-12'>
        <label htmlFor='content'>Task</label>
        <input
          id='content'
          name='content'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.content}
        />
      </div>
      <div className='col-sm-12'>
        <label htmlFor='priority'>Priority</label>
        <select
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

      <button type='submit'>Submit</button>
    </form>
  );
}

export default CreateNote;
