import { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, BarChart3, List, ArrowLeft, ArrowRight, ChevronDown, Users, Calendar as CalendarIcon, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';
import { facultydata } from './data';

const DepartmentFacultyAttendance = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('all'); // 'all', 'week' or 'day'
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Sun - 2025-05-04"); // Today's date
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [roomStats, setRoomStats] = useState([]);
  const [facultyClassStats, setFacultyClassStats] = useState([]);
  const [expandedFaculty, setExpandedFaculty] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    total: 0
  });

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

  useEffect(() => {
    try {
      setFacultyData(facultydata);
      
      // Set default selections
      if (facultydata.length > 0) {
        setSelectedFaculty(facultydata[0]);
        setSelectedDate("Sun - 2025-05-04");
        setSelectedDay("Sun");
        calculateRoomStats(facultydata);
        calculateFacultyClassStats(facultydata);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load faculty data');
    }
  }, []);
  
  // Update attendance stats whenever date changes
  useEffect(() => {
    if (facultyData.length > 0) {
      calculateAttendanceStats();
    }
  }, [selectedDate, facultyData]);
  
  // Calculate overall attendance statistics for the selected date
  const calculateAttendanceStats = () => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let total = 0;
    
    facultyData.forEach(faculty => {
      const attendanceData = faculty.attendance?.[selectedDate] || {};
      Object.values(attendanceData).forEach(status => {
        total++;
        if (status === 'present') present++;
        else if (status === 'absent') absent++;
        else if (status === 'late') late++;
      });
    });
    
    setAttendanceStats({ present, absent, late, total });
  };
  
  // Calculate statistics for room usage
  const calculateRoomStats = (data) => {
    const roomCounts = {};
    
    // Count classes per room
    data.forEach(faculty => {
      Object.keys(faculty).forEach(key => {
        if (key.includes('202')) { // It's a date key
          const roomSchedule = faculty[key];
          if (roomSchedule) {
            Object.keys(roomSchedule).forEach(room => {
              if (!roomCounts[room]) {
                roomCounts[room] = 0;
              }
              roomCounts[room]++;
            });
          }
        }
      });
    });
    
    // Convert to array for Recharts
    const roomStatsArray = Object.keys(roomCounts).map(room => ({
      room: room,
      count: roomCounts[room]
    }));
    
    // Sort by room number
    const sortedStats = _.sortBy(roomStatsArray, 'room');
    setRoomStats(sortedStats);
  };

  // Calculate statistics for faculty class load
  const calculateFacultyClassStats = (data) => {
    const facultyCounts = {};
    
    // Count classes per faculty
    data.forEach(faculty => {
      const name = faculty.name;
      facultyCounts[name] = 0;
      
      Object.keys(faculty).forEach(key => {
        if (key.includes('202')) { // It's a date key
          const roomSchedule = faculty[key];
          if (roomSchedule) {
            facultyCounts[name] += Object.keys(roomSchedule).length;
          }
        }
      });
    });
    
    // Convert to array for Recharts
    const facultyStatsArray = Object.keys(facultyCounts).map(name => ({
      name: name,
      value: facultyCounts[name]
    }));
    
    // Sort by number of classes (descending)
    const sortedStats = _.orderBy(facultyStatsArray, ['value'], ['desc']);
    setFacultyClassStats(sortedStats);
  };
  
  const handleFacultyChange = (event) => {
    const faculty = facultyData.find(f => f.ERPId === event.target.value);
    setSelectedFaculty(faculty);
  };
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedDay(event.target.value.split(' - ')[0]);
  };
  
  const navigateDate = (direction) => {
    if (!selectedDate) return;
    
    const dateKeys = getDateKeys();
    const currentIndex = dateKeys.indexOf(selectedDate);
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDate(dateKeys[currentIndex - 1]);
      setSelectedDay(dateKeys[currentIndex - 1].split(' - ')[0]);
    } else if (direction === 'next' && currentIndex < dateKeys.length - 1) {
      setSelectedDate(dateKeys[currentIndex + 1]);
      setSelectedDay(dateKeys[currentIndex + 1].split(' - ')[0]);
    }
  };
  
  const getDateKeys = () => {
    if (!facultyData.length) return [];
    
    return Object.keys(facultyData[0]).filter(key => key.includes('202'));
  };
  
  const formatTimeRange = (timeRange) => {
    if (!timeRange) return '';
    return timeRange;
  };
  
  // Prepare data for weekly view chart
  const prepareWeeklyData = () => {
    if (!selectedFaculty) return [];
    
    return getDateKeys().map(dateKey => {
      const dayData = selectedFaculty[dateKey] || {};
      const classCount = Object.keys(dayData).length;
      
      return {
        day: dateKey.split(' - ')[0],
        classes: classCount
      };
    });
  };
  
  // Get class schedule for selected day
  const getDaySchedule = () => {
    if (!selectedFaculty || !selectedDate) return [];
    
    const daySchedule = selectedFaculty[selectedDate] || {};
    
    return Object.keys(daySchedule).map(room => ({
      room,
      time: formatTimeRange(daySchedule[room])
    })).sort((a, b) => {
      // Sort by start time
      const timeA = a.time.split(' - ')[0];
      const timeB = b.time.split(' - ')[0];
      return timeA.localeCompare(timeB);
    });
  };

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`Classes: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-600">{`${(payload[0].percent * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const calculateAttendancePercentage = (faculty) => {
    // Get attendance data for the selected date
    const attendanceData = faculty.attendance?.[selectedDate] || {};
    const totalClasses = Object.keys(attendanceData).length;
    if (totalClasses === 0) return 0;
    
    const presentClasses = Object.values(attendanceData).filter(status => status === 'present').length;
    return Math.round((presentClasses / totalClasses) * 100);
  };
  
  // Prepare data for attendance distribution chart
  const prepareAttendanceDistributionData = () => {
    if (attendanceStats.total === 0) return [];
    
    return [
      { name: 'Present', value: attendanceStats.present },
      { name: 'Absent', value: attendanceStats.absent },
      { name: 'Late', value: attendanceStats.late }
    ].filter(item => item.value > 0);
  };

  const toggleFacultyDetails = (facultyId) => {
    setExpandedFaculty(expandedFaculty === facultyId ? null : facultyId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading faculty attendance data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  // Get today's schedule for all faculty
  const getAllFacultyTodaySchedule = () => {
    if (!facultyData.length) return [];
    
    return facultyData.map(faculty => {
      const todaySchedule = faculty[selectedDate] || {};
      const classes = Object.keys(todaySchedule).map(room => ({
        room,
        time: formatTimeRange(todaySchedule[room])
      })).sort((a, b) => {
        // Sort by start time
        const timeA = a.time.split(' - ')[0];
        const timeB = b.time.split(' - ')[0];
        return timeA.localeCompare(timeB);
      });
      
      return {
        faculty,
        classes
      };
    });
  };

  // Calculate faculty workload for today
  const getTodayFacultyWorkload = () => {
    const todayWorkload = [];
    
    facultyData.forEach(faculty => {
      const todaySchedule = faculty[selectedDate] || {};
      const classCount = Object.keys(todaySchedule).length;
      
      if (classCount > 0) {
        todayWorkload.push({
          name: faculty.name,
          value: classCount
        });
      }
    });
    
    return _.orderBy(todayWorkload, ['value'], ['desc']);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2" size={24} />
          Faculty Attendance for {selectedDate}
        </h1>
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg flex items-center ${selectedView === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedView('all')}
          >
            <Users className="mr-2" size={18} />
            All Faculty
          </button>
          <button 
            className={`px-4 py-2 rounded-lg flex items-center ${selectedView === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedView('week')}
          >
            <BarChart3 className="mr-2" size={18} />
            Weekly View
          </button>
          <button 
            className={`px-4 py-2 rounded-lg flex items-center ${selectedView === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedView('day')}
          >
            <List className="mr-2" size={18} />
            Daily View
          </button>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Select Faculty</label>
          <div className="relative">
            <select 
              className="w-full p-2 border rounded-lg pr-10 appearance-none"
              value={selectedFaculty?.ERPId || ''}
              onChange={handleFacultyChange}
              disabled={selectedView === 'all'}
            >
              {facultyData.map(faculty => (
                <option key={faculty.ERPId} value={faculty.ERPId}>
                  {faculty.facultyName} ({faculty.name}) - {faculty.ERPId}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500" size={16} />
          </div>
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Select Date</label>
          <div className="flex items-center">
            <button 
              className="p-2 border rounded-l-lg hover:bg-gray-100" 
              onClick={() => navigateDate('prev')}
            >
              <ArrowLeft size={16} />
            </button>
            <div className="relative flex-grow">
              <select 
                className="w-full p-2 border-y appearance-none"
                value={selectedDate || ''}
                onChange={handleDateChange}
              >
                {getDateKeys().map(dateKey => (
                  <option key={dateKey} value={dateKey}>{dateKey}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-500" size={16} />
            </div>
            <button 
              className="p-2 border rounded-r-lg hover:bg-gray-100" 
              onClick={() => navigateDate('next')}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Attendance Summary Cards for the selected date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Classes</h3>
          <p className="text-2xl font-bold">{attendanceStats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow text-center">
          <h3 className="text-green-600 text-sm font-medium mb-1">Present</h3>
          <p className="text-2xl font-bold text-green-700">
            {attendanceStats.present}
            <span className="text-sm ml-1 font-normal">
              ({attendanceStats.total ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0}%)
            </span>
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow text-center">
          <h3 className="text-red-600 text-sm font-medium mb-1">Absent</h3>
          <p className="text-2xl font-bold text-red-700">
            {attendanceStats.absent}
            <span className="text-sm ml-1 font-normal">
              ({attendanceStats.total ? Math.round((attendanceStats.absent / attendanceStats.total) * 100) : 0}%)
            </span>
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
          <h3 className="text-yellow-600 text-sm font-medium mb-1">Late</h3>
          <p className="text-2xl font-bold text-yellow-700">
            {attendanceStats.late}
            <span className="text-sm ml-1 font-normal">
              ({attendanceStats.total ? Math.round((attendanceStats.late / attendanceStats.total) * 100) : 0}%)
            </span>
          </p>
        </div>
      </div>
      
      {selectedView !== 'all' && selectedFaculty && (
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <User className="mr-2 text-blue-600" size={20} />
            <h2 className="text-lg font-semibold">{selectedFaculty.facultyName}</h2>
          </div>
          <div className="text-sm text-gray-600">
            <p>ERP ID: {selectedFaculty.ERPId}</p>
            <p>Short Name: {selectedFaculty.name}</p>
            <p className="mt-2 font-medium">
              Attendance Rate: 
              <span className={`ml-2 px-2 py-1 rounded-full ${
                calculateAttendancePercentage(selectedFaculty) >= 75 ? 'bg-green-100 text-green-800' :
                calculateAttendancePercentage(selectedFaculty) >= 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {calculateAttendancePercentage(selectedFaculty)}%
              </span>
            </p>
          </div>
        </div>
      )}
      
      {selectedView === 'all' && (
        <div className="p-4 bg-white rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="mr-2 text-blue-600" size={20} />
            All Faculty Attendance for {selectedDate}
          </h2>
          
          <div className="space-y-4">
            {facultyData.map((faculty) => {
              const attendancePercentage = calculateAttendancePercentage(faculty);
              const isExpanded = expandedFaculty === faculty.ERPId;
              const attendanceData = faculty.attendance?.[selectedDate] || {};
              const hasClasses = Object.keys(attendanceData).length > 0;
              
              if (!hasClasses) return null; // Skip faculty with no classes on selected date
              
              return (
                <div key={faculty.ERPId} className="bg-white rounded-lg shadow p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleFacultyDetails(faculty.ERPId)}
                  >
                    <div className="flex items-center">
                      <User className="mr-2 text-blue-600" size={20} />
                      <div>
                        <h3 className="font-semibold">{faculty.facultyName}</h3>
                        <p className="text-sm text-gray-600">ERP ID: {faculty.ERPId}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`px-3 py-1 rounded-full ${
                        attendancePercentage >= 75 ? 'bg-green-100 text-green-800' :
                        attendancePercentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {attendancePercentage}%
                      </div>
                      <ChevronDown 
                        className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                        size={20} 
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Attendance Details</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left">Time</th>
                              <th className="px-4 py-2 text-left">Room</th>
                              <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(attendanceData).length > 0 ? (
                              Object.entries(attendanceData).map(([timeSlot, status]) => {
                                // Find the room for this time slot
                                const roomData = faculty[selectedDate] || {};
                                const room = Object.keys(roomData).find(r => roomData[r] === timeSlot) || 'N/A';
                                
                                return (
                                  <tr key={timeSlot} className="border-t">
                                    <td className="px-4 py-2">{timeSlot}</td>
                                    <td className="px-4 py-2">{room}</td>
                                    <td className="px-4 py-2">
                                      <span className={`px-2 py-1 rounded-full ${
                                        status === 'present' ? 'bg-green-100 text-green-800' :
                                        status === 'absent' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {status}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="3" className="px-4 py-2 text-center text-gray-500 italic">
                                  No attendance data for this date.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      )}
      
      {selectedView === 'week' && selectedFaculty && (
        <div className="p-4 bg-white rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-blue-600" size={20} />
            Weekly Classes Overview for {selectedFaculty.name} (ERP: {selectedFaculty.ERPId})
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareWeeklyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="classes" fill="#3b82f6" name="Number of Classes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {selectedView === 'day' && selectedFaculty && (
        <div className="p-4 bg-white rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="mr-2 text-blue-600" size={20} />
            Schedule for {selectedFaculty.name} (ERP: {selectedFaculty.ERPId}) on {selectedDay}
          </h2>
          
          {getDaySchedule().length > 0 ? (
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Room</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getDaySchedule().map((item, index) => {
                    // Get attendance status for this class
                    const attendance = selectedFaculty.attendance?.[selectedDate]?.[item.time] || 'Not marked';
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 border-t">Room {item.room}</td>
                        <td className="px-4 py-3 border-t">{item.time}</td>
                        <td className="px-4 py-3 border-t">
                          <span className={`px-2 py-1 rounded-full ${
                            attendance === 'present' ? 'bg-green-100 text-green-800' :
                            attendance === 'absent' ? 'bg-red-100 text-red-800' :
                            attendance === 'late' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {attendance}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No classes scheduled for this day.</p>
          )}
        </div>
      )}
      
      {selectedView !== 'all' ? (
        <>
          <div className="p-4 bg-white rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="mr-2 text-blue-600" size={20} />
              Room Usage Statistics
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="room" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" name="Total Classes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <PieChartIcon className="mr-2 text-blue-600" size={20} />
              Faculty Class Load Distribution
            </h2>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={facultyClassStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {facultyClassStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-4 bg-white rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CalendarIcon className="mr-2 text-blue-600" size={20} />
              Attendance Distribution for {selectedDate}
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareAttendanceDistributionData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    <Cell key="present" fill="#10b981" />
                    <Cell key="absent" fill="#ef4444" />
                    <Cell key="late" fill="#f59e0b" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <PieChartIcon className="mr-2 text-blue-600" size={20} />
              Faculty Workload Distribution for {selectedDate}
            </h2>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getTodayFacultyWorkload()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {getTodayFacultyWorkload().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentFacultyAttendance;