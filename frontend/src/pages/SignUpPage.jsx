import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import { FaCheckCircle, FaChalkboardTeacher, FaUsers, FaCalendarCheck } from "react-icons/fa";
import CollegeImg from "../assets/dit_sunset.jpeg"; // Your custom image for background

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "student",
    contactNo: "",
    // Student specific
    erpid: "",
    department: "",
    semester: "",
    // Faculty specific
    facultyId: "",
    subjects: [],
    // HOD specific
    hodId: "",
    departmentManaged: "",
    // Principal specific
    principalId: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subjects') {
      setFormData(prev => ({
        ...prev,
        subjects: value.split(',').map(subject => subject.trim())
      }));
    } else if (name === 'department') {
      // Ensure department is properly formatted
      const formattedDepartment = value.toLowerCase().replace(/\s+/g, '_');
      setFormData(prev => ({
        ...prev,
        [name]: formattedDepartment
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let registrationData;
      let endpoint;

      if (formData.role === 'student') {
        // Student registration
        registrationData = {
          erpid: formData.erpid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          semester: formData.semester
        };
        endpoint = "http://localhost:5000/api/student/register";
      } else {
        // Other user registration (faculty, HOD, principal)
        registrationData = {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          contactNo: formData.contactNo,
          department: formData.department
        };

        // Add role-specific fields
        if (formData.role === 'faculty') {
          registrationData.facultyId = formData.facultyId;
          registrationData.subjects = formData.subjects;
        } else if (formData.role === 'hod') {
          registrationData.hodId = formData.hodId;
          registrationData.departmentManaged = formData.departmentManaged;
        } else if (formData.role === 'principal') {
          registrationData.principalId = formData.principalId;
        }

        endpoint = "http://localhost:5000/api/auth/register";
      }

      console.log('Submitting registration data:', registrationData);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        alert("Registration successful!");
        navigate(`/${data.user.role === 'student' ? 'student' : 'faculty'}/dashboard`);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong.");
    }
  };

  // Render role-specific fields
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'student':
        return (
          <>
            <input
              type="text"
              name="erpid"
              placeholder="ERP ID"
              value={formData.erpid}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select Department</option>
              <option value="computer_science">Computer Science</option>
              <option value="information_technology">Information Technology</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
            <input
              type="number"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </>
        );
      case 'faculty':
        return (
          <>
            <input
              type="text"
              name="facultyId"
              placeholder="Faculty ID"
              value={formData.facultyId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select Department</option>
              <option value="computer_science">Computer Science</option>
              <option value="information_technology">Information Technology</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
            <input
              type="text"
              name="subjects"
              placeholder="Subjects (comma separated)"
              value={formData.subjects.join(', ')}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </>
        );
      case 'hod':
        return (
          <>
            <input
              type="text"
              name="hodId"
              placeholder="HOD ID"
              value={formData.hodId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select Department</option>
              <option value="computer_science">Computer Science</option>
              <option value="information_technology">Information Technology</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
            <select
              name="departmentManaged"
              value={formData.departmentManaged}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select Department to Manage</option>
              <option value="computer_science">Computer Science</option>
              <option value="information_technology">Information Technology</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </>
        );
      case 'principal':
        return (
          <input
            type="text"
            name="principalId"
            placeholder="Principal ID"
            value={formData.principalId}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-red-100 to-gray-100">

        {/* Left Info Section with background */}
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

              <button
                onClick={() => navigate("/signin")}
                className="mt-8 px-6 py-2 bg-white text-red-800 rounded-full hover:bg-gray-100 transition font-semibold"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right SignUp Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center md:w-1/2 p-8"
        >
          <form
            className="bg-white border-2 border-red-800 shadow-xl p-10 rounded-3xl w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center text-red-800 text-3xl font-bold mb-6">
              Create Your Account
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                value={formData.contactNo}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
                <option value="principal">Principal</option>
              </select>

              {renderRoleSpecificFields()}
            </div>

            <button
              type="submit"
              className="mt-6 bg-red-800 hover:bg-red-700 text-white font-semibold py-3 rounded-lg w-full text-base transition duration-300"
            >
              Create Account
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default SignUpPage;
