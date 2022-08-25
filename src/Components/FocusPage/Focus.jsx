import React, { useState, useEffect } from 'react';
import '../../CSS-Files/Focus.css';

import { Howl, howler } from 'howler';
import tomato_done from '../../Logo/tomato_done.png';
import tomato_unfinished from '../../Logo/tomato_unfinished.png';

import countDown from '../../Sounds/countdown.mp3';
import POP1 from '../../Sounds/POP1.wav';
import POP2 from '../../Sounds/POP2.wav';
import POP3 from '../../Sounds/POP3.wav';
import POP4 from '../../Sounds/POP4.wav';

function SoundPlay() {
  var sound = new Howl({
    src: [countDown],
    html5: true,
  });

  sound.play();
}
//, POP2, POP3, POP4
function popSound() {
  const popArr = [POP1, POP2, POP3, POP4];
  let random = Math.floor(Math.random() * 4);
  console.log('Random: ', random);

  var sound = new Howl({
    src: popArr[random],
  });

  sound.play();
}

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

  //changes the time obj; handles the custom input.
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

  //handles the mode
  function handleMode() {
    setPoromodo({ ...poromodo, mode: !poromodo.mode });
    console.log('Mode değişti 1:', poromodo.mode);
    if (!poromodo.mode) {
      setPoromodo({
        mode: !poromodo.mode,
        pomoCounter: (poromodo.pomoCounter = 1),
      });
      setTime({ ...time, min: (time.min = 25) });
      popSound();
    } else {
      setPoromodo({
        mode: !poromodo.mode,
        pomoCounter: (poromodo.pomoCounter = 0),
      });
      setTime({ ...time, min: (time.min = 0) });
    }
  }

  //starting and pausing button
  function startTimer() {
    setControl({ ...control, start: !control.start });
  }

  //poromodo mode switch decides which interval to use.
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
        if (time.sec === 6 && time.min === 0) {
          SoundPlay();
        }

        if (time.sec === 0 && time.min === 0) {
          if (poromodo.pomoCounter % 2 === 0 && poromodo.pomoCounter !== 7) {
            setPoromodo({ ...poromodo, pomoCounter: poromodo.pomoCounter + 1 });
            console.log('25 dk daha eklendi');

            popSound();

            setTime({ ...time, min: (time.min = 25) });
          }
          if (poromodo.pomoCounter % 2 === 1 && poromodo.pomoCounter !== 7) {
            setPoromodo({ ...poromodo, pomoCounter: poromodo.pomoCounter + 1 });
            console.log('5 dk daha dinlenme');

            setTime({ ...time, min: (time.min = 5) });
          }

          if (poromodo.pomoCounter === 7) {
            console.log('Full dinlenme!');
            setPoromodo({ ...poromodo, pomoCounter: poromodo.pomoCounter + 1 });
            setTime({ ...time, min: (time.min = 30) });
          }
          if (poromodo.pomoCounter === 8) {
            setPoromodo({
              ...poromodo,
              pomoCounter: (poromodo.pomoCounter = 0),
            });
          }
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
          {poromodo.pomoCounter <= 0 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {poromodo.pomoCounter >= 1 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='col-2 tomato'>
          {poromodo.pomoCounter <= 2 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {poromodo.pomoCounter >= 3 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='col-2 tomato'>
          {poromodo.pomoCounter <= 4 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {poromodo.pomoCounter >= 5 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='col-2 tomato'>
          {poromodo.pomoCounter <= 6 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {poromodo.pomoCounter >= 7 && <img src={tomato_done} alt='tomato' />}
        </div>
      </div>
      <hr></hr>
      <div id='workRest'>
        <h1>
          {poromodo.mode && poromodo.pomoCounter % 2 === 1
            ? 'WORKING'
            : 'RESTING'}
        </h1>
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
            <div className='default'>
              {time.day < 10 ? `0${time.day}` : time.day}
            </div>
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
            <div className='default'>
              {time.hour < 10 ? `0${time.hour}` : time.hour}
            </div>
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
            <div className='default'>
              {time.min < 10 ? `0${time.min}` : time.min}
            </div>
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
            <div className='default'>
              {time.sec < 10 ? `0${time.sec}` : time.sec}
            </div>
          )}
        </div>
      </div>
      <div className='row subRow'>
        <div className='col-sm-3 texts'>DAYS </div>
        <div className='col-sm-3 texts'>HOURS </div>
        <div className='col-sm-3 texts'>MINUTES </div>
        <div className='col-sm-3 texts'>SECONDS </div>
      </div>
      <div className='buttons'>
        <button className='startBtn' onClick={() => startTimer()}>
          {!control.start ? 'START' : 'PAUSE'}
        </button>
        <button className='startBtn' onClick={() => startTimer()}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default Focus;
