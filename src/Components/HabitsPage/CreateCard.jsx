import React, { useState, useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';
import { nanoid } from 'nanoid';
import '../../CSS-Files/CreateCard.css';
import 'chartjs-adapter-date-fns';
import { TwitterPicker } from 'react-color';
import { endOfISOWeek, format, startOfToday } from 'date-fns';

function CreateCard() {
  const { setGoalsArray, today, thisWeek, setToastMsg, goalsArray } =
    useContext(GlobalContext);

  // {

  // let result = format(testDate, 'yyyy-LLL-dd');
  // let nextWeek = endOfISOWeek(testDate);

  // console.log('nextWeek: ', nextWeek);

  //  date: '2022-08-03', //
  //   memrise: 2000,
  //   pushUps: 9800,
  //   amt: 2290,
  //}

  const [goal, setGoal] = useState({
    goalName: '',
    goalType: '',
    goalCreateDay: startOfToday(),
    goalDate: '',
    goalAmount: 0,
    goalWeekly: false,
    todaysStatus: false,

    todaysAmount: 0,
    lastCheck: '',
    goalsAmountsArray: [], //buraya Weekly ise true-false, Daily ise numaralar koyulacak!
    colorType: '#0652DD',
  });

  //gets option value
  function handleChange(e, color) {
    const { name, value } = e.target;
    setGoal((prev) => {
      return {
        ...prev,
        id: nanoid(),
        [name]: value,
      };
    });
    console.log('current goal Type:', goal.goalType);
  }

  function handleColorChange(color) {
    setGoal((prev) => {
      return {
        ...prev,

        colorType: color.hex,
      };
    });
  }

  //sends obj to data base
  function handleSubmit(e) {
    e.preventDefault();
    setGoalsArray((prev) => {
      if (goal.goalType === 'Weekly') {
        goal.checkWeek = thisWeek;
        goal.weekLabels = ['Week 1'];
        goal.currentWeek = 1;
        goal.goalsAmountsArray.push(0);
      }

      return [...prev, goal];
    });

    console.log('GoalsArrayAfter Submit: ', goalsArray);

    const x = document.getElementById('toast');
    setToastMsg('You added a new habit!');
    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);

    document.querySelector('.create-card').reset();
  }

  const palatteColors = [
    '#F79F1F',
    '#EE5A24',
    '#EA2027',
    '#A3CB38',
    '#009432',
    '#12CBC4',
    '#1289A7',
    '#ED4C67',
    '#B53471',
    '#833471',
  ];

  return (
    <form
      className='create-card'
      onSubmit={handleSubmit}
      style={{ backgroundColor: goal.colorType }}
    >
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={{ backgroundColor: goal.colorType }}
      >
        <h3 style={{ backgroundColor: goal.colorType }}>Create a new Habit</h3>
        <input
          name='goalName'
          onChange={handleChange}
          placeholder="Habits's name..."
          maxLength='18'
          type='text'
          className='addNewHabit'
        />
      </div>
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={{ backgroundColor: goal.colorType }}
      >
        <h3 id='goalType' style={{ backgroundColor: goal.colorType }}>
          Goal Type
        </h3>
        <select name='goalType' value={goal.goalType} onChange={handleChange}>
          <option value='' selected>
            --- Choose Type ---
          </option>
          <option value='Daily'>Daily</option>
          <option value='Weekly'>Weekly</option>
        </select>
      </div>
      {goal.goalType === 'Daily' && (
        <input
          placeholder='Enter Daily...'
          onChange={handleChange}
          name='goalAmount'
          className='enter-Daily'
          max='99999'
          type='Number'
        />
      )}
      {goal.goalType === 'Weekly' && (
        <div
          className='WeeklyComponent'
          style={{ backgroundColor: goal.colorType }}
        >
          <div
            className='selectWeekly'
            style={{ backgroundColor: goal.colorType }}
          >
            <input
              placeholder='Enter Weekly goal...'
              onChange={handleChange}
              name='goalAmount'
              className='enter-Daily'
              type='Number'
              max='999'
            />
          </div>
        </div>
      )}
      <div className='colorSelect' style={{ backgroundColor: goal.colorType }}>
        <h3 style={{ backgroundColor: goal.colorType }}>Choose Color</h3>

        <TwitterPicker
          color={goal.colorType}
          onChange={handleColorChange}
          width='14rem'
          triangle='hide'
          colors={palatteColors}
        />
      </div>
      <button className='btn-add' style={{ backgroundColor: goal.colorType }}>
        Add
      </button>
    </form>
  );
}

export default CreateCard;
