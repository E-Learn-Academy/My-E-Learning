import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, maxScore } = location.state || {};

  if (totalScore === undefined || maxScore === undefined) {
    return (
              <div className="min-h-screen bg-[#0d1b2a] text-white p-30">

        <p>لا توجد نتيجة لعرضها. الرجاء حل الامتحان أولاً.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            backgroundColor: "#64ffda",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          exam
        </button>
      </div>
    );
  }

  const percentage = ((totalScore / maxScore) * 100).toFixed(1);
  const passed = percentage >= 50;

  return (
      <div className="flex justify-center  align-middle bg-[#0d1b2a]  p-30">

      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Result</h1>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: passed ? "#2e7d32" : "#c62828",
            marginBottom: "10px",
          }}
        >
     Score :     {totalScore} / {maxScore}
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            color: passed ? "#2e7d32" : "#c62828",
          }}
        >
          {percentage}% {passed ? "نجاح 🎉" : "رسوب ❌"}
        </div>
        <button
          onClick={() => navigate("/")}
                   className="w-full items-center  bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300"

        >
         close
        </button>
      </div>
    </div>
  );
};

export default Result;
