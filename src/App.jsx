
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/auth/LoginPage';
import RegisterPage from './Components/auth/RegisterPage';

function App() {

  return (
    <>
  
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/home" element={<Home />} />
            <Route path='/loginPage' element={<LoginPage/>}></Route>
      <Route path='/registerPage' element={<RegisterPage/>}></Route>
    </Routes>

    </>
  )
}

export default App
