import './CSS-Files/App.css';
import Navbar from './Components/Navbar';
import Habits from './Components/HabitsPage/Habits';
import Focus from './Components/FocusPage/Focus';
import Performance from './Components/Charts/Performance';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './Components/TaskPage/Notes';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
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
