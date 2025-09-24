import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";

export default function Exam() {
  const [exams, setExams] = useState([]);

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const navigat = useNavigate();
  const getAllExams = async () => {



    const { data } = await axios.get(
      "https://edu-master-psi.vercel.app/exam",
      {
        headers: {
          token: `${token}`,
        },
      }
    );



    setExams(data.data);
  };
  useEffect(() => {
    getAllExams();
  }, []);

  const openExam = (id) => {
    navigat(`/ExamDetails/${id}`);
    console.log(id);
  };

  return (
    <>
      <div className="min-h-screen bg-[#0d1b2a] text-white p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          📚 Available Exams
        </h1>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6
        "
        >
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-[#1b263b] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {exam.title}
              </h2>
              <p className="text-gray-300 text-sm mb-3">{exam.description}</p>
              <p className="text-gray-400 text-sm mb-1">
                🎯 Duration: {exam.duration} mins
              </p>
              <p className="text-gray-400 text-sm mb-1">
                🏫 Class: {exam.classLevel}
              </p>
              <p className="text-gray-400 text-sm mb-3">
                📅 {new Date(exam.startDate).toLocaleDateString()} -{" "}
                {new Date(exam.endDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => openExam(exam._id)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg mt-3"
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
