import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../Context/GlobalContext';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';

import DataPicker, {
  DateObject,
  getAllDatesInRange,
} from 'react-multi-date-picker';

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
  const { notesArray, setNotesArray, setToastMsg, toastMsg } =
    useContext(GlobalContext);
  const [task, setTask] = useState(null);

  console.log('contexten gelen array: ', notesArray);

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

    onSubmit: (values, { resetForm }) => {
      setTask({
        ...values,
        startDate: allDates[0].format(),
        endDate: allDates[allDates.length - 1].format(),
        id: nanoid(),
      });

      resetForm();
      ///
    },
  });

  console.log('Oluşan Task: ', task);

  function submitTask(task) {
    typeof task !== null &&
      setNotesArray((prev) => {
        if (task.priority === 'High') {
          return {
            ...prev,
            high: [...prev.high, task],
          };
        } else if (task.priority === 'Middle') {
          return {
            ...prev,
            middle: [...prev.middle, task],
          };
        } else if (task.priority === 'Low') {
          return {
            ...prev,
            low: [...prev.low, task],
          };
        }
      });

    const x = document.getElementById('toast');
    setToastMsg('Task added');
    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);

    localStorage.setItem('notesArray', JSON.stringify(notesArray));
  }

  useEffect(() => {
    task !== null && submitTask(task);
  }, [task]);

  // function handleChange(values) {
  //   //your modification on passed value ....
  //   setValues(values);
  //   console.log('current value: ', values);
  // }

  return (
    <form id='myForm' onSubmit={formik.handleSubmit}>
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
          required
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
          required
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
          required
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
          range
        />
      </div>

      <button id='createBtn' type='submit' className='btn btn-block'>
        CREATE
      </button>
    </form>
  );
}

export default CreateNote;
