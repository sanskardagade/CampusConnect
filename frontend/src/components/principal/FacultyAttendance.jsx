import { useState, useEffect } from 'react';
import { 
  Users, Calendar, Clock, Activity, Search, RefreshCw, 
  Check, X, AlertTriangle, Shield, Cpu, Globe, 
  Maximize, Minimize, PieChart, BarChart as BarChartIcon,
  Zap, UserCheck, Filter, Download, Eye, EyeOff
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, LineChart, Line
} from 'recharts';

export default function AttendanceTracker({ initialData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [ipLogs, setIpLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [activeChartType, setActiveChartType] = useState('bar');
  const [showDetails, setShowDetails] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedView, setExpandedView] = useState(false);
  
  // COLORS for charts
  const COLORS = ['#4f46e5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Fetch or initialize data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setData(initialData);
      generateSummaryData(initialData);
      setLoading(false);
    } else {
      setLoading(true);
      fetch("http://localhost:5000/api/hod/divisions")
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
          generateSummaryData(data);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch data from server');
          setLoading(false);
        });
    }
  }, [initialData]);

  // Generate summary data from complete dataset
  const generateSummaryData = (data) => {
    if (!data) return;
    
    const summary = {
      totalUsers: Object.keys(data).length,
      totalIPs: new Set(),
      totalDates: new Set(),
      totalLogs: 0,
      mostActiveUser: { name: '', count: 0 },
      mostActiveIP: { ip: '', count: 0 },
      earliestTime: '23:59:59',
      latestTime: '00:00:00',
      userActivity: []
    };
    
    // Process all data to generate summary
    Object.entries(data).forEach(([user, ips]) => {
      let userLogCount = 0;
      
      Object.entries(ips).forEach(([ip, dates]) => {
        summary.totalIPs.add(ip);
        
        Object.entries(dates).forEach(([date, logs]) => {
          summary.totalDates.add(date);
          const logCount = Object.keys(logs).length;
          summary.totalLogs += logCount;
          userLogCount += logCount;
          
          // Update IP count
          const ipFormatted = ip.replace(/_/g, '.');
          const currentIPCount = summary.mostActiveIP.count;
          if (logCount > currentIPCount) {
            summary.mostActiveIP = { ip: ipFormatted, count: logCount };
          }
          
          // Check time ranges
          Object.values(logs).forEach(log => {
            if (log.time < summary.earliestTime) {
              summary.earliestTime = log.time;
            }
            if (log.time > summary.latestTime) {
              summary.latestTime = log.time;
            }
          });
        });
      });
      
      // Update most active user
      if (userLogCount > summary.mostActiveUser.count) {
        summary.mostActiveUser = { name: user, count: userLogCount };
      }
      
      // Add to user activity array for chart
      summary.userActivity.push({
        name: formatUserName(user),
        logins: userLogCount
      });
    });
    
    // Sort user activity by login count (descending)
    summary.userActivity.sort((a, b) => b.logins - a.logins);
    
    // Convert sets to counts
    summary.totalIPs = summary.totalIPs.size;
    summary.totalDates = summary.totalDates.size;
    
    // Format most active user name
    summary.mostActiveUser.name = formatUserName(summary.mostActiveUser.name);
    
    setSummaryData(summary);
  };

  // Get unique users for dropdown
  const users = data ? Object.keys(data).sort() : [];

  // Get dates available for selected user
  const getDatesForUser = (user) => {
    if (!user || !data || !data[user]) return [];
    
    // Collect all unique dates across all IPs for this user
    const allDates = new Set();
    Object.keys(data[user]).forEach(ip => {
      Object.keys(data[user][ip]).forEach(date => {
        allDates.add(date);
      });
    });
    
    return Array.from(allDates).sort();
  };

  // Handle user selection
  const handleUserChange = (e) => {
    const user = e.target.value;
    setSelectedUser(user);
    setSelectedDate('');
    setIpLogs([]);
    setChartData([]);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    
    if (selectedUser && date) {
      // Collect logs from all IPs for this user and date
      const logs = [];
      const ipCounts = {};
      const timeDistribution = {};
      
      Object.keys(data[selectedUser]).forEach(ip => {
        if (data[selectedUser][ip][date]) {
          const formattedIp = ip.replace(/_/g, '.');
          const entriesForIp = Object.entries(data[selectedUser][ip][date]);
          
          // Count entries for this IP (for chart)
          ipCounts[formattedIp] = entriesForIp.length;
          
          // Add each log entry with IP information
          entriesForIp.forEach(([logId, logData]) => {
            // Extract hour for time distribution
            const hour = logData.time.substring(0, 2);
            timeDistribution[hour] = (timeDistribution[hour] || 0) + 1;
            
            logs.push({
              ip: formattedIp,
              logId,
              time: logData.time,
              // Add status for demo purposes - in real app would come from backend
              status: Math.random() > 0.9 ? 'failed' : 'success'
            });
          });
        }
      });
      
      // Sort logs by time
      logs.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
      
      setIpLogs(logs);
      
      // Create chart data for IP distribution
      const ipChartData = Object.entries(ipCounts).map(([ip, count]) => ({
        ip,
        count
      }));
      
      // Create chart data for time distribution (for line chart)
      const timeChartData = Object.entries(timeDistribution)
        .map(([hour, count]) => ({
          hour: hour,
          count
        }))
        .sort((a, b) => a.hour.localeCompare(b.hour));
      
      setChartData({
        ipDistribution: ipChartData,
        timeDistribution: timeChartData
      });
    }
  };

  // Format user name for display
  const formatUserName = (name) => {
    return name.replace(/_/g, ' ');
  };

  // Filter logs based on search term
  const filteredLogs = ipLogs.filter(log => {
    return (
      log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.time.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Refresh data
  const handleRefresh = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/hod/divisions")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        generateSummaryData(data);
        
        // Re-apply current selections to refresh the view
        if (selectedUser && selectedDate) {
          handleDateChange({ target: { value: selectedDate } });
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data from server');
        setLoading(false);
      });
  };

  // Export logs to CSV
  const exportToCSV = () => {
    if (!filteredLogs.length) return;
    
    const headers = ['IP Address', 'Log ID', 'Time', 'Status'];
    const csvData = filteredLogs.map(log => [log.ip, log.logId, log.time, log.status]);
    
    // Add headers
    csvData.unshift(headers);
    
    // Convert to CSV format
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${selectedUser}_${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle expanded view
  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  return (
    <div className={`p-6 ${expandedView ? 'max-w-full' : 'max-w-6xl'} mx-auto bg-white rounded-lg shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center">
          <UserCheck className="mr-2" size={28} />
          Attendance Tracker
        </h1>
        <div className="flex space-x-2">
          <button 
            onClick={toggleExpandedView} 
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            title={expandedView ? "Collapse View" : "Expand View"}
          >
            {expandedView ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <button 
            onClick={handleRefresh} 
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="flex flex-col items-center justify-center h-48">
          <RefreshCw size={40} className="text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="flex items-center">
            <AlertTriangle size={20} className="mr-2" />
            <span className="font-bold mr-2">Error:</span> {error}
          </p>
        </div>
      )}
      
      {data && !loading && (
        <div className="space-y-8">
          {/* Summary Cards */}
          {summaryData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-blue-700">Users</h3>
                  <Users size={18} className="text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-2">{summaryData.totalUsers}</p>
                <p className="text-xs text-blue-700 mt-1">Most active: {summaryData.mostActiveUser.name}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-green-700">IP Addresses</h3>
                  <Globe size={18} className="text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-900 mt-2">{summaryData.totalIPs}</p>
                <p className="text-xs text-green-700 mt-1">Most active: {summaryData.mostActiveIP.ip}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-purple-700">Login Sessions</h3>
                  <Shield size={18} className="text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-2">{summaryData.totalLogs}</p>
                <p className="text-xs text-purple-700 mt-1">Over {summaryData.totalDates} days</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-orange-700">Time Range</h3>
                  <Clock size={18} className="text-orange-500" />
                </div>
                <p className="text-lg font-bold text-orange-900 mt-2">{summaryData.earliestTime} - {summaryData.latestTime}</p>
                <p className="text-xs text-orange-700 mt-1">Activity window</p>
              </div>
            </div>
          )}
          
          {/* Overall Activity Chart */}
          {summaryData && summaryData.userActivity.length > 0 && (
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Activity size={18} className="mr-2 text-indigo-600" />
                Overall User Activity
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={summaryData.userActivity.slice(0, 10)} // Show top 10 users
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`${value} logins`, 'Count']}
                      contentStyle={{ borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: 10 }} />
                    <Bar 
                      dataKey="logins" 
                      name="Login Count" 
                      fill="#6366f1" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Selection Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users size={18} className="mr-2 text-blue-600" />
                Select User:
              </label>
              <select 
                value={selectedUser} 
                onChange={handleUserChange}
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              >
                <option value="">-- Select User --</option>
                {users.map(user => (
                  <option key={user} value={user}>{formatUserName(user)}</option>
                ))}
              </select>
            </div>
          
            {/* Date Selection - only shown when user is selected */}
            {selectedUser && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-100 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar size={18} className="mr-2 text-indigo-600" />
                  Select Date:
                </label>
                <select 
                  value={selectedDate} 
                  onChange={handleDateChange}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
                >
                  <option value="">-- Select Date --</option>
                  {getDatesForUser(selectedUser).map(date => (
                    <option key={date} value={date}>{formatDate(date)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {/* Chart View Selector */}
          {chartData && chartData.ipDistribution && chartData.ipDistribution.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveChartType('bar')}
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    activeChartType === 'bar' 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BarChartIcon size={16} className="mr-1" /> IP Distribution
                </button>
                <button
                  onClick={() => setActiveChartType('pie')}
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    activeChartType === 'pie' 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <PieChart size={16} className="mr-1" /> IP Breakdown
                </button>
                <button
                  onClick={() => setActiveChartType('line')}
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    activeChartType === 'line' 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Activity size={16} className="mr-1" /> Time Trend
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-3 py-2 rounded-md flex items-center text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                  title={showDetails ? "Hide Details" : "Show Details"}
                >
                  {showDetails ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                  {showDetails ? "Hide Details" : "Show Details"}
                </button>
                
                <button
                  onClick={exportToCSV}
                  disabled={!filteredLogs.length}
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    filteredLogs.length 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Download size={16} className="mr-1" /> Export CSV
                </button>
              </div>
            </div>
          )}
          
          {/* Charts Area */}
          {chartData && chartData.ipDistribution && chartData.ipDistribution.length > 0 && (
            <div className="mt-2 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                {activeChartType === 'bar' && <BarChartIcon size={20} className="mr-2 text-blue-600" />}
                {activeChartType === 'pie' && <PieChart size={20} className="mr-2 text-blue-600" />}
                {activeChartType === 'line' && <Activity size={20} className="mr-2 text-blue-600" />}
                {activeChartType === 'bar' && 'IP Address Distribution'}
                {activeChartType === 'pie' && 'IP Address Breakdown'}
                {activeChartType === 'line' && 'Time Distribution'}
              </h2>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChartType === 'bar' && (
                    <BarChart
                      data={chartData.ipDistribution}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="ip" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [`${value} logins`, 'Count']}
                        contentStyle={{ borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="count" 
                        name="Login Count" 
                        fill="#6366f1" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  )}
                  
                  {activeChartType === 'pie' && (
                    <RechartsPie
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <Tooltip 
                        formatter={(value, name, props) => [`${value} logins (${props.percent * 100}%)`, props.payload.ip]}
                        contentStyle={{ borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      />
                      <Legend />
                      <Pie
                        data={chartData.ipDistribution}
                        dataKey="count"
                        nameKey="ip"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ ip, percent }) => `${ip} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {chartData.ipDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsPie>
                  )}
                  
                  {activeChartType === 'line' && (
                    <LineChart
                      data={chartData.timeDistribution}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} logins`, 'Count']}
                        contentStyle={{ borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Login Count" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Results Table - only shown when logs are available and showDetails is true */}
          {ipLogs.length > 0 && showDetails && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <Clock size={20} className="mr-2 text-blue-600" />
                  Attendance Logs for {formatUserName(selectedUser)} on {formatDate(selectedDate)}
                </h2>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.map((log, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.status === 'success' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check size={12} className="mr-1" /> Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <X size={12} className="mr-1" /> Failed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Cpu size={14} className="text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{log.ip}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.logId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock size={14} className="text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{log.time}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to format date from YYYYMMDD to MM/DD/YYYY
function formatDate(dateString) {
  if (!dateString || dateString.length !== 8) return dateString;
  
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  
  return `${month}/${day}/${year}`;
}