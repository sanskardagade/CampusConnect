import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { useUser } from '../context';
import { 
  FiBell, 
  FiUsers, 
  FiFileText, 
  FiMapPin, 
  FiActivity, 
  FiClock, 
  FiCheckSquare, 
  FiBookOpen, 
  FiChevronRight, 
  FiAlertTriangle,
  FiPieChart,
  FiBarChart2,
  FiCalendar,
  FiClipboard,
  FiShield,
  FiTrendingUp,
  FiTrendingDown,
  FiBriefcase,
  FiAlertCircle,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi';

const PrincipalDashboard = () => {
  // const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    statistics: {
      totalStudents: 0,
      totalFaculty: 0,
      totalDepartments: 0,
      totalCourses: 0
    },
    recentActivities: [],
    performanceMetrics: {
      attendance: 0,
      passRate: 0,
      researchOutput: 0
    },
    alerts: []
  });

  useEffect(() => {
   // Simulate fetching dashboard data
    const fakeDashboardData = {
      statistics: {
        totalStudents: Math.floor(Math.random() * 5000) + 1000,
        totalFaculty: Math.floor(Math.random() * 300) + 50,
        totalDepartments: Math.floor(Math.random() * 15) + 5,
        totalCourses: Math.floor(Math.random() * 100) + 50
      },
      recentActivities: [
        { id: 1, title: "New faculty joined the Science department", time: "2 hours ago", icon: <FiBriefcase size={16} /> },
        { id: 2, title: "Student project exhibition scheduled for next week", time: "5 hours ago", icon: <FiBookOpen size={16} /> },
        { id: 3, title: "Deadline for mid-semester reports approaching", time: "1 day ago", icon: <FiFileText size={16} /> },
      ],
      performanceMetrics: {
        attendance: parseFloat((Math.random() * 15 + 80).toFixed(2)),
        passRate: parseFloat((Math.random() * 10 + 85).toFixed(2)),
        researchOutput: Math.floor(Math.random() * 20) + 5
      },
      alerts: [
        { id: 1, department: "Engineering", issue: "Low attendance in Thermodynamics class", severity: "medium" },
        { id: 2, department: "Arts", issue: "Upcoming student strike protest", severity: "high" },
      ]
    };

    setTimeout(() => {
      setDashboardData(fakeDashboardData);
      setLoading(false);
    }, 1500); // Simulate a 1.5-second loading time
  }, []);

  if (loading) {
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
          <FiAlertCircle className="mx-auto mb-2" size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { statistics, recentActivities, performanceMetrics, alerts } = dashboardData;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const departments = [
    { id: 1, name: "Computer Science", facultyCount: 12, studentCount: 320, attendanceRate: 92 },
    { id: 2, name: "Mathematics", facultyCount: 8, studentCount: 240, attendanceRate: 88 },
    { id: 3, name: "Physics", facultyCount: 6, studentCount: 180, attendanceRate: 86 },
    { id: 4, name: "Chemistry", facultyCount: 7, studentCount: 210, attendanceRate: 90 }
  ];

  const tasks = [
    { id: 1, title: "Review department budget proposals", time: "10:00 AM", completed: false },
    { id: 2, title: "Meeting with faculty heads", time: "1:30 PM", completed: false },
    { id: 3, title: "Approve staff leave requests", time: "3:00 PM", completed: false }
  ];

  const quickActions = [
    { id: 1, title: "Campus Overview", icon: <FiUsers size={20} />, color: "bg-red-700" },
    { id: 2, title: "Department Reports", icon: <FiFileText size={20} />, color: "bg-red-800" },
    { id: 3, title: "Student Tracking", icon: <FiMapPin size={20} />, color: "bg-red-900" },
    { id: 4, title: "Stress Analysis", icon: <FiActivity size={20} />, color: "bg-red-700" }
  ];

  const campusAlerts = [
    { id: 1, department: "Computer Science", issue: "Attendance below target (85%)", severity: "medium" },
    { id: 2, department: "Physics Lab B", issue: "Equipment maintenance required", severity: "high" },
    { id: 3, department: "Mathematics", issue: "3 faculty positions vacant", severity: "medium" }
  ];

  const stressAnalysisData = [
    { department: "Computer Science", highStress: 28, mediumStress: 142, lowStress: 150 },
    { department: "Mathematics", highStress: 18, mediumStress: 102, lowStress: 120 },
    { department: "Physics", highStress: 15, mediumStress: 85, lowStress: 80 },
    { department: "Chemistry", highStress: 20, mediumStress: 95, lowStress: 95 }
  ];

  const attendanceData = {
    labels: departments.map(dept => dept.name),
    datasets: [
      {
        data: departments.map(dept => dept.attendanceRate),
        backgroundColor: ['#DC2626', '#B91C1C', '#991B1B', '#7F1D1D']
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  function pendingTasks() {
    return tasks.filter(task => !task.completed).length;
  }

  const totalStudents = departments.reduce((sum, dept) => sum + dept.studentCount, 0);
  const totalFaculty = departments.reduce((sum, dept) => sum + dept.facultyCount, 0);
  const averageAttendance = departments.reduce((sum, dept) => sum + dept.attendanceRate, 0) / departments.length;
  const totalHighStressStudents = stressAnalysisData.reduce((sum, dept) => sum + dept.highStress, 0);

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
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, Principal</h2>
            <p className="text-gray-600">Principal</p>
          </div>
          <div className="mt-4 md:mt-0 bg-red-50 p-3 rounded-lg">
            <p className="text-red-800 font-medium flex items-center">
              <FiAlertCircle size={16} className="mr-2" />
              {alerts.length} new alerts
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats Overview */}
      <motion.section 
        className="mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campus Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiUsers size={20} />
            </div>
            <p className="text-sm text-gray-600">Total Students</p>
            <h4 className="text-xl font-bold text-gray-800">{statistics.totalStudents}</h4>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiBriefcase size={20} />
            </div>
            <p className="text-sm text-gray-600">Total Faculty</p>
            <h4 className="text-xl font-bold text-gray-800">{statistics.totalFaculty}</h4>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-900 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiBarChart2 size={20} />
            </div>
            <p className="text-sm text-gray-600">Avg. Attendance</p>
            <h4 className="text-xl font-bold text-gray-800">{averageAttendance}%</h4>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiActivity size={20} />
            </div>
            <p className="text-sm text-gray-600">High Stress Students</p>
            <h4 className="text-xl font-bold text-gray-800">{totalHighStressStudents}</h4>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick actions */}
      <motion.section 
        className="mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(action => (
            <motion.div 
              key={action.id} 
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${action.color} text-white rounded-full w-10 h-10 flex items-center justify-center mb-3`}>
                {action.icon}
              </div>
              <h4 className="font-medium text-gray-800">{action.title}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.section 
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
            <button className="text-red-700 text-sm font-medium flex items-center">
              View All <FiChevronRight size={16} />
            </button>
          </div>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tasks.map(task => (
              <motion.div 
                key={task.id} 
                className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-red-50 transition-colors duration-200"
                variants={itemVariants}
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-800">
                  <FiCheckSquare size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FiClock size={14} className="mr-1" /> {task.time}
                  </p>
                </div>
                <motion.button 
                  className="px-3 py-1 bg-red-700 text-white text-sm rounded-md hover:bg-red-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Department Overview */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Department Overview</h3>
              <button className="text-red-700 text-sm font-medium flex items-center">
                View All <FiChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Department</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Faculty</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Students</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Attendance</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <motion.tr 
                      key={dept.id}
                      className="border-b border-gray-100 hover:bg-red-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (dept.id * 0.1) }}
                    >
                      <td className="py-3 px-3 text-sm">{dept.name}</td>
                      <td className="py-3 px-3 text-sm">{dept.facultyCount}</td>
                      <td className="py-3 px-3 text-sm">{dept.studentCount}</td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                dept.attendanceRate >= 90 ? 'bg-green-500' : 
                                dept.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${dept.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span>{dept.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm">
                        <motion.button 
                          className="text-red-700 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Campus alerts and notifications */}
        <motion.section 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Campus Alerts</h3>
            <button className="text-red-700 text-sm font-medium flex items-center">
              View All <FiChevronRight size={16} />
            </button>
          </div>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {alerts.map(alert => (
              <motion.div 
                key={alert.id} 
                className="p-3 border-l-4 border-red-600 bg-red-50 rounded-r-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <FiAlertTriangle size={16} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{alert.department}</h4>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activities</h3>
            <motion.div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-3 border-b border-gray-100"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.4)" }}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 mr-3">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Student Stress Analysis */}
      <motion.section 
        className="mt-6 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Campus Stress Analysis</h3>
          <button className="text-red-700 text-sm font-medium flex items-center">
            View Detailed Report <FiChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-red-50 p-4 rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <h4 className="font-medium text-gray-800 mb-2">Stress Level Summary</h4>
            <p className="text-gray-700 mb-3">
              {totalHighStressStudents} students across all departments are showing high stress levels based on activity patterns and submissions.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">High Stress</p>
                <p className="text-lg font-bold text-red-700">{totalHighStressStudents}</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">Medium Stress</p>
                <p className="text-lg font-bold text-yellow-600">
                  {stressAnalysisData.reduce((sum, dept) => sum + dept.mediumStress, 0)}
                </p>
              </div>
            </div>
            <motion.button 
              className="px-4 py-2 bg-red-700 text-white text-sm rounded-md hover:bg-red-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Student List
            </motion.button>
          </motion.div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Department Breakdown</h4>
            <div className="space-y-3">
              {stressAnalysisData.map((dept, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-3 border border-gray-100 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">{dept.department}</h5>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      {dept.highStress} High
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-red-600" 
                        style={{ width: `${(dept.highStress / (dept.highStress + dept.mediumStress + dept.lowStress)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(dept.mediumStress / (dept.highStress + dept.mediumStress + dept.lowStress)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(dept.lowStress / (dept.highStress + dept.mediumStress + dept.lowStress)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Student Location Tracking */}
      <motion.section 
        className="mt-6 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Student Location Tracking</h3>
          <button className="text-red-700 text-sm font-medium flex items-center">
            View Map <FiChevronRight size={16} />
          </button>
        </div>
        {/* <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FiMapPin size={32} className="mx-auto text-red-700 mb-2" />
            <p className="text-gray-700">Interactive campus map would be displayed here</p>
            <p className="text-sm text-gray-600">Showing real-time location of students across campus</p>
            <motion.button 
              className="mt-3 px-4 py-2 bg-red-700 text-white text-sm rounded-md hover:bg-red-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Full Map
            </motion.button>
          </div>
        </div> */}
      </motion.section>
    </div>
  );
};

export default PrincipalDashboard;