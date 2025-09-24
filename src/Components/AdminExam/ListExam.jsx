import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ListExam() {
  const [exams, setExams] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate= useNavigate();

  const getAllExam = async () => {
    try {
      const { data } = await axios.get(
        "https://edu-master-psi.vercel.app/exam",
        {
          headers: { token: `${token}` },
        }
      );
      console.log(data.data);
      setExams(data.data);
    } catch (error) {
      console.log("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    getAllExam();
  }, []);

  const handleDelete = async (examId) => {
    if (window.confirm("هل أنت متأكد من مسح هذا الامتحان؟")) {
      await axios.delete(`https://edu-master-psi.vercel.app/exam/${examId}`, {
        headers: { token: `${token}` },
      });
      toast.success("Exam  deleted Successfully ");

      setExams((prev) => prev.filter((exam) => exam._id !== examId));

      getAllExam();
    }
  };



  if (!exams.length) {
    return <p className="p-6 text-gray-500">Loading exams...</p>;
  }

  return (
    <div
      style={{
        padding: "80px",
        backgroundColor: "rgb(240, 240, 240)",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-between mt-7">
        <div >
          <h1 className="text-2xl font-bold mb-6">All Exams</h1>
        </div>
        <div >
          <button
            onClick={()=>navigate('/AddExam')}
            className="bg-yellow-500 text-white px-6  py-3 rounded hover:bg-yellow-600"
          >
           Add New Exam
          </button>
        </div>
      </div>

      {exams.map((exam) => (
        <div key={exam._id} className="p-6 mb-10 bg-white rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">{exam.title}</h2>
              <p className="text-gray-600">{exam.description}</p>
              <p className="text-gray-600">
                Start Date:{" "}
                {new Date(exam.startDate).toISOString().split("T")[0]} | End
                date: {new Date(exam.endDate).toISOString().split("T")[0]}
              </p>

              <p className="text-sm text-gray-500">
                Duration: {exam.duration} mins | Level: {exam.classLevel}
              </p>
            </div>
            <div className="flex gap-2">

              <button
                onClick={() => handleDelete(exam._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Question</th>
                  <th className="border px-4 py-2 text-left">Options</th>
                  <th className="border px-4 py-2 text-left">Correct Answer</th>
                  <th className="border px-4 py-2 text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {exam.questions.map((q, index) => (
                  <tr key={q._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{q.text}</td>
                    <td className="border px-4 py-2">
                      <select
                        className="border rounded px-2 py-1 w-full text-gray-700"
                        value={answers[q._id] || ""}
                        onChange={(e) => handleSelect(q._id, e.target.value)}
                      >
                        <option value="" disabled>
                          اختر الإجابة
                        </option>
                        {q.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2 text-green-600 font-semibold">
                      {q.correctAnswer}
                    </td>
                    <td className="border px-4 py-2">{q.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
