import React from "react"
import Card from "../lesson-card/Card"
import { useEffect, useState } from "react";
import lessonsService from '../services/lessonsService'
import bg from '../../assets/images/bg.svg'
import bg2 from '../../assets/images/5f52d24bbe17c562b11c6c8f_courses-hero-webflow-template.jpg'

export default function Lessons(){
    const [lessons, setLessons]= useState([])
    const token = localStorage.getItem("token");
    
    /*useEffect(() => {
        console.log("Token in useEffect:", token);
        if (token) {
            lessonsService.getLessons(token)
            .then((res) => {
                console.log("Full response:", res.data);
                setLessons(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching lessons:", err.response || err);
            });
        } else {
            console.error("No token found!");
        }
    }, [token]);*/
    useEffect(() => {
        console.log("Token in useEffect:", token);
        if (token) {
            lessonsService.getLessons(token)
            .then((res) => {
                console.log("Full response:", res.data);
                setLessons(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching lessons:", err.response || err);
            });
        } else {
            console.error("No token found!");
        }
    }, [token]);
    return(
        <div className="bg-gray-200">
        <section className="max-h-[90vh] md:h-[90vh] relative mt-[80px]">
            <img src={bg} alt="" className="h-full absolute top-0 left-0 " />
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between md:items-center h-full p-5 md:p-0">
                <div className="pl-0 md:pl-[7%] relative">
                    <h1 className="font-bold text-[40px] lg:text-[80px] leading-none">Courses</h1>
                    <p className="w-[90%] md:w-[75%] mb-7 mt-1 text-gray-700 text-[19px]">Explore a wide variety of educational courses across different fields</p>
                    <a href="#courses" className=" relative uppercase px-[30px] py-[15px] text-[#fff] text-[19px] rounded bg-blue-900 hover:bg-blue-800 hover:-translate-y-0.5 transition duration-300 cursor-pointer">View Courses</a>
                </div>
                <img src={bg2} alt="bg" className="w-full md:w-[50%] rounded-4xl"/>
            </div>
        </section>
        <div id="courses" className="bg-[#1f2641] pb-10 pt-[80px] px-2">
            <div className="w-[90%] m-auto">
                <h1 className="text-[40px] font-bold text-[#fff] text-center mb-10">Our Courses</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] ">
                    {lessons.map((lesson,index)=><Card key={index} lesson={lesson}/>)}
                </div>
            </div>
        </div>
        </div>
    )
}