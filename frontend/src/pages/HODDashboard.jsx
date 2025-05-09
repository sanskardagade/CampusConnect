
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFileText, 
  FiMapPin, 
  FiActivity, 
  FiClock, 
  FiCalendar,
  FiCheckSquare, 
  FiChevronRight, 
  FiAlertTriangle,
  FiBook,
  FiMessageSquare,
  FiPenTool,
  FiTrendingUp,
  FiTrendingDown,
  FiTarget,
  FiArchive
} from 'react-icons/fi';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState({
    name: "Ms. Johnson",
    role: "Computer Science Teacher",
    department: "Computer Science",
    notificationCount: 5,
    pendingTasks: 4
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const classes = [
    { id: 1, name: "CS101 - Introduction to Programming", studentCount: 35, attendanceRate: 94, performanceRate: 82 },
    { id: 2, name: "CS204 - Data Structures", studentCount: 28, attendanceRate: 88, performanceRate: 76 },
    { id: 3, name: "CS310 - Database Systems", studentCount: 22, attendanceRate: 92, performanceRate: 79 },
    { id: 4, name: "CS405 - Machine Learning", studentCount: 18, attendanceRate: 96, performanceRate: 85 }
  ];

  const tasks = [
    { id: 1, title: "Grade CS101 assignments", time: "10:00 AM", completed: false },
    { id: 2, title: "Meeting with CS department head", time: "1:30 PM", completed: false },
    { id: 3, title: "Submit midterm grades", time: "3:00 PM", completed: false },
    { id: 4, title: "Prepare lesson plan for next week", time: "5:00 PM", completed: false }
  ];

  const quickActions = [
    { id: 1, title: "Take Attendance", icon: <FiUsers size={20} />, color: "bg-red-700" },
    { id: 2, title: "Grade Assignments", icon: <FiFileText size={20} />, color: "bg-red-800" },
    { id: 3, title: "Student Locator", icon: <FiMapPin size={20} />, color: "bg-red-900" },
    { id: 4, title: "Stress Analysis", icon: <FiActivity size={20} />, color: "bg-red-700" }
  ];

  const studentAlerts = [
    { id: 1, student: "Alex Johnson", issue: "Missed 3 consecutive classes", severity: "high" },
    { id: 2, student: "Maya Patel", issue: "High stress indicators detected", severity: "medium" },
    { id: 3, student: "Carlos Rodriguez", issue: "Assignment submission rate dropped", severity: "medium" }
  ];

  const stressAnalysisData = [
    { class: "CS101", highStress: 4, mediumStress: 15, lowStress: 16 },
    { class: "CS204", highStress: 6, mediumStress: 12, lowStress: 10 },
    { class: "CS310", highStress: 3, mediumStress: 8, lowStress: 11 },
    { class: "CS405", highStress: 2, mediumStress: 5, lowStress: 11 }
  ];

  const upcomingAssignments = [
    { id: 1, class: "CS101", title: "Programming Project #3", dueDate: "Apr 22, 2025", submissionRate: 65 },
    { id: 2, class: "CS204", title: "Algorithm Analysis", dueDate: "Apr 25, 2025", submissionRate: 45 },
    { id: 3, class: "CS310", title: "Database Design", dueDate: "Apr 27, 2025", submissionRate: 30 }
  ];

  const studentPerformanceData = [
    { name: "Alex Johnson", attendance: 85, assignments: 90, tests: 78, participation: 65 },
    { name: "Maya Patel", attendance: 92, assignments: 88, tests: 95, participation: 90 },
    { name: "Carlos Rodriguez", attendance: 75, assignments: 60, tests: 72, participation: 80 },
    { name: "Emma Wilson", attendance: 98, assignments: 95, tests: 92, participation: 85 },
    { name: "James Lee", attendance: 80, assignments: 75, tests: 82, participation: 70 }
  ];

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

  const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0);
  const averageAttendance = classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length;
  const averagePerformance = classes.reduce((sum, cls) => sum + cls.performanceRate, 0) / classes.length;
  const totalHighStressStudents = stressAnalysisData.reduce((sum, cls) => sum + cls.highStress, 0);

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
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, {teacher.name}</h2>
            <p className="text-gray-600">{currentDate}</p>
            <p className="text-gray-600">{teacher.role} | {teacher.department} Department</p>
          </div>
          <div className="mt-4 md:mt-0 bg-red-50 p-3 rounded-lg">
            <p className="text-red-800 font-medium flex items-center">
              <FiClock size={16} className="mr-2" />
              {pendingTasks()} pending tasks for today
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Teaching Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiUsers size={20} />
            </div>
            <p className="text-sm text-gray-600">Total Students</p>
            <h4 className="text-xl font-bold text-gray-800">{totalStudents}</h4>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiTarget size={20} />
            </div>
            <p className="text-sm text-gray-600">Avg. Performance</p>
            <h4 className="text-xl font-bold text-gray-800">{averagePerformance}%</h4>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-md p-4"
            variants={itemVariants}
          >
            <div className="bg-red-900 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiFileText size={20} />
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
        {/* Class Information Section */}
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

          {/* Class Overview */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Class Overview</h3>
              <button className="text-red-700 text-sm font-medium flex items-center">
                View All <FiChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Class</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Students</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Attendance</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Performance</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <motion.tr 
                      key={cls.id}
                      className="border-b border-gray-100 hover:bg-red-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (cls.id * 0.1) }}
                    >
                      <td className="py-3 px-3 text-sm">{cls.name}</td>
                      <td className="py-3 px-3 text-sm">{cls.studentCount}</td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                cls.attendanceRate >= 90 ? 'bg-green-500' : 
                                cls.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${cls.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span>{cls.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                cls.performanceRate >= 85 ? 'bg-green-500' : 
                                cls.performanceRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${cls.performanceRate}%` }}
                            ></div>
                          </div>
                          <span>{cls.performanceRate}%</span>
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

        {/* Student alerts and assignments */}
        <motion.section 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Student Alerts</h3>
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
            {studentAlerts.map(alert => (
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
                    <h4 className="font-medium text-gray-800">{alert.student}</h4>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Assignments</h3>
            <motion.div className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <motion.div 
                  key={assignment.id}
                  className="flex items-center p-3 border-b border-gray-100"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  whileHover={{ backgroundColor: "rgba(219, 234, 254, 0.4)" }}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-800 mr-3">
                    <FiBook size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {assignment.submissionRate}% submitted
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-600">{assignment.class} | Due: {assignment.dueDate}</p>
                      <motion.button 
                        className="text-red-700 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Review
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Student Performance Analysis */}
      <motion.section 
        className="mt-6 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Student Performance Analysis</h3>
          <button className="text-red-700 text-sm font-medium flex items-center">
            View Detailed Report <FiChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-red-50 p-4 rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <h4 className="font-medium text-gray-800 mb-2">Performance Overview</h4>
            <p className="text-gray-700 mb-3">
              {totalHighStressStudents} students are showing high stress levels which may be affecting their performance. Recommend early intervention.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">High Stress Students</p>
                <p className="text-lg font-bold text-red-700">{totalHighStressStudents}</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">Average Class Performance</p>
                <p className="text-lg font-bold text-red-700">{averagePerformance}%</p>
              </div>
            </div>
            <motion.button 
              className="px-4 py-2 bg-red-700 text-white text-sm rounded-md hover:bg-red-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Student Details
            </motion.button>
          </motion.div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Stress Level By Class</h4>
            <div className="space-y-3">
              {stressAnalysisData.map((cls, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-3 border border-gray-100 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">{cls.class}</h5>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      {cls.highStress} High
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-red-600" 
                        style={{ width: `${(cls.highStress / (cls.highStress + cls.mediumStress + cls.lowStress)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(cls.mediumStress / (cls.highStress + cls.mediumStress + cls.lowStress)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(cls.lowStress / (cls.highStress + cls.mediumStress + cls.lowStress)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Student Tracking Map */}
      <motion.section 
        className="mt-6 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Student Location Tracking</h3>
          <button className="text-red-700 text-sm font-medium flex items-center">
            View Full Map <FiChevronRight size={16} />
          </button>
        </div>
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FiMapPin size={32} className="mx-auto text-red-700 mb-2" />
            <p className="text-gray-700">Interactive campus map would be displayed here</p>
            <p className="text-sm text-gray-600">Showing real-time location of your students across campus</p>
            <motion.button 
              className="mt-3 px-4 py-2 bg-red-700 text-white text-sm rounded-md hover:bg-red-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Full Map
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>

     )
     }
export default TeacherDashboard;
       
            