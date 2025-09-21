import React, { useEffect, useState } from 'react';
import menuIcon from '../images/menu_bar.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsMenuOpen(false); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/loginPage');
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-20 p-6 z-50 ${
        isScrolled ? 'bg-[#6c63ff]' : 'bg-[#1f2641]'
      }`}
    >
      <div className="flex justify-between items-center w-[80%] mx-auto text-white">
        <h1 className="text-3xl font-bold">Education</h1>

        {!isMobile && (
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-12 text-lg">
              <li className='nav-item relative cursor-pointer'>
                <Link to="/">Home</Link>
                <div className='nav-underline'></div>
              </li>
              <li className='nav-item relative cursor-pointer'>
                About
                <div className='nav-underline'></div>
              </li>
              <li className='nav-item relative cursor-pointer'>
                Courses
                <div className='nav-underline'></div>
              </li>
              <li className='nav-item relative cursor-pointer'>
                Contact
                <div className='nav-underline'></div>
              </li>
            </ul>

            {/* Auth Section - Desktop */}
            <div className="flex items-center gap-4 ml-8">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#e85a4f] rounded-full flex items-center justify-center">
                     <Link to="/profile"><UserIcon className="w-5 h-5 text-white" /></Link> 
                    </div>
                    <span className="text-sm font-medium">
                      {user?.fullName || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                /* Login Button Only */
                <button
                  onClick={handleLogin}
                  className="bg-[#e85a4f] hover:bg-[#d94a3f] px-6 py-2 rounded-lg transition-colors duration-300 font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && isMobile && (
          <ul className="absolute top-24 right-0 w-64 flex flex-col items-center gap-6 bg-[#1f2641] text-lg p-6 rounded-lg shadow-lg border border-gray-600">
            <li className='nav-item relative cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link to="/">Home</Link>
              <div className='nav-underline'></div>
            </li>
            <li className='nav-item relative cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              About
              <div className='nav-underline'></div>
            </li>
            <li className='nav-item relative cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Courses
              <div className='nav-underline'></div>
            </li>
            <li className='nav-item relative cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              Contact
              <div className='nav-underline'></div>
            </li>

            {/* Auth Section - Mobile */}
            <div className="w-full border-t border-gray-600 pt-4 mt-2">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-10 h-10 bg-[#e85a4f] rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-base font-medium">
                      {user?.fullName || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full bg-[#e85a4f] hover:bg-[#d94a3f] px-4 py-3 rounded-lg transition-colors duration-300 font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </ul>
        )}

        {isMobile && (
          <img
            src={menuIcon}
            alt="menu icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-6 z-40 cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}