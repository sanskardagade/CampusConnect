import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FiLogIn, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaCheckCircle, FaChalkboardTeacher, FaUsers, FaCalendarCheck } from "react-icons/fa";
import CollegeImg from "../assets/dit_sunset.jpeg"; // Your custom image for background
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
// Removed custom env import; using Vite environment variable instead
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://campus-link-4.onrender.com';

const SignInPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = formData.role === 'student'
        ? `${API_URL}/api/student/login`
        : `${API_URL}/api/auth/login`;

      console.log('Attempting login with:', {
        endpoint,
        username: formData.username,
        role: formData.role
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Augment the user with ERP staff ID for attendance dashboard
      const userWithErp = { ...data.user, ErpStaffID: formData.username };
      // Store updated user
      updateUser(userWithErp);
      localStorage.setItem("role", userWithErp.role);

      // Redirect based on role
      const rolePath = {
        'student': '/student', 
        'faculty': '/faculty',
        'hod': '/hod',
        'principal': '/principal'
      };

      navigate(rolePath[data.user.role] || '/');
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen font-sans">
        {/* Left Section - Image + Heading */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative md:w-1/2 h-[500px] md:h-auto"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CollegeImg})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 text-white p-10 h-full flex flex-col justify-center items-start">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-sm mx-auto">
              <h1 className="text-4xl font-extrabold mb-4">Welcome to CampusConnect</h1>
              <p className="text-md text-gray-200 mb-6">
                CampusConnect is your all-in-one platform for academic collaboration and campus life.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarCheck className="text-green-400 text-xl" />
                  <span>Real-time attendance & leave management</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-blue-300 text-xl" />
                  <span>Role-based dashboards & features</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-yellow-300 text-xl" />
                  <span>Stress tracking and well-being</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaChalkboardTeacher className="text-pink-300 text-xl" />
                  <span>Events, circulars & announcements</span>
                </div>
              </div>

              {/* <button
                onClick={() => navigate("/signin")}
                className="mt-8 px-6 py-2 bg-white text-red-800 rounded-full hover:bg-gray-100 transition font-semibold"
              >
                Already have an account? Login
              </button> */}
            </div>
          </div>
        </motion.div>

        

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-10">
          <div className="border-2 border-red-700 rounded-xl p-8 w-full max-w-md shadow-lg bg-white">
            <h2 className="text-center text-2xl mb-5">Login</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                <FiAlertCircle className="mr-2" />
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="p-3 text-sm border rounded-md"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
                <option value="principal">Principal</option>
              </select>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="p-3 text-sm border rounded-md"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="p-3 text-sm border rounded-md"
              />

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiLogIn />
                    Login
                  </>
                )}
              </button>
            </form>

            <p className="text-right text-sm mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </p>

            {/* <div className="text-center mt-4">
              <p>Don't have an account?</p>
              <a
                href="/signup"
                className="text-white font-bold inline-block rounded-lg px-7 py-3 mt-2 bg-red-700 hover:bg-red-800"
              >
                Sign Up
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignInPage;