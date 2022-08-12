import './CSS-Files/App.css';
import Navbar from './Components/Navbar';
import Habits from './Components/Habits';
import Home from './Components/Home';
import Performance from './Components/Performance';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './Components/Notes';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/habits' element={<Habits />} />
          <Route path='/performance' element={<Performance />} />
          <Route path='/notes/*' element={<Notes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
