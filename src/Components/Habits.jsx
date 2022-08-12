import React from 'react';
import Cards from './Cards';
import CreateCard from './CreateCard';
import '../CSS-Files/Habits.css';

function Habits() {
  return (
    <div className='container Habits'>
      <div className='row'>
        <aside className='col-3'>
          <CreateCard />
        </aside>
        <div className='col-8'>
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Habits;
