import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  Calendar, User, Book, Activity, ChevronDown, ChevronUp, AlertCircle,
  Clock, BarChart3, Target
} from 'lucide-react';
// Import student data from the JSON file
import studentData from "../Data/data.json";

const AttendanceView = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  
  useEffect(() => {
    // Set the student data from the imported JSON
    if (studentData && studentData.length > 0) {
      setStudent(studentData[0]);
    }
    setLoading(false);
  }, []);

  if (loading || !student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const prepareSubjectData = () => {
    return student.attendance.subjects.map(subject => {
      return {
        name: subject.code,
        fullName: subject.name,
        theory: subject.theory ? subject.theory.percentage : 0,
        practical: subject.practical ? subject.practical.percentage : 0,
        faculty: subject.faculty
      };
    });
  };

  const prepareMonthlyData = () => {
    return student.attendance.monthly.map(month => {
      return {
        name: month.month,
        theory: month.summary.totalTheoryPercentage,
        practical: month.summary.totalPracticalPercentage,
        average: month.summary.averageAttendance
      };
    });
  };

  // Status function
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { status: "Good", color: "#4CAF50" };
    if (percentage >= 60) return { status: "Average", color: "#FF9800" };
    return { status: "Poor", color: "#F44336" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="bg-white shadow">
        <div className="container mx-auto flex">
          <button 
            className={`py-3 px-4 ${activeView === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveView('dashboard')}
          >
            <div className="flex items-center">
              <BarChart3 size={16} className="mr-1" />
              <span>Dashboard</span>
            </div>
          </button>
          <button 
            className={`py-3 px-4 ${activeView === 'subjects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveView('subjects')}
          >
            <div className="flex items-center">
              <Book size={16} className="mr-1" />
              <span>Subjects</span>
            </div>
          </button>
          <button 
            className={`py-3 px-4 ${activeView === 'monthly' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveView('monthly')}
          >
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Monthly</span>
            </div>
          </button>
          <button 
            className={`py-3 px-4 ${activeView === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveView('recommendations')}
          >
            <div className="flex items-center">
              <Target size={16} className="mr-1" />
              <span>Recommendations</span>
            </div>
          </button>
        </div>
      </nav>
      
      <main className="container mx-auto py-6 px-4">
        <DashboardHeader student={student} />
        
        {activeView === 'dashboard' && (
          <>
            <AttendanceSummary student={student} getAttendanceStatus={getAttendanceStatus} />
            <Charts 
              student={student} 
              prepareSubjectData={prepareSubjectData} 
              prepareMonthlyData={prepareMonthlyData} 
            />
            
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-yellow-500 mr-2" size={20} />
                <h3 className="font-bold text-black">Important Notice</h3>
              </div>
              <p className="text-sm text-gray-600">
                Students with attendance below 75% may not be eligible to appear for examinations.
                Please ensure to maintain regular attendance in all subjects.
              </p>
            </div>
          </>
        )}
        
        {activeView === 'subjects' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-black">Subject-wise Attendance</h2>
            {student.attendance.subjects.map((subject, index) => (
              <SubjectCard key={index} subject={subject} getAttendanceStatus={getAttendanceStatus} />
            ))}
          </div>
        )}
        
        {activeView === 'monthly' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-black">Monthly Attendance</h2>
            {student.attendance.monthly.map((month, index) => (
              <MonthlyAttendance key={index} monthlyData={month} getAttendanceStatus={getAttendanceStatus} />
            ))}
          </div>
        )}

        {activeView === 'recommendations' && (
          <AttendanceRecommendations student={student} />
        )}
      </main>
    </div>
  );
};

// Component definitions
const DashboardHeader = ({ student }) => {
  const overallStatus = getAttendanceStatus(student.attendance.summary.averageAttendance);
  
  function getAttendanceStatus(percentage) {
    if (percentage >= 75) return { status: "Good", color: "#4CAF50" };
    if (percentage >= 60) return { status: "Average", color: "#FF9800" };
    return { status: "Poor", color: "#F44336" };
  }
  
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{student.studentInfo.name}</h1>
          <p className="text-gray-600">Roll No: {student.studentInfo.rollNumber}</p>
          <p className="text-gray-600">{student.studentInfo.class} | {student.studentInfo.academicYear} SEM-{student.studentInfo.semester}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold" style={{ color: overallStatus.color }}>
            {student.attendance.summary.averageAttendance.toFixed(2)}%
          </p>
          <p className="text-gray-600">Overall Attendance</p>
          <p className="text-sm text-gray-500">{student.studentInfo.reportPeriod}</p>
        </div>
      </div>
    </div>
  );
};

const AttendanceSummary = ({ student, getAttendanceStatus }) => {
  const theoryStatus = getAttendanceStatus(student.attendance.summary.totalTheoryPercentage);
  const practicalStatus = getAttendanceStatus(student.attendance.summary.totalPracticalPercentage);
  const overallStatus = getAttendanceStatus(student.attendance.summary.averageAttendance);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Book className="text-blue-600 mr-2" size={20} />
          <h3 className="font-bold text-black">Theory Attendance</h3>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall</span>
              <span className="text-sm font-medium" style={{ color: theoryStatus.color }}>
                {student.attendance.summary.totalTheoryPercentage.toFixed(2)}% - {theoryStatus.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full" style={{ width: `${student.attendance.summary.totalTheoryPercentage}%`, backgroundColor: theoryStatus.color }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Activity className="text-green-600 mr-2" size={20} />
          <h3 className="font-bold text-black">Practical Attendance</h3>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall</span>
              <span className="text-sm font-medium" style={{ color: practicalStatus.color }}>
                {student.attendance.summary.totalPracticalPercentage.toFixed(2)}% - {practicalStatus.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full" style={{ width: `${student.attendance.summary.totalPracticalPercentage}%`, backgroundColor: practicalStatus.color }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <AlertCircle className="text-purple-600 mr-2" size={20} />
          <h3 className="font-bold text-black">Status</h3>
        </div>
        <div className="flex justify-center items-center h-16">
          <div className="text-center">
            <p className="text-xl font-bold" style={{ color: overallStatus.color }}>
              {overallStatus.status}
            </p>
            <p className="text-sm text-gray-600">
              {student.attendance.summary.averageAttendance.toFixed(2)}% Average
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Charts = ({ student, prepareSubjectData, prepareMonthlyData }) => {
  const [activeTab, setActiveTab] = useState('subjects');
  const subjectData = prepareSubjectData();
  const monthlyData = prepareMonthlyData();
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex border-b mb-4">
        <button 
          className={`py-2 px-4 ${activeTab === 'subjects' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('subjects')}
        >
          <div className="flex items-center">
            <Book size={16} className="mr-1" />
            <span>Subjects</span>
          </div>
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'monthly' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('monthly')}
        >
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>Monthly</span>
          </div>
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'distribution' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('distribution')}
        >
          <div className="flex items-center">
            <Activity size={16} className="mr-1" />
            <span>Distribution</span>
          </div>
        </button>
      </div>
      
      <div className="h-64">
        {activeTab === 'subjects' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                labelFormatter={(label) => {
                  const subject = subjectData.find(s => s.name === label);
                  return `${subject.fullName} (${subject.name})`;
                }}
              />
              <Legend />
              <Bar dataKey="theory" name="Theory" fill="#8884d8" />
              <Bar dataKey="practical" name="Practical" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'monthly' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Line type="monotone" dataKey="theory" name="Theory" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="practical" name="Practical" stroke="#82ca9d" />
              <Line type="monotone" dataKey="average" name="Average" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'distribution' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Theory', value: student.attendance.summary.totalTheoryPercentage },
                  { name: 'Practical', value: student.attendance.summary.totalPracticalPercentage }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
              >
                {[
                  { name: 'Theory', value: student.attendance.summary.totalTheoryPercentage },
                  { name: 'Practical', value: student.attendance.summary.totalPracticalPercentage }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

const SubjectCard = ({ subject, getAttendanceStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const theoryStatus = subject.theory ? getAttendanceStatus(subject.theory.percentage) : null;
  const practicalStatus = subject.practical ? getAttendanceStatus(subject.practical.percentage) : null;
  
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <Book className="mr-2 text-blue-600" size={20} />
          <div>
            <h3 className="font-bold text-black">{subject.code}</h3>
            <p className="text-sm text-gray-500">{subject.name}</p>
          </div>
        </div>
        <button className="text-gray-500">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Faculty: {subject.faculty}</p>
          
          {subject.theory && (
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Theory</span>
                <span className="text-sm font-medium" style={{ color: theoryStatus.color }}>
                  {subject.theory.percentage.toFixed(2)}% - {theoryStatus.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: `${subject.theory.percentage}%`, backgroundColor: theoryStatus.color }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Attended: {subject.theory.attended}/{subject.theory.total} lectures
              </div>
            </div>
          )}
          
          {subject.practical && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Practical</span>
                <span className="text-sm font-medium" style={{ color: practicalStatus.color }}>
                  {subject.practical.percentage.toFixed(2)}% - {practicalStatus.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: `${subject.practical.percentage}%`, backgroundColor: practicalStatus.color }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Attended: {subject.practical.attended}/{subject.practical.total} sessions
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MonthlyAttendance = ({ monthlyData, getAttendanceStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const month = monthlyData;
  const monthStatus = getAttendanceStatus(month.summary.averageAttendance);
  
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <Calendar className="mr-2 text-purple-600" size={20} />
          <h3 className="font-bold text-black">{month.month}</h3>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2" style={{ color: monthStatus.color }}>
            {month.summary.averageAttendance.toFixed(2)}%
          </span>
          <button className="text-gray-500">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">{month.period}</p>
          <div className="flex justify-between mb-3">
            <div className="w-1/2 pr-2">
              <p className="text-sm font-medium">Theory: {month.summary.totalTheoryPercentage.toFixed(2)}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${month.summary.totalTheoryPercentage}%` }}></div>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <p className="text-sm font-medium">Practical: {month.summary.totalPracticalPercentage.toFixed(2)}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="h-2.5 rounded-full bg-green-600" style={{ width: `${month.summary.totalPracticalPercentage}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-bold mb-2">Subject Details</h4>
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Subject</th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Theory</th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Practical</th>
                  </tr>
                </thead>
                <tbody>
                  {month.subjects.map((subject, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-2 py-2 text-sm">{subject.code}</td>
                      <td className="px-2 py-2 text-sm">
                        {subject.theory ? (
                          <span>{subject.theory.percentage.toFixed(2)}% ({subject.theory.attended}/{subject.theory.total})</span>
                        ) : "-"}
                      </td>
                      <td className="px-2 py-2 text-sm">
                        {subject.practical ? (
                          <span>{subject.practical.percentage.toFixed(2)}% ({subject.practical.attended}/{subject.practical.total})</span>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// New component for attendance recommendations
const AttendanceRecommendations = ({ student }) => {
  // Calculate how many more classes needed to reach 75% for each subject
  const calculateClassesNeeded = (subject) => {
    const recommendations = [];
    
    if (subject.theory) {
      const theoryPercentage = subject.theory.percentage;
      const theoryAttended = subject.theory.attended;
      const theoryTotal = subject.theory.total;
      
      if (theoryPercentage < 75) {
        // Formula to calculate how many consecutive classes needed to reach 75%
        // (0.75 * (total + x) - attended) / x = 1 => Solve for x
        let classesNeeded = Math.ceil((0.75 * theoryTotal - theoryAttended) / 0.25);
        if (classesNeeded < 0) classesNeeded = 0;
        
        recommendations.push({
          type: 'Theory',
          classesNeeded,
          currentPercentage: theoryPercentage,
          attended: theoryAttended,
          total: theoryTotal
        });
      }
    }
    
    if (subject.practical) {
      const practicalPercentage = subject.practical.percentage;
      const practicalAttended = subject.practical.attended;
      const practicalTotal = subject.practical.total;
      
      if (practicalPercentage < 75) {
        let classesNeeded = Math.ceil((0.75 * practicalTotal - practicalAttended) / 0.25);
        if (classesNeeded < 0) classesNeeded = 0;
        
        recommendations.push({
          type: 'Practical',
          classesNeeded,
          currentPercentage: practicalPercentage,
          attended: practicalAttended,
          total: practicalTotal
        });
      }
    }
    
    return recommendations;
  };
  
  // Get subjects with attendance below 75%
  const getSubjectsToFocus = () => {
    return student.attendance.subjects
      .map(subject => {
        const recommendations = calculateClassesNeeded(subject);
        return {
          code: subject.code,
          name: subject.name,
          recommendations,
          priority: recommendations.reduce((acc, rec) => acc + rec.classesNeeded, 0)
        };
      })
      .filter(subject => subject.recommendations.length > 0)
      .sort((a, b) => b.priority - a.priority); // Sort by highest priority (most classes needed)
  };
  
  const subjectsToFocus = getSubjectsToFocus();
  const overallAttendance = student.attendance.summary.averageAttendance;
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Attendance Recommendations</h2>
      
      {subjectsToFocus.length === 0 && overallAttendance >= 75 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="text-green-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-medium text-green-500">Great job! All your subjects have attendance above 75%.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="text-yellow-500 mr-2" size={20} />
              <h3 className="font-bold text-black">Focus Areas</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your overall attendance is {overallAttendance.toFixed(2)}%. To maintain at least 75% attendance,
              please focus on attending the following classes regularly.
              {subjectsToFocus.length > 0 ? 
                " The subjects are listed in order of priority, with those requiring the most attention at the top." : 
                " You need to improve your attendance in all subjects to reach the 75% threshold."}
            </p>
          </div>
          
          {/* If there are no specific subjects below 75% but overall attendance is below 75% */}
          {subjectsToFocus.length === 0 && overallAttendance < 75 && (
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Target className="text-red-600 mr-2" size={20} />
                  <div>
                    <h3 className="font-bold text-black">Overall Attendance</h3>
                    <p className="text-sm text-gray-600">All Subjects</p>
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Attention Needed
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm">
                  <span>Current: {overallAttendance.toFixed(2)}%</span>
                  <span>Target: 75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${overallAttendance < 60 ? 'bg-red-500' : 'bg-yellow-500'}`}
                    style={{ width: `${overallAttendance}%` }}
                  ></div>
                  <div className="relative">
                    <div className="absolute top-0 h-4 border-l border-dashed border-green-700" style={{ left: '75%', marginTop: '-8px' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Attend all remaining classes to improve your overall attendance
              </div>
            </div>
          )}
          
          {subjectsToFocus.map((subject, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Target className="text-red-600 mr-2" size={20} />
                  <div>
                    <h3 className="font-bold text-black">{subject.code}</h3>
                    <p className="text-sm text-gray-600">{subject.name}</p>
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  High Priority
                </div>
              </div>
              
              <div className="space-y-4">
                {subject.recommendations.map((rec, recIndex) => (
                  <div key={recIndex} className="border-t pt-3">
                    <div className="flex items-center mb-2">
                      {rec.type === 'Theory' ? (
                        <Book className="text-blue-600 mr-2" size={16} />
                      ) : (
                        <Activity className="text-green-600 mr-2" size={16} />
                      )}
                      <span className="font-medium">{rec.type}</span>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {rec.currentPercentage.toFixed(2)}%</span>
                        <span>Target: 75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${rec.currentPercentage < 60 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                          style={{ width: `${rec.currentPercentage}%` }}
                        ></div>
                        <div className="relative">
                          <div className="absolute top-0 h-4 border-l border-dashed border-green-700" style={{ left: '75%', marginTop: '-8px' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-700">
                          Currently attended <span className="font-medium">{rec.attended}</span> out of <span className="font-medium">{rec.total}</span> classes
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        Need to attend next <span className="font-bold">{rec.classesNeeded}</span> {rec.type.toLowerCase()} classes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="font-bold text-black mb-3">Attendance Improvement Strategy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-xs font-semibold text-white bg-blue-600 rounded-full">1</span>
                <span>Focus on high priority subjects first to maximize your overall attendance.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-xs font-semibold text-white bg-blue-600 rounded-full">2</span>
                <span>Don't miss any more classes for subjects with low attendance percentages.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-xs font-semibold text-white bg-blue-600 rounded-full">3</span>
                <span>Maintain your attendance in subjects that are already above 75%.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-xs font-semibold text-white bg-blue-600 rounded-full">4</span>
                <span>Consider requesting makeup classes or assignments for subjects with very low attendance.</span>
              </li>
            </ul>
          </div>
        </>
      )}
      
      {/* Attendance Projection Calculator */}
      <AttendanceProjectionCalculator student={student} />
    </div>
  );
};

// New component for calculating attendance projections
const AttendanceProjectionCalculator = ({ student }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendNext, setAttendNext] = useState(5);
  const [projectedAttendance, setProjectedAttendance] = useState(null);
  const [lectureType, setLectureType] = useState('theory');
  
  const calculateProjection = () => {
    if (!selectedSubject) return;
    
    const subject = student.attendance.subjects.find(s => s.code === selectedSubject);
    if (!subject) return;
    
    let currentAttended, currentTotal, currentPercentage;
    
    if (lectureType === 'theory' && subject.theory) {
      currentAttended = subject.theory.attended;
      currentTotal = subject.theory.total;
      currentPercentage = subject.theory.percentage;
    } else if (lectureType === 'practical' && subject.practical) {
      currentAttended = subject.practical.attended;
      currentTotal = subject.practical.total;
      currentPercentage = subject.practical.percentage;
    } else {
      return;
    }
    
    // Calculate new attendance percentage if student attends next X classes
    const newAttended = currentAttended + attendNext;
    const newTotal = currentTotal + attendNext;
    const newPercentage = (newAttended / newTotal) * 100;
    
    // Calculate how many more classes needed to reach 75% after these X classes
    let remainingToTarget = 0;
    if (newPercentage < 75) {
      remainingToTarget = Math.ceil((0.75 * (newTotal) - newAttended) / 0.25);
    }
    
    setProjectedAttendance({
      subject: subject.code,
      subjectName: subject.name,
      type: lectureType === 'theory' ? 'Theory' : 'Practical',
      currentPercentage,
      newPercentage,
      target75Achieved: newPercentage >= 75,
      remainingToTarget: remainingToTarget > 0 ? remainingToTarget : 0,
      currentAttended,
      currentTotal,
      newAttended,
      newTotal
    });
  };
  
  const getStatusColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="font-bold text-black mb-4">Attendance Projection Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Select Subject</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="" className="text-black" selected>Choose a subject</option>
            {student.attendance.subjects.map((subject) => (
              <option className="text-black" key={subject.code} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Type</label>
          <div className="flex">
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium ${lectureType === 'theory' ? 'bg-blue-100 text-blue-700 border border-blue-500' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}
              onClick={() => setLectureType('theory')}
            >
              Theory
            </button>
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium ${lectureType === 'practical' ? 'bg-green-100 text-green-700 border border-green-500' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}
              onClick={() => setLectureType('practical')}
            >
              Practical
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            If I attend next <span className="font-bold">{attendNext}</span> classes
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={attendNext}
            onChange={(e) => setAttendNext(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>
        
        <div className="flex items-end">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            onClick={calculateProjection}
          >
            Calculate Projection
          </button>
        </div>
      </div>
      
      {projectedAttendance && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium text-gray-800 mb-3">Projection Results for {projectedAttendance.subjectName} ({projectedAttendance.type})</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600 mb-1">Current Attendance</p>
              <p className={`text-lg font-bold ${getStatusColor(projectedAttendance.currentPercentage)}`}>
                {projectedAttendance.currentPercentage.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">
                {projectedAttendance.currentAttended} / {projectedAttendance.currentTotal} classes
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600 mb-1">Projected Attendance</p>
              <p className={`text-lg font-bold ${getStatusColor(projectedAttendance.newPercentage)}`}>
                {projectedAttendance.newPercentage.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500">
                {projectedAttendance.newAttended} / {projectedAttendance.newTotal} classes
              </p>
            </div>
          </div>
          
          <div className="mt-3 p-3 rounded bg-green-500">
            {projectedAttendance.target75Achieved ? (
              <div className="flex items-center">
                <div className="text-green-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Great!</span> After attending the next {attendNext} classes, your attendance will be above 75%.
                </p>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-sm">
                  <span className="font-mediumm bg-green-200 text-green-500">Not enough.</span> After attending the next {attendNext} classes, you will need to attend {projectedAttendance.remainingToTarget} more consecutive classes to reach 75%.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceView;