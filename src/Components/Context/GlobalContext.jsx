//from the top of package json
// "homepage": "https://ismailsevgi.github.io/habit_tracker",

import React, { createContext, useEffect, useState } from 'react';

import { format, endOfISOWeek, nextMonday } from 'date-fns';

const GlobalContext = createContext();

const fakeGoalsArray = [
  {
    colorType: '#eb144c',
    goalAmount: '100',
    goalCreateDay: '2022-Aug-11',
    goalDate: '',
    goalName: 'Learn Eng. Words',
    goalType: 'Daily',
    goalWeekly: false,
    goalsAmountsArray: [
      {
        goalEndDate: '2022-Aug-14',
        goalStartDate: '2022-Aug-11',
        x: '2022-Aug-11',
        y: '50',
      },

      {
        x: '2022-Aug-12',
        y: '20',
      },
      {
        x: '2022-Aug-13',
        y: '100',
      },
      {
        x: '2022-Aug-14',
        y: '150',
      },
      {
        x: '2022-Aug-15',
        y: '125',
      },
      {
        x: '2022-Aug-16',
        y: '110',
      },
      {
        x: '2022-Aug-17',
        y: '90',
      },
      {
        x: '2022-Aug-18',
        y: '80',
      },
      {
        x: '2022-Aug-19',
        y: '75',
      },
      {
        x: '2022-Aug-20',
        y: '85',
      },
    ],
    id: '-SDV2mWPlXCGMLHx1Jj8S',
    lastCheck: '2022-Aug-20',
    todaysAmount: '50',
    todaysStatus: true,
  },
  {
    colorType: '#fcb900',
    goalAmount: '10',
    goalCreateDay: '2022-Aug-11',
    goalDate: '',
    goalName: 'Weekly Chess',
    goalType: 'Weekly',
    currentWeek: 1,
    goalWeekly: false,
    weekLabels: ['Week 1', 'Week 2', 'Week 3'],

    goalsAmountsArray: [3, 7, 5],
    id: 'B5fbMXGmurc0u9Dl0AJO-',
    lastCheck: '2022-Aug-11',
    todaysAmount: 3,
    todaysStatus: false,
  },
];

export const GlobalContextProvider = ({ children }) => {
  const [goalsArray, setGoalsArray] = useState(
    JSON.parse(localStorage.getItem('goalsArray')) || fakeGoalsArray
  );

  const [notesArray, setNotesArray] = useState(
    JSON.parse(localStorage.getItem('notesArray')) || {
      high: [],
      middle: [],
      low: [],
      done: [],
    }
  );

  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    console.log('task set edildi: ', notesArray);
    localStorage.setItem('notesArray', JSON.stringify(notesArray));
  }, [notesArray]);

  //2D array is for reducing the loop time for rendering,
  //Every nested array is for different priorities first: high, second: middle, last: low

  //alttakiler performace den geldi

  const setHabit = (goalName) => {
    setSelectedGoal(goalName);
  };

  const [selectedGoal, setSelectedGoal] = useState(
    goalsArray.length > 0 && goalsArray[0].goalName
  ); //Choose one habit to show

  //??sttekiler performace den geldi

  let today = format(new Date(), 'yyyy-LLL-dd');
  // let today = format(nextMonday(new Date()), 'yy-LLL-dd'); //nextMonday for texting
  console.log('Today: ', today);

  let thisWeek = format(endOfISOWeek(new Date()), 'yyyy-LLL-dd');
  // let thisWeek = format(nextMonday(new Date()), 'yy-LLL-dd'); //nextMonday for texting
  console.log(thisWeek);

  //goalsArray her g??ncellendi??inde JSON ile bilgiler aktar??lacak //useEffect!

  useEffect(() => {
    console.log('set item edildi');
    localStorage.setItem('goalsArray', JSON.stringify(goalsArray));
  }, [goalsArray]);

  //goalsArray i??inden yeni bir performans array olu??turulur
  //cards dan gelen submit olu??turulan Objenin i??indeki de??erleri de??i??tirir.
  //her g??n ilk kez kart submit edildi??inde bir obje olu??turulur ve i??indeki veriler submit edilen de??er eklenir.

  //day 1
  //Cards listesinde bir card submit edildi
  //??ncelikle performansArrayinin i??indeki tarih bug??n ile e??le??iyormu diye bak??l??r
  //e??le??miyorsa yeni bir obje yarat??l??r ve i??ine ismi ile beraber de??er kay??t edilir
  //e??le??iyorsa son objenin i??ine girilir ve ismi ile beraber di??er veriler de kay??t edilir

  /*

  goalsArrayden gelen objelerden gelen bilgiler ile olu??mas?? gereken obje
  performanceArray = [
    {
    date: yesterday's date //ortak tarih
    memrise: 100 -- obj[0].goalName: goalDaily //goalsArray i??indeki ilk eleman??n title ve value'su
    situps: 50 -- obj[1].goalName: goalDaily //goalsArray i??indeki ilk eleman??n title ve value'su
    },
    {
    date: today's date //ortak tarih //e??er d??nk?? tarih ile bug??nk?? tarih ayn?? ise bu obje olu??turulur
    memrise: 100 -- obj[0].goalName: obj.goalsDailysArray[slice(-1)] //goalsArray i??indeki ilk eleman??n title ve value'su
    situps: 50 -- obj[1].goalName: goalDaily //goalsArray i??indeki ilk eleman??n title ve value'su
    }

    ]

    
  
  
  let varsay??lanPerformanceArray [{
    date: new Date()
  }]
  */

  let color = 'green';

  return (
    <GlobalContext.Provider
      value={{
        setGoalsArray,
        color,
        goalsArray,

        today,
        thisWeek,
        selectedGoal,
        setSelectedGoal,
        setHabit,

        notesArray,
        setNotesArray,

        toastMsg,
        setToastMsg,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
