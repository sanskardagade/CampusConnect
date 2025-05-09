import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { FaUserShield, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-800 flex justify-center items-center p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Card */}
          <div 
            onClick={() => navigateHandler("Admin")}
            className="bg-red-900 p-6 rounded-lg text-center text-red-100 cursor-pointer transition-all hover:bg-red-800 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 flex justify-center">
              <FaUserShield className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Admin</h2>
            <p className="text-red-200">
              Login as an administrator to access the dashboard to manage app data.
            </p>
          </div>

          {/* Student Card */}
          <div 
            onClick={() => navigateHandler("Student")}
            className="bg-red-900 p-6 rounded-lg text-center text-red-100 cursor-pointer transition-all hover:bg-red-800 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 flex justify-center">
              <FaUserGraduate className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Student</h2>
            <p className="text-red-200">
              Login as a student to explore course materials and assignments.
            </p>
          </div>

          {/* Teacher Card */}
          <div 
            onClick={() => navigateHandler("Teacher")}
            className="bg-red-900 p-6 rounded-lg text-center text-red-100 cursor-pointer transition-all hover:bg-red-800 hover:text-white hover:shadow-lg"
          >
            <div className="mb-4 flex justify-center">
              <FaChalkboardTeacher className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Teacher</h2>
            <p className="text-red-200">
              Login as a teacher to create courses, assignments, and track student progress.
            </p>
          </div>
        </div>
      </div>

      {/* Loader */}
      {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 text-white">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p>Please Wait</p>
        </div>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ChooseUser;