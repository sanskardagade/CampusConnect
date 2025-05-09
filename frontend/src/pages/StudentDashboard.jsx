import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AttendanceUpload from '../components/AttendanceUpload';
import { 
  FiDownload, 
  FiCalendar, 
  FiActivity, 
  FiBookOpen, 
  FiClock, 
  FiChevronRight, 
  FiBell, 
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiBarChart2,
  FiExternalLink
} from 'react-icons/fi';

const StudentDashboard = () => {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    courses: [],
    stressData: {
      currentLevel: "Moderate",
      score: 65,
      weeklyTrend: [45, 52, 65, 60, 58, 65, 70],
      factors: [],
      recommendations: []
    },
    recentNotes: [],
    upcomingDeadlines: [],
    attendance: {
      subjects: [],
      overallAttendance: 0
    }
  });

  useEffect(() => {
    // Redirect to login if no user data
    if (!userLoading && !user) {
      navigate('/signin');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        // Fetch dashboard data
        const dashboardResponse = await fetch('http://localhost:5000/api/student/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!dashboardResponse.ok) {
          if (dashboardResponse.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/signin');
            return;
          }
          throw new Error('Failed to fetch dashboard data');
        }

        const dashboardData = await dashboardResponse.json();

        // Fetch attendance data
        const attendanceResponse = await fetch('http://localhost:5000/api/student/attendance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (attendanceResponse.ok) {
          const attendanceData = await attendanceResponse.json();
          setDashboardData(prev => ({
            ...prev,
            ...dashboardData,
            attendance: attendanceData
          }));
        } else {
          setDashboardData(prev => ({
            ...prev,
            ...dashboardData
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, userLoading, navigate]);

  if (userLoading || loading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-red-700 text-center">
          <FiAlertTriangle className="mx-auto mb-2" size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useEffect
  }

  const { courses, stressData, recentNotes, upcomingDeadlines, attendance } = dashboardData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Function to determine attendance status color
  const getAttendanceStatusColor = (percentage) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
      {/* Welcome section */}
      <motion.section 
        className="bg-white rounded-lg shadow-md p-6 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h2>
            <p className="text-gray-600">{user.erpid} | {user.department}</p>
            <p className="text-gray-600">{user.semester} Semester</p>
          </div>
          <div className="mt-4 md:mt-0 bg-red-50 p-3 rounded-lg">
            <p className="text-red-800 font-medium flex items-center">
              <FiBell size={16} className="mr-2" />
              {dashboardData.notifications || 0} new notifications
            </p>
          </div>
        </div>
      </motion.section>

      {/* Attendance Upload Section */}
      {(user.role === 'admin' || user.role === 'faculty') && <AttendanceUpload />}

      {/* Attendance Overview */}
      <motion.section 
        className="bg-white rounded-lg shadow-md p-6 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Overall Attendance</h4>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
                <div 
                  className={`h-2.5 rounded-full ${getAttendanceStatusColor(attendance.overallAttendance)}`}
                  style={{ width: `${attendance.overallAttendance}%` }}
                ></div>
              </div>
              <span className={`font-semibold ${getAttendanceStatusColor(attendance.overallAttendance)}`}>
                {attendance.overallAttendance}%
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {attendance.subjects.map((subject, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{subject.name}</span>
                <span className={`font-semibold ${getAttendanceStatusColor(subject.attendance)}`}>
                  {subject.attendance}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Attendance */}
        <motion.section 
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Course Attendance</h3>
            <button className="text-red-700 text-sm font-medium flex items-center">
              View Detailed Report <FiChevronRight size={16} />
            </button>
          </div>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {courses.map((course) => (
              <motion.div 
                key={course.id} 
                className="p-4 border border-gray-100 rounded-lg hover:bg-red-50 transition-colors duration-200"
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-800">
                          <FiBookOpen size={18} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{course.code}: {course.name}</h4>
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center">
                    <div className="mr-4">
                      <p className="text-sm text-gray-600">Attendance</p>
                      <p className={`font-bold ${getAttendanceStatusColor(course.attendance)}`}>
                        {course.attendance}%
                        {course.attendance < 75 && (
                          <FiAlertTriangle className="inline-block ml-1" />
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button 
                        className="px-3 py-1 bg-red-700 text-white text-sm rounded-md hover:bg-red-800 flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiFileText className="mr-1" size={14} />
                        Notes ({course.notes})
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Upcoming Deadlines */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <motion.div 
                  key={deadline.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center">
                    <FiClock size={16} className="text-red-600 mr-2" />
                    <div>
                      <h4 className="font-medium text-gray-800">{deadline.title}</h4>
                      <p className="text-sm text-gray-600">Due: {deadline.date}</p>
                    </div>
                  </div>
                  <span className="text-red-600 font-medium">{deadline.remaining}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stress Monitor */}
        <motion.section 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Stress Monitor</h3>
            <span className={`px-2 py-1 text-sm rounded ${
              stressData.currentLevel === "Low" ? "bg-green-100 text-green-800" :
              stressData.currentLevel === "Moderate" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {stressData.currentLevel}
            </span>
          </div>
          
          {/* Stress Score Visualization */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Stress Score</span>
              <span className="font-bold text-gray-800">{stressData.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className={`h-2.5 rounded-full ${
                  stressData.score < 50 ? "bg-green-600" :
                  stressData.score < 75 ? "bg-yellow-500" :
                  "bg-red-600"
                }`}
                style={{ width: `${stressData.score}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${stressData.score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          {/* Weekly Trend */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Weekly Trend</h4>
            <div className="flex items-end justify-between h-24">
              {stressData.weeklyTrend.map((value, index) => (
                <motion.div 
                  key={index}
                  className={`w-6 rounded-t ${
                    value < 50 ? "bg-green-400" :
                    value < 75 ? "bg-yellow-400" :
                    "bg-red-400"
                  }`}
                  style={{ height: `${value}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                ></motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          
          {/* Stress Factors */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Contributing Factors</h4>
            <div className="space-y-2">
              {stressData.factors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{factor.name}</span>
                  <span className={`text-sm font-medium ${
                    factor.level === "Low" ? "text-green-600" :
                    factor.level === "Moderate" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {factor.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <motion.button 
            className="w-full mt-4 px-4 py-2 bg-red-700 text-white text-sm rounded-md hover:bg-red-800 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiActivity className="mr-2" />
            View Wellness Resources
          </motion.button>
        </motion.section>
      </div>

      {/* Recent Notes */}
      <motion.section 
        className="mt-6 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Notes</h3>
          <button className="text-red-700 text-sm font-medium flex items-center">
            View All Notes <FiChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Course</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Date Added</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Size</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentNotes.map((note) => (
                <motion.tr 
                  key={note.id}
                  className="border-b border-gray-100 hover:bg-red-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + (note.id * 0.1) }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <FiFileText size={16} className="text-red-600 mr-2" />
                      <span className="font-medium text-gray-800">{note.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{note.course}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{note.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{note.size}</td>
                  <td className="px-4 py-3">
                    <motion.button 
                      className="p-2 text-red-700 hover:bg-red-100 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiDownload size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default StudentDashboard;