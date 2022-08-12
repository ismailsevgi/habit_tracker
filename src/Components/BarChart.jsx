import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GlobalContext from './GlobalContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true,
    },
  },
};

// const data = {
//   datasets: [
//     {
//       data: [
//         { x: 'Week 1', y: 20 },
//         { x: 'Week 2', y: 10 },
//         { x: 'Week 2', y: 10 },

//       ],
//       borderColor: `white`,
//       backgroundColor: `white`,
//     },
//   ],
// };

export function BarChart() {
  const { goalsArray, selectedGoal, fakeGoalsArray } =
    useContext(GlobalContext);

  const data = {
    datasets: goalsArray

      .filter(
        (goal) => goal.goalType === 'Weekly' && goal.goalName === selectedGoal
      ) //filter ile Weekly typelar atıldı!
      .map((goal) => {
        return {
          label: goal.goalName,
          data: goal.goalsAmountsArray.map((obj) => obj),
          borderColor: `${goal.colorType}`,
          backgroundColor: `${goal.colorType}`,
        };
      }),
  };

  return <Bar options={options} data={data} />;
}
