
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/auth/LoginPage';
import RegisterPage from './Components/auth/RegisterPage';
import { AuthProvider } from './Components/context/AuthenticationContext.jsx';
import Navbar from './Components/Navbar/Navbar';
import Exam from './Components/Exam/Exam.jsx';
import Footer from './Components/Footer/Footer.jsx';
import ExamDetails from './Components/Exam/ExamDetails.jsx';

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path="/home" element={<Home />} />
             <Route path="/Exam" element={<Exam />} />
             <Route path='/ExamDetails/:_id' element={<ExamDetails />}></Route>
            <Route path='/loginPage' element={<LoginPage/>}></Route>
            <Route path='/registerPage' element={<RegisterPage/>}></Route>
          </Routes>
          <Footer/>
      </AuthProvider>
    </>
  )
}

export default App
