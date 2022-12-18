import React, { useContext, useState } from 'react';
import GlobalContext from '../Context/GlobalContext';
import '../../CSS-Files/Performance.css';

import { Line } from 'react-chartjs-2'; //Line is an element for Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart } from './BarChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  //chart'ın davranış şekilleri bu şekilde çalılıyor
  responsive: true, //Test edilecek; sayfanın büyüklüğüne göre davranıyor
  plugins: {
    //kullanılacak dış pluginler
    legend: {
      //başlık pozisyonu
      position: 'top',
    },
    title: {
      display: true, //görünme durumu
      text: 'Performance Stats', //başlığın içeriği
      strokeStyle: 'white',
    },
  },
};

//dataya verilecek "datasets" bir array ve içinde objeler olmalı
//labels buraya girilecek bir state ile dynamic bir şekilde değiştirilebilir

//verilecek card
//bir array olacak b
//objelerin içindeki "data: " girdisi içindeki goalsDailysArray den gelecek

/* <Line options={} data={} /> data ve chart ayarları böyle render ediliyor */

//goal objesinin başlangıç tarihi eklenmeli {x: '2022-03-01', y: goalDaily}

function Performance() {
  const {
    goalsArray,
    selectedGoal,
    setSelectedGoal,
    setHabit,
    fakeGoalsArray,
  } = useContext(GlobalContext);
  const [WeeklySwitch, setWeeklySwitch] = useState(true);

  const [showLastFrom, setShowLastFrom] = useState(Infinity);

  const handleSwitch = () => {
    setWeeklySwitch(!WeeklySwitch);
    console.log(WeeklySwitch);
  };

  const data = {
    datasets:
      goalsArray.length > 0 &&
      goalsArray
        .filter(
          (goal) => goal.goalType === 'Daily' && goal.goalName === selectedGoal
        ) //filter ile Weekly typelar atıldı!
        .map((goal) => {
          return {
            label: goal.goalName,
            data:
              goal.goalsAmountsArray.length > 0 &&
              goal.goalsAmountsArray.slice(-showLastFrom).map((obj) => obj),
            borderColor: `${goal.colorType}`,
            backgroundColor: `${goal.colorType}`,
          };
        }),
  };

  function handleShow(e) {
    const { value } = e.target;
    setShowLastFrom(value);
  }

  return (
    <div className='container main'>
      <div className='row'>
        <aside className='col-sm-3 infoSide'>
          <div className='dataSwitcher'>
            <h4>Daily</h4>
            <label className='toggler-wrapper style-8'>
              <input type='checkbox' onChange={handleSwitch} />
              <div className='toggler-slider'>
                <div className='toggler-knob'></div>
              </div>
            </label>
            <h4>Weekly</h4>
          </div>
          {WeeklySwitch && (
            <>
              <h2>Daily list</h2>

              <select
                name='datePicker'
                id='datePicker'
                value={showLastFrom}
                onChange={handleShow}
              >
                <option selected value={Infinity}>
                  Show All
                </option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={31}>31 days</option>
                <option value={93}>3 months</option>
                <option value={180}>6 months</option>
                <option value={360}>12 months</option>
              </select>
              <small>Choose a habit</small>

              <div className='leftWingList'>
                {goalsArray.length > 0 &&
                  goalsArray
                    .filter((data) => data.goalType === 'Daily')
                    .map((goal) => {
                      return (
                        <li
                          key={goal.id}
                          onClick={() => setHabit(goal.goalName)}
                        >
                          <i
                            className='fa-solid fa-right-long'
                            style={{ color: goal.colorType }}
                          ></i>

                          <h4>{goal.goalName.toUpperCase()}</h4>
                        </li>
                      );
                    })}
              </div>
            </>
          )}
          {!WeeklySwitch && (
            <>
              <h2>Weekly list</h2>

              <div className='leftWingList'>
                {goalsArray.length > 0 &&
                  goalsArray
                    .filter((data) => data.goalType === 'Weekly')
                    .map((goal) => {
                      return (
                        <li
                          key={goal.id}
                          onClick={() => setHabit(goal.goalName)}
                        >
                          <i
                            className='fa-solid fa-right-long'
                            style={{ color: goal.colorType }}
                          ></i>

                          <h4>{goal.goalName.toUpperCase()}</h4>
                        </li>
                      );
                    })}
              </div>
            </>
          )}
        </aside>
        <div className='col-sm-9  chartSide'>
          {WeeklySwitch && goalsArray.length > 0 && (
            <Line options={options} data={data} />
          )}
          {!WeeklySwitch && goalsArray.length > 0 && <BarChart />}
        </div>
      </div>
    </div>
  );
}

export default Performance;
