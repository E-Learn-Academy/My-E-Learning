import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/auth/LoginPage';
import RegisterPage from './Components/auth/RegisterPage';
import { AuthProvider } from './Components/context/AuthenticationContext.jsx';
import Navbar from './Components/Navbar/Navbar';
import { Profile } from './Pages/Profile.jsx';
import { Toaster } from 'react-hot-toast';


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
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
