import './CSS-Files/App.css';
import Navbar from './Components/Navbar';
import Habits from './Components/HabitsPage/Habits';
import Focus from './Components/FocusPage/Focus';
import Performance from './Components/Charts/Performance';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Notes from './Components/TaskPage/Notes';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <hr></hr>
        <Routes>
          <Route path='/' element={<Navigate to='/habits' />} />
          <Route path='/habit_tracker' element={<Navigate to='/habits' />} />

          <Route path='/focus' element={<Focus />} />
          <Route path='/habits' element={<Habits />} />
          <Route path='/performance' element={<Performance />} />
          <Route path='/notes/*' element={<Notes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
