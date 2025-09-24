
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
import Result from './Components/Exam/Result.jsx';

import Lessons from './Components/lessons/lessons.jsx'

import { Profile } from './Pages/Profile.jsx';
import { Toaster } from 'react-hot-toast';
import PurchasedLessonsPage from "./Components/PurchasedLessons/PurchasedLessonsPage.jsx";
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Dashboard from './Components/dashboard/Dashboard.jsx';



function App() {
  return (
    <>
      <AuthProvider>

        <Toaster position="bottom-right" reverseOrder={false} />



        <Navbar/>
          <Routes>

            <Route path='/' element={<Home/>}></Route>

            <Route path="/home" element={<Home />} />
             <Route path="/Exam" element={<Exam />} />
             <Route path='/ExamDetails/:_id' element={<ExamDetails />}></Route>
            <Route path="/Result" element={<Result />} />

            <Route path='/loginPage' element={<LoginPage/>}></Route>
            <Route path='/registerPage' element={<RegisterPage/>}></Route>
            <Route path='/lessons' element={<Lessons />}></Route>
            <Route path='/profile' element={<Profile/>}/>

          <Route
            path="/PurchasedLessonsPage"
            element={<PurchasedLessonsPage />}
          ></Route>
             <Route 
        path="/dashboard" 
          element={
            <ProtectedRoute requiredRoles={["super-admin", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

          </Routes>
          <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
