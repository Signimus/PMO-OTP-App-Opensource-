import logo from './logo.svg';
import './App.css';
import {useGlobalContext} from './context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
           <Route exact path='/' element={<Home/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
