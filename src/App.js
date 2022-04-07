
import './App.css';

import {MonitorPage} from './Pages/MonitorPage'
import { Show } from './Pages/Show';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<MonitorPage/>}></Route>
          <Route path='/:id' element={<Show/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
