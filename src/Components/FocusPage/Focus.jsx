import React, { useState, useEffect } from 'react';
import '../../CSS-Files/Focus.css';

function Focus() {
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });

  const [control, setControl] = useState({ start: false, reset: false });

  function handleTime(e) {
    const { name, value } = e.target;
    switch (name) {
      default:
        console.log('Default!');
        break;
      case 'sec':
        setTime({ ...time, sec: parseInt(value) });

        break;
      case 'min':
        setTime({ ...time, min: parseInt(value) });

        break;
      case 'hour':
        setTime({ ...time, hour: parseInt(value) });

        break;
      case 'day':
        setTime({ ...time, day: parseInt(value) });

        break;
    }
  }

  function startTimer() {
    setControl({ ...control, start: !control.start });
    console.log('güncel start: ', control.start);
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      console.log('interval progress...', control.start);

      if (
        time.sec === 0 &&
        time.min === 0 &&
        time.hour === 0 &&
        time.day === 0
      ) {
        console.log('Süre doldu');
        clearInterval(myInterval);
      }

      if (time.sec !== 0) {
        console.log('time.sec !== 0', time.sec);
        console.log('control.start :', control.start);
        setTime({ ...time, sec: (time.sec -= 1) });
      }

      if (time.sec === 0 && time.min >= 1) {
        setTime({ ...time, min: (time.min -= 1), sec: (time.sec = 59) });
      }

      if (time.sec === 0 && time.hour >= 1) {
        setTime({
          ...time,
          hour: (time.min -= 1),
          min: (time.min = 59),
          sec: (time.sec = 59),
        });
      }

      if (time.sec === 0 && time.day >= 1) {
        setTime({
          ...time,
          day: (time.day -= 1),
          hour: (time.hour = 23),
          min: (time.min = 59),
          sec: (time.sec = 59),
        });
      }
    }, 1000);

    if (control.start === false) {
      clearInterval(myInterval);
    }

    return () => clearInterval(myInterval);
  }, [control]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>WORK IN PROGRESS</div>
      </div>
      <div className='row'>
        <div className='col-sm-3 numbers'>
          {!control.start ? (
            <input
              type='number'
              name='day'
              max={59}
              placeholder={time.day}
              onChange={(e) => handleTime(e)}
            />
          ) : (
            time.day
          )}
        </div>
        <div className='col-sm-3 numbers'>
          {!control.start ? (
            <input
              type='number'
              name='hour'
              max={59}
              placeholder={time.hour}
              onChange={(e) => handleTime(e)}
            />
          ) : (
            time.hour
          )}
        </div>
        <div className='col-sm-3 numbers'>
          {!control.start ? (
            <input
              type='number'
              name='min'
              max={59}
              placeholder={time.min}
              onChange={(e) => handleTime(e)}
            />
          ) : (
            time.min
          )}
        </div>
        <div className='col-sm-3 numbers'>
          {!control.start ? (
            <input
              type='number'
              name='sec'
              max={59}
              placeholder={time.sec}
              onChange={(e) => handleTime(e)}
            />
          ) : (
            time.sec
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-3 texts'>DAYS </div>
        <div className='col-sm-3 texts'>HOURS </div>
        <div className='col-sm-3 texts'>MINUTES </div>
        <div className='col-sm-3 texts'>SECONDS </div>
      </div>
      <div className='row'>
        {!control.start ? (
          <button className='col' onClick={() => startTimer()}>
            Start
          </button>
        ) : (
          <button className='col' onClick={() => startTimer()}>
            Pause
          </button>
        )}
      </div>
    </div>
  );
}

export default Focus;
