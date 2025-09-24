
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/auth/LoginPage';
import RegisterPage from './Components/auth/RegisterPage';
import { AuthProvider } from './Components/context/AuthenticationContext.jsx';
import Navbar from './Components/Navbar/Navbar';
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
            <Route path='/' element={<Home/>}/>
            <Route path="/home" element={<Home />} />

            <Route path='/loginPage' element={<LoginPage/>}/>
            <Route path='/registerPage' element={<RegisterPage/>}/>
            <Route path='/profile' element={<Profile/>}/>

            <Route path='/loginPage' element={<LoginPage/>}></Route>
            <Route path='/registerPage' element={<RegisterPage/>}></Route>
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
      </AuthProvider>
    </>
  );
}

export default App;
