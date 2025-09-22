
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/auth/LoginPage';
import RegisterPage from './Components/auth/RegisterPage';
import { AuthProvider } from './Components/context/AuthenticationContext.jsx';
import Navbar from './Components/Navbar/Navbar';
import Lessons from './Components/lessons/lessons.jsx'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/loginPage' element={<LoginPage/>}></Route>
            <Route path='/registerPage' element={<RegisterPage/>}></Route>
            <Route path='/lessons' element={<Lessons />}></Route>
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
