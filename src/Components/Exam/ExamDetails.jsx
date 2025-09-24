import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthenticationContext";

export default function ExamDetails() {
  const { _id } = useParams();
  const [examData, setexamData] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  //get exam by id
  const getExamDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://edu-master-psi.vercel.app/exam/get/${_id}`,
        {
          headers: {
          token: `${token}`,
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

  const [answer, setAnswer] = useState({});
  const [score, setScore] = useState(null);

     const handleChange = (questionId, value) => {
    setAnswer((prev) => ({ ...prev, [questionId]: value }));
  };





  const handleSubmit = async() => {
  const answers = Object.entries(answer).map(
    ([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    })
  );

  console.log("Formatted answer:", answers);
console.log("Submitting to:", `https://edu-master-psi.vercel.app/studentExam/submit/${_id}`);
console.log("Body:", { answer: answers });
console.log("Token:", token);
  try {
    const { data } = await axios.post(
      `https://edu-master-psi.vercel.app/studentExam/submit/${_id}`,
       {answers} ,
      {
        headers: {
          token: `${token}`,
        },
      }
    );

    console.log("Submit Response:", data);

   // navigate("/result", { state: { result: data } });

  } catch (error) {
    console.error("Error submitting exam:", error);
  }
};

  return (
    <>
      <div className="min-h-screen bg-[#0d1b2a] text-white p-30">
        <div
          className="max-w-3xl mx-auto p-6  mt-10
        bg-[#1b263b] rounded-2xl shadow-lg hover:shadow-2xl transition

 "
        >
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
                {q?.options?.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      required
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

          <button
            className="w-full items-center  bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300"
            onClick={handleSubmit}
            style={{ padding: "10px 20px" }}
          >
            Submit
          </button>

          {/* {score && (
            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
              نتيجتك: {score.totalScore} / {score.maxScore} نقطة
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
