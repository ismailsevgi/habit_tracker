import React, { useState, useEffect, useContext } from 'react';
import '../../CSS-Files/Focus.css';

import { Howl, howler } from 'howler';
import tomato_done from '../../Logo/tomato_done.png';
import tomato_unfinished from '../../Logo/tomato_unfinished.png';
import Toast from '../Others/Toast';
import GlobalContext from '../Context/GlobalContext';

import countDown from '../../Sounds/countdown.mp3';
import POP1 from '../../Sounds/POP1.wav';
import POP2 from '../../Sounds/POP2.wav';
import POP3 from '../../Sounds/POP3.wav';
import POP4 from '../../Sounds/POP4.wav';

//---------SOUNDS-------------//
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

const allStates = {
  initialTimeState: {
    min: 0,
    sec: 0,
  },
  pomodoro: {
    mode: false,
    counter: 0,
  },

  initialControlState: { start: false, reset: false },
};

//------------------------------------------------//

function Focus() {
  const { setToastMsg, toastMsg } = useContext(GlobalContext);
  const [time, setTime] = useState(allStates.initialTimeState);
  const [pomodoro, setpomodoro] = useState(allStates.pomodoro);

  const [control, setControl] = useState(allStates.initialControlState);

  //changes the time obj; handles the custom input.

  //starting and pausing button

  function resetTimer() {
    setTime(allStates.initialTimeState);

    setControl(allStates.initialControlState);
  }

  function startTimer() {
    if (time.min > 0 || time.sec > 0) {
      setControl({ ...control, start: !control.start });

      const x = document.getElementById('toast');

      x.className = 'show';

      setTimeout(function () {
        x.className = x.className.replace('show', '');
      }, 3000);

      control.start ? setToastMsg('PAUSED') : setToastMsg('STARTED');
    } else {
      console.log('Start Verildi');
      setpomodoro({ ...pomodoro, mode: true });
      setControl({ ...control, start: true });
      setTime({
        min: 25,
        sec: 0,
      });
      const x = document.getElementById('toast');

      x.className = 'show';

      setTimeout(function () {
        x.className = x.className.replace('show', '');
      }, 3000);

      setToastMsg('Timer Started!');
    }
  }

  //poromodo mode switch decides which interval to use.
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (time.sec === 6 && time.min === 0) {
        SoundPlay();
      }

      if (pomodoro.counter === 8) {
        clearInterval(myInterval);
        setTime(allStates.initialTimeState);
        setpomodoro(allStates.pomodoro);
        setControl(allStates.initialControlState);
      }

      if (pomodoro.counter === 7) {
        setTime({ min: (time.min = 30), sec: (time.sec = 0) });
      }

      if (time.sec !== 0) {
        setTime({ ...time, sec: (time.sec -= 1) });
      }

      if (
        pomodoro.counter % 2 === 0 &&
        time.sec === 0 &&
        time.min === 0 &&
        pomodoro.counter < 7
      ) {
        setpomodoro((prev) => {
          return { ...prev, counter: prev.counter + 1 };
        });
        setTime({ min: (time.min = 5), sec: (time.sec = 0) });
        popSound();
      }

      if (
        pomodoro.counter % 2 === 1 &&
        time.sec === 0 &&
        time.min === 0 &&
        pomodoro.counter < 7
      ) {
        setpomodoro((prev) => {
          return { ...prev, counter: prev.counter + 1 };
        });
        setTime({ min: (time.min = 25), sec: (time.sec = 0) });
      }

      if (time.sec === 0 && time.min === 0) {
        console.log('times up');
        setpomodoro({ ...pomodoro, counter: pomodoro.counter + 1 });
      }

      if (time.sec === 0 && time.min >= 1) {
        setTime({ min: (time.min -= 1), sec: (time.sec = 59) });
      }
    }, 1000);

    if (control.start === false) {
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  }, [control, pomodoro.counter]);

  //mode açık olursa borderlar turuncu olacak!

  return (
    <div className='container'>
      <div className='poromodoRow'>
        <div className='promoTitle'>
          <h1>POMODORO STUDY</h1>
        </div>
      </div>

      <hr></hr>
      <div className='numbersRow'>
        <div className='numbers tomato'>
          {pomodoro.counter <= 0 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {pomodoro.counter >= 1 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='numbers tomato'>
          {pomodoro.counter <= 2 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {pomodoro.counter >= 3 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='numbers item-1'>
          <div className='default'>
            {time.min < 10 ? `0${time.min}` : time.min}
          </div>
          <div className='numbers-label'>
            <p>MINUTES</p>
          </div>
        </div>
        <div className='numbers item-2'>
          <div className='default default-sec'>
            {time.sec < 10 ? `0${time.sec}` : time.sec}
          </div>
          <div className='numbers-label'>
            <p>SECONDS</p>
          </div>
        </div>
        <div className='numbers tomato'>
          {pomodoro.counter <= 4 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {pomodoro.counter >= 5 && <img src={tomato_done} alt='tomato' />}
        </div>
        <div className='numbers tomato'>
          {pomodoro.counter <= 6 && (
            <img src={tomato_unfinished} alt='tomato' />
          )}
          {pomodoro.counter >= 7 && <img src={tomato_done} alt='tomato' />}
        </div>
      </div>

      <div className='buttons'>
        <button className='startBtn' onClick={() => startTimer()}>
          {!control.start ? 'START' : 'PAUSE'}
        </button>
        <button className='startBtn' onClick={() => resetTimer()}>
          RESET
        </button>
      </div>
      <Toast toastMsg={toastMsg} />
    </div>
  );
}

export default Focus;
