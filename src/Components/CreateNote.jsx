import React, { useContext, useState } from 'react';
import GlobalContext from './GlobalContext';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';

import DataPicker, {
  DateObject,
  getAllDatesInRange,
} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import transition from 'react-element-popper/animations/transition';
import opacity from 'react-element-popper/animations/opacity';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function CreateNote() {
  const { notesArray } = useContext(GlobalContext);
  const [task, setTask] = useState([]);

  //time related states
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  //time related states

  //useFormic
  //Manage form state
  //handling submission
  //validation and error massages

  const formik = useFormik({
    initialValues: {
      taskTitle: '',
      description: '',
      time: '',
      priority: '',
    },

    onSubmit: (values) => {
      setTask({
        ...values,
        startDate: allDates[0].format(),
        endDate: allDates[1].format(),
        id: nanoid(),
      });

      console.log('Oluşan Task: ', task);

      if (task.priority === 'High') {
        notesArray[0].push(task);
      } else if (task.priority === 'Middle') {
        notesArray[1].push(task);
      } else if (task.priority === 'Low') {
        notesArray[2].push(task);
      }

      localStorage.setItem('notesArray', JSON.stringify(notesArray));

      document.querySelector('#myForm').reset();
    },
  });

  // function handleChange(values) {
  //   //your modification on passed value ....
  //   setValues(values);
  //   console.log('current value: ', values);
  // }

  return (
    <form id='myForm' className='col-8 offset-4' onSubmit={formik.handleSubmit}>
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
          Priority:
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
      <div className='form-outline mb-4'>
        <label className='form-label' htmlFor='priority'>
          Set Time:
        </label>
        <DataPicker
          minDate={new DateObject().toFirstOfMonth()}
          maxDate={new DateObject().toLastOfMonth()}
          animations={[
            transition({
              duration: 1000,
              from: 35,
            }),
            opacity({ from: 0.1, to: 1, duration: 1000 }),
          ]}
          value={dates}
          onChange={(dateObjects) => {
            setDates(dateObjects);
            setAllDates(getAllDatesInRange(dateObjects));
          }}
          format='MM/DD/YYYY'
          weekDays={weekDays}
          months={months}
          plugins={[<DatePanel />]}
          range
        />
      </div>

      <button type='submit' className='btn btn-primary btn-block'>
        Sign in
      </button>
    </form>
  );
}

export default CreateNote;
