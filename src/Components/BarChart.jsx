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
    y: {
      beginAtZero: true,
    },
  },
};

const MONTHS = ['WEEK 1', 'WEEK 2', 'WEEK 3'];

export function BarChart() {
  const { goalsArray, selectedGoal } = useContext(GlobalContext);

  const weeks = goalsArray

    .filter(
      (goal) => goal.goalType === 'Weekly' && goal.goalName === selectedGoal
    ) //filter ile Weekly typelar atıldı!
    .map((goal) => goal.weekLabels);

  console.log('weeks: ', [...weeks]);

  const data = {
    labels: [].concat.apply([], weeks),
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
