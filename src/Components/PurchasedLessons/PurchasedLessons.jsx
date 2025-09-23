import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PurchasedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found!");

      setLoading(true);
      const response = await axios.get(
        "https://edu-master-psi.vercel.app/lesson/my/purchased",
        { headers: { token } }
      );

      console.log("API Lessons Data:", response.data);

   
      setLessons(response.data.data);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchLessons();
}, []);


  const handleContinue = (id) => {
    navigate(`/lessons/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-[#1f2641] min-h-screen flex justify-center items-center text-white">
        Loading purchased lessons...
      </div>
    );
  }

  return (
    <div className="bg-[#1f2641] min-h-screen pt-28 px-6 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center">
        My Purchased Lessons
      </h1>

      {lessons.length === 0 ? (
        <p className="text-center text-gray-400">No purchased lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-[#2c2d5c] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition duration-300 flex flex-col"
            >
              <div className="w-full h-48 bg-black">
                {lesson.video ? (
                  <video
                    src={lesson.video}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{lesson.title}</h2>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="w-full max-w-xs">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: `${lesson.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {lesson.progress || 0}% completed
                    </p>
                  </div>

                  <button
                    onClick={() => handleContinue(lesson._id)}
                    className="ml-6 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-white transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedLessons;
