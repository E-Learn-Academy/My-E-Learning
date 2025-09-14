import React from 'react';
import Homeimg from '../images/header.svg';

export default function Hero() {
  return (
    <div className="bg-[#1f2641] h-[100vh] flex flex-col justify-center items-center mt-12 p-5">
  <div className="w-[90%] flex items-center gap-10 justify-center max-sm:flex-col">
    
    <div className="basis-[50%] flex flex-col gap-3">
      <p className="md:text-4xl sm:text-3xl max-sm:text-2xl text-white font-bold">
        Elevate Your Skills, Expand Your Knowledge, and Transform Your Career Path to New Heights
      </p>
      <p className="text-white">
        Join our learning platform to master new skills, unlock opportunities, and accelerate your professional growth. 
        Tailored courses, practical projects, and expert guidance to help you achieve your career goals.
      </p>
      <button className="w-36 h-10 mt-5 cursor-pointer bg-orange-700 outline-none border-none rounded font-bold text-lg text-white">
        Get Started
      </button>
    </div>

    
    <div className="basis-[50%]">
      <img src={Homeimg} alt="home-img" />
    </div>

  </div>
</div>

   
  )
}
