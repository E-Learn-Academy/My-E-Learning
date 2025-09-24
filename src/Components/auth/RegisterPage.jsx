import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  DevicePhoneMobileIcon, 
  AcademicCapIcon 
} from "@heroicons/react/24/solid";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    classLevel: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { fullName, email, password, cpassword, phoneNumber, classLevel } = formData;

    if (!fullName || !email || !password || !cpassword || !phoneNumber || !classLevel) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      await authService.register(fullName, email, password, phoneNumber, classLevel);
      navigate("/loginpage", { state: { successMessage: "Account created successfully! You can now log in." } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during registration. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 min-h-screen bg-[#1f2041] text-white py-12">
      <div className="w-full max-w-lg px-8 py-10 mx-4 bg-[#2c2d5c] rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white animate__animated animate__fadeInDown animate__slow">
            Create a New Account
          </h1>
          <p className="text-gray-300 mt-2 animate__animated animate__fadeInDown animate__slow">
            Join our learning platform today.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Class Level */}
            <div className="relative">
              <AcademicCapIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="classLevel"
                type="text"
                placeholder="Class Level"
                value={formData.classLevel}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="relative md:col-span-2">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative md:col-span-2">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
              <input
                id="cpassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 mb-6">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e85a4f] hover:bg-[#d94a3f] text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 disabled:bg-[#e85a4f]/50 disabled:cursor-not-allowed flex items-center justify-center"
            >

              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/loginpage" className="font-medium text-[#e85a4f] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
