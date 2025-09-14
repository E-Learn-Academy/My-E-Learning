
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
  
    <Routes>
      <Route path='/' element={<Home/>}></Route>
    </Routes>

    </>
  )
}

export default App
