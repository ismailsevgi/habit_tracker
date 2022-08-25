import React, { useState, useEffect } from 'react';
import '../../CSS-Files/Focus.css';
import tomato from '../../Logo/tomato.png';

function Focus() {
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });

  const [poromodo, setPoromodo] = useState({
    mode: false,
    pomoCounter: 0,
  });
  const [control, setControl] = useState({ start: false, reset: false });

  function handleTime(e) {
    let { name, value } = e.target;

    if (typeof value === 'string' && value === '0') {
      value = '0';
    }
    switch (name) {
      default:
        console.log('Default!');
        break;
      case 'sec':
        setTime({ ...time, sec: parseInt(value) });
        console.log('value: ', typeof value);
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

  function handleMode() {
    setPoromodo({ ...poromodo, mode: !poromodo.mode });
    console.log('Mode değişti 1:', poromodo.mode);
    if (!poromodo.mode) {
      setPoromodo({
        mode: !poromodo.mode,
        pomoCounter: (poromodo.pomoCounter = 1),
      });
      setTime({ ...time, min: (time.min = 25) });
    } else {
      setPoromodo({
        mode: !poromodo.mode,
        pomoCounter: (poromodo.pomoCounter = 0),
      });
      setTime({ ...time, min: (time.min = 0) });
    }

    console.log('Time:', time, ' pomorodo: ', poromodo);
  }

  function startTimer() {
    setControl({ ...control, start: !control.start });
    console.log('güncel start: ', control.start);
  }

  useEffect(() => {
    if (!poromodo.mode) {
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
            hour: (time.hour -= 1),
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
    }
    if (poromodo.mode) {
      const myInterval = setInterval(() => {
        console.log('pomorodo progress...', control.start);

        if (time.sec === 0 && time.min === 0 && poromodo.pomoCounter < 7) {
          if (poromodo.pomoCounter % 2 === 0) {
            setPoromodo({ ...poromodo, pomoCounter: poromodo.pomoCounter + 1 });
            console.log('25 dk daha eklendi');
            setTime({ ...time, min: (time.min = 25) });
            console.log('Güncel poromodo: ', poromodo);
          }
          if (poromodo.pomoCounter % 2 === 1) {
            setPoromodo({ ...poromodo, pomoCounter: poromodo.pomoCounter + 1 });
            console.log('5 dk daha dinlenme');
            setTime({ ...time, min: (time.min = 5) });
            console.log('Güncel poromodo: ', poromodo);
          }
        }

        if (poromodo.pomoCounter === 7) {
          console.log('Full dinlenme!');
          setPoromodo({ ...poromodo, pomoCounter: (poromodo.pomoCounter = 0) });
          setTime({ ...time, min: (time.min = 30) });
          console.log('Güncel poromodo: ', poromodo);
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
            hour: (time.hour -= 1),
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
    }
  }, [control]);

  //mode açık olursa borderlar turuncu olacak!

  return (
    <div className='container'>
      <div className='row poromodoRow'>
        <div className='col-4 promoTitle'>
          <h1>POROMODO STUDY</h1>
          <button onClick={handleMode}>
            MODE {poromodo.mode ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className='col-2 tomato'>
          <img src={tomato} />
        </div>
        <div className='col-2 tomato'>
          <img src={tomato} />
        </div>
        <div className='col-2 tomato'>
          <img src={tomato} />
        </div>
        <div className='col-2 tomato'>
          <img src={tomato} />
        </div>
      </div>
      <hr></hr>
      <div id='workRest'>
        {poromodo.mode && poromodo.pomoCounter % 2 === 1
          ? 'WORKING'
          : 'RESTING'}
      </div>
      <hr></hr>
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
            <div className='default'>{time.day}</div>
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
            <div className='default'>{time.hour}</div>
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
            <div className='default'>{time.min}</div>
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
            <div className='default'>{time.sec}</div>
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
        <button className='col' onClick={() => startTimer()}>
          {!control.start ? 'START' : 'PAUSE'}
        </button>
      </div>
    </div>
  );
}

export default Focus;
