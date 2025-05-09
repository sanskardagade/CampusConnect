import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FiLogIn, FiAlertCircle } from "react-icons/fi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

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
        ? "http://localhost:5000/api/student/login"
        : "http://localhost:5000/api/auth/login";

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
      localStorage.setItem("role", data.user.role);
      updateUser(data.user);

      // Redirect based on role
      const rolePath = {
        'student': '/student', 
        'faculty': '/faculty',
        'hod': '/hod',
        'principal': '/principal/dashboard'
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
        <div className="w-1/2 hidden lg:flex">
          <div className="relative w-full h-screen">
            <img
              src="/src/assets/dit_frontgate.jpeg"
              alt="College"
              className="object-cover w-full h-full"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-white text-5xl font-bold">CampusConnect</h1>
            </div> */}
          </div>
        </div>

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

            <div className="text-center mt-4">
              <p>Don't have an account?</p>
              <a
                href="/signup"
                className="text-white font-bold inline-block rounded-lg px-7 py-3 mt-2 bg-red-700 hover:bg-red-800"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignInPage;
