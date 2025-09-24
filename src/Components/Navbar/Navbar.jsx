import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/loginPage");
    setIsMenuOpen(false);
  };

  const handlePurchasedLessons = () => {
    navigate("/PurchasedLessonsPage");
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Courses", link: "/courses" },
    { name: "Contact", link: "/" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-20 px-6 z-50 pt-6 ${
        isScrolled ? "bg-[#6c63ff]" : "bg-[#1f2641]"
      } transition-colors duration-300`}
    >
      <div className="flex justify-between items-center w-[80%] mx-auto text-white">
        
        <Link to="/" className="text-2xl font-bold">
          Education
        </Link>

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
                <Link to="/lessons">Courses</Link>
                <div className='nav-underline'></div>
              </li>
              <li className='nav-item relative cursor-pointer'>
                Contact
                <div className='nav-underline'></div>
              </li>

            <ul className="flex items-center gap-12 text-lg pt-3">
              {" "}
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="nav-item relative cursor-pointer"
                >
                  <Link to={item.link}>{item.name}</Link>
                  <div className="nav-underline"></div>
                </li>
              ))}

            </ul>

            <div className="flex items-center gap-4 ml-8">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handlePurchasedLessons}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <AcademicCapIcon className="w-5 h-5" />
                    <span>My Learning</span>
                  </button>


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
              <Link to="/lessons">Courses</Link>
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

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#e85a4f] rounded-full flex items-center justify-center">
                     <Link to="/profile"><UserIcon className="w-5 h-5 text-white" /></Link> 

                    </div>
                    <span className="text-sm font-medium">
                      {user?.fullName || user?.email?.split("@")[0] || "User"}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-[#e85a4f] hover:bg-[#d94a3f] px-6 py-2 rounded-lg cursor-pointer transition-colors duration-300 font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <Bars3Icon className="w-8 h-8" /> 
          </button>
        )}
      </div>

      <div
        className={`fixed top-20 right-0 h-[70vh] w-64 bg-[#1f2641] text-white shadow-lg transform transition-transform duration-300 z-40 rounded-l-xl overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 mt-4 px-6">
          {" "}
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2"
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handlePurchasedLessons}
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-3 rounded-lg transition-colors duration-300"
              >
                <AcademicCapIcon className="w-5 h-5" />
                <span>My Learning</span>
              </button>

              <div className="flex items-center gap-3 justify-center bg-[#2c2d5c] px-4 py-2 rounded-lg">
                <div className="w-10 h-10 bg-[#e85a4f] rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-base font-medium">
                  {user?.fullName || user?.email?.split("@")[0] || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-[#e85a4f] hover:bg-[#d94a3f] px-6 py-3 rounded-lg transition-colors duration-300 font-medium mt-4"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
