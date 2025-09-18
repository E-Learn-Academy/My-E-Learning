import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ExamDetails() {
  const { _id } = useParams();
  const [examData, setexamData] = useState([]);

  const getExamDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://edu-master-delta.vercel.app/exam/get/${_id}`,
        {
          headers: {
            token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmFhLmhvc3NpZW44OEBnbWFpbC5jb20iLCJfaWQiOiI2OGM5YTAwMTI4MzAzYTllMTBkYmZmNDIiLCJpYXQiOjE3NTgxODYxNTEsImV4cCI6MTc1ODI3MjU1MX0.0s_oiXbqDFwDW3OYHwfeIiLAMSWp9Mf1vaaQ9DOmbfY`,
          },
        }
      );
      console.log(data.data);

      setexamData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExamDetails();
  }, []);

  const [answers, setAnswers] = useState({});
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  const handleSubmit = () => {
    console.log("all Answers:", answers);
  };

  return (
    <>
      <div className="min-h-screen bg-[#0d1b2a] text-white p-30">
        <div
          className="max-w-3xl mx-auto p-6  mt-10
        bg-[#1b263b] rounded-2xl shadow-lg hover:shadow-2xl transition

 "
        >
          {/* Exam Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-300 ">
              ❓{examData.title}
            </h1>
            <p className="text-gray-300   mt-2"> {examData.description}</p>
            <p className="text-gray-300  mt-1">
              🕒 Duration: {examData.duration} minutes
            </p>
          </div>

          {examData.questions?.map((q) => (
            <div key={q._id} className="mb-6 p-4 border rounded-lg bg-gray-50 ">
              <h3 className="text-gray-800 font-semibold mb-2">{q.text}</h3>
              <div className="space-y-2">
                {q.options?.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      onChange={(e) => handleChange(q._id, e.target.value)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit}  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg mt-3 w-full">
            Submit Exam
          </button>
        </div>
      </div>
    </>
  );
}
