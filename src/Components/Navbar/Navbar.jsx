import React, { useEffect, useState } from 'react';
import menuIcon from '../images/menu_bar.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
 
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-20 p-6 ${
        isScrolled ? 'bg-[#6c63ff]' : 'bg-[#1f2641]'
      }`}
    >
      <div className="flex justify-between items-center w-[80%] mx-auto text-white">
      
        <h1 className="text-3xl font-bold">Education</h1>

 
        {!isMobile && (
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
        )}

   
        {isMenuOpen && isMobile && (
          <ul className="absolute  top-24 right-0 w-44 flex flex-col items-center gap-12 bg-[#1f2641] text-lg p-4">
   
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




