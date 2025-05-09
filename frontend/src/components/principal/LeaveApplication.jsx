import { useState, useEffect } from 'react';
import { Check, X, ChevronDown, ChevronUp, AlertCircle, Filter, Calendar, FileText, Clock, User, BarChart, PieChart, Download, Search, Info, ThumbsUp, Bell } from 'lucide-react';

export default function LeaveApplication() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);

  // Sample data - in a real app this would come from an API
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      faculty: {
        name: "Dr. Sarah Johnson",
        department: "Computer Science",
        employeeId: "CS-1023",
        image: "/api/placeholder/100/100",
        designation: "Associate Professor",
        yearsOfService: 7
      },
      leaveType: "Sick Leave",
      startDate: "2025-05-15",
      endDate: "2025-05-20",
      totalDays: 6,
      reason: "Medical procedure and recovery",
      attachments: ["medical_certificate.pdf"],
      status: "approved_by_hod",
      submittedOn: "2025-05-09",
      hodApproved: {
        name: "Prof. Alan Turing",
        date: "2025-05-10",
        remarks: "Approve. Important procedure."
      },
      leaveBalance: {
        sick: 10,
        casual: 8,
        academic: 15
      }
    },
    {
      id: 2,
      faculty: {
        name: "Prof. Michael Chen",
        department: "Mathematics",
        employeeId: "MATH-0872",
        image: "/api/placeholder/100/100",
        designation: "Professor",
        yearsOfService: 12
      },
      leaveType: "Casual Leave",
      startDate: "2025-05-22",
      endDate: "2025-05-23",
      totalDays: 2,
      reason: "Family function",
      attachments: [],
      status: "approved_by_hod",
      submittedOn: "2025-05-08",
      hodApproved: {
        name: "Dr. Katherine Johnson",
        date: "2025-05-09",
        remarks: "Approved. Short duration."
      },
      leaveBalance: {
        sick: 12,
        casual: 5,
        academic: 20
      }
    },
    {
      id: 3,
      faculty: {
        name: "Dr. Alex Rivera",
        department: "Physics",
        employeeId: "PHY-2140",
        image: "/api/placeholder/100/100",
        designation: "Assistant Professor",
        yearsOfService: 3
      },
      leaveType: "Academic Leave",
      startDate: "2025-06-10",
      endDate: "2025-06-20",
      totalDays: 11,
      reason: "International conference attendance",
      attachments: ["conference_invite.pdf", "paper_acceptance.pdf"],
      status: "approved_by_hod",
      submittedOn: "2025-05-07",
      hodApproved: {
        name: "Dr. Richard Feynman",
        date: "2025-05-08",
        remarks: "Important for department visibility. Approved."
      },
      leaveBalance: {
        sick: 15,
        casual: 10,
        academic: 5
      }
    },
    {
      id: 4,
      faculty: {
        name: "Dr. Lisa Wong",
        department: "Chemistry",
        employeeId: "CHEM-1542",
        image: "/api/placeholder/100/100",
        designation: "Professor",
        yearsOfService: 15
      },
      leaveType: "Long Leave",
      startDate: "2025-07-01",
      endDate: "2025-08-30",
      totalDays: 61,
      reason: "Visiting professor opportunity at Cambridge University",
      attachments: ["invitation_letter.pdf", "research_proposal.pdf"],
      status: "approved_by_hod",
      submittedOn: "2025-05-03",
      hodApproved: {
        name: "Dr. Marie Curie",
        date: "2025-05-06",
        remarks: "Excellent opportunity. Will enhance our department's international collaboration."
      },
      leaveBalance: {
        sick: 20,
        casual: 12,
        academic: 30
      }
    },
    {
      id: 5,
      faculty: {
        name: "Prof. James Wilson",
        department: "English",
        employeeId: "ENG-0672",
        image: "/api/placeholder/100/100",
        designation: "Associate Professor",
        yearsOfService: 9
      },
      leaveType: "Casual Leave",
      startDate: "2025-05-19",
      endDate: "2025-05-21",
      totalDays: 3,
      reason: "Personal emergency",
      attachments: [],
      status: "rejected",
      submittedOn: "2025-05-12",
      hodApproved: {
        name: "Dr. Virginia Woolf",
        date: "2025-05-13",
        remarks: "Approved due to personal emergency."
      },
      principalRejected: {
        date: "2025-05-14",
        reason: "Department is short-staffed during exam period."
      },
      leaveBalance: {
        sick: 8,
        casual: 4,
        academic: 12
      }
    }
  ]);

  // Activity log
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      type: "approval",
      faculty: "Dr. Sarah Johnson",
      department: "Computer Science",
      date: "2025-05-10",
      details: "HOD approved Sick Leave (6 days)"
    },
    {
      id: 2,
      type: "approval",
      faculty: "Prof. Michael Chen",
      department: "Mathematics",
      date: "2025-05-09",
      details: "HOD approved Casual Leave (2 days)"
    },
    {
      id: 3,
      type: "rejection",
      faculty: "Prof. James Wilson",
      department: "English",
      date: "2025-05-14",
      details: "Principal rejected Casual Leave (3 days)"
    }
  ]);

  // Notification messages
  const [systemNotifications, setSystemNotifications] = useState([
    {
      id: 1,
      title: "New Leave Application",
      message: "Dr. Sarah Johnson's leave application has been approved by HOD",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Leave Balance Alert",
      message: "Physics department has high leave requests this month",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      title: "Upcoming Leave",
      message: "3 faculty members will be on leave next week",
      time: "2 days ago",
      read: false
    }
  ]);

  // Get the filtered applications based on status and department
  const getFilteredApplications = () => {
    return leaveApplications.filter(app => {
      // Filter by status
      const statusMatch = filterStatus === "all" || app.status === filterStatus;
      
      // Filter by department
      const departmentMatch = filterDepartment === "all" || app.faculty.department.toLowerCase() === filterDepartment.toLowerCase();
      
      // Filter by search query
      const searchMatch = searchQuery === "" || 
        app.faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && departmentMatch && searchMatch;
    });
  };

  const handleApprove = (application) => {
    // Update application status
    setLeaveApplications(leaveApplications.map(app => 
      app.id === application.id ? {...app, status: "approved_by_principal"} : app
    ));
    
    // Add to activity log
    setActivityLog([{
      id: Date.now(),
      type: "approval",
      faculty: application.faculty.name,
      department: application.faculty.department,
      date: new Date().toISOString().split('T')[0],
      details: `Principal approved ${application.leaveType} (${application.totalDays} days)`
    }, ...activityLog]);
    
    // Show notification
    addNotification(`Approved leave for ${application.faculty.name}`);
    
    // Close detail view if this was the selected application
    if (selectedApplication && selectedApplication.id === application.id) {
      setSelectedApplication(null);
    }
  };

  const handleReject = () => {
    if (!selectedApplication) return;
    
    // Update application status with rejection reason
    setLeaveApplications(leaveApplications.map(app => 
      app.id === selectedApplication.id ? 
        {...app, 
          status: "rejected", 
          principalRejected: {
            date: new Date().toISOString().split('T')[0],
            reason: rejectionReason
          }
        } : app
    ));
    
    // Add to activity log
    setActivityLog([{
      id: Date.now(),
      type: "rejection",
      faculty: selectedApplication.faculty.name,
      department: selectedApplication.faculty.department,
      date: new Date().toISOString().split('T')[0],
      details: `Principal rejected ${selectedApplication.leaveType} (${selectedApplication.totalDays} days)`
    }, ...activityLog]);
    
    // Show notification
    addNotification(`Rejected leave for ${selectedApplication.faculty.name}`);
    
    // Reset and close modal
    setRejectionReason("");
    setShowRejectModal(false);
    setSelectedApplication(null);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message
    };
    setNotifications([...notifications, newNotification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(current => 
        current.filter(note => note.id !== newNotification.id)
      );
    }, 5000);
  };

  const toggleExpand = (id) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const markAllNotificationsAsRead = () => {
    setSystemNotifications(
      systemNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  // Department counts for statistics
  const departmentCounts = {
    "Computer Science": 1,
    "Mathematics": 1,
    "Physics": 1,
    "Chemistry": 1,
    "English": 1
  };

  // Leave type counts for statistics
  const leaveTypeCounts = {
    "Sick Leave": 1,
    "Casual Leave": 2,
    "Academic Leave": 1,
    "Long Leave": 1
  };

  const unreadNotificationsCount = systemNotifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Principal's Leave Approval Dashboard</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
                className="text-white hover:text-red-200 relative"
              >
                <Bell size={22} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Panel */}
              {showNotificationsPanel && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button 
                      onClick={markAllNotificationsAsRead} 
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {systemNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b ${notification.read ? 'bg-white' : 'bg-red-50'} hover:bg-gray-50`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                    {systemNotifications.length === 0 && (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                  <div className="p-2 text-center border-t">
                    <button className="text-xs text-red-600 hover:text-red-800">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm hidden md:inline">Welcome, Principal Dr. Robert Smith</span>
              <div className="h-10 w-10 rounded-full bg-red-700 flex items-center justify-center">
                <span className="font-semibold">RS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-4 md:p-6">
        {/* Stats Section */}
        {showStats && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-red-900">Leave Overview</h2>
              <button 
                onClick={() => setShowStats(false)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-red-50 p-4 rounded-lg flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Calendar size={20} className="text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Approvals</p>
                  <p className="text-2xl font-semibold text-red-800">
                    {leaveApplications.filter(app => app.status === "approved_by_hod").length}
                  </p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Check size={20} className="text-green-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved This Month</p>
                  <p className="text-2xl font-semibold text-green-800">
                    {leaveApplications.filter(app => app.status === "approved_by_principal").length}
                  </p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <X size={20} className="text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rejected This Month</p>
                  <p className="text-2xl font-semibold text-red-800">
                    {leaveApplications.filter(app => app.status === "rejected").length}
                  </p>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <User size={20} className="text-orange-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Faculty On Leave Today</p>
                  <p className="text-2xl font-semibold text-orange-800">2</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-900">Leave Applications</h2>
                {!showStats && (
                  <button 
                    onClick={() => setShowStats(true)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                  >
                    <BarChart size={16} className="mr-1" />
                    Show Stats
                  </button>
                )}
              </div>
              
              {/* Search and Filter */}
              <div className="mb-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search faculty, department, or leave type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                
                <div className="flex space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="approved_by_hod">Pending Principal Approval</option>
                    <option value="approved_by_principal">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  >
                    <option value="all">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                {getFilteredApplications().map(application => (
                  <div 
                    key={application.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedApplication?.id === application.id 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-grow"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                            <img src={application.faculty.image} alt={application.faculty.name} />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{application.faculty.name}</span>
                            <div className="text-xs text-gray-600 mt-0.5">
                              {application.faculty.department} • {application.faculty.designation}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            application.status === "approved_by_hod" 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : application.status === "approved_by_principal"
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {application.status === "approved_by_hod" 
                              ? "Pending Principal Approval" 
                              : application.status === "approved_by_principal"
                                ? "Approved"
                                : "Rejected"}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {application.leaveType} • {application.totalDays} day{application.totalDays > 1 ? 's' : ''}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {formatDate(application.startDate)} - {formatDate(application.endDate)}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <button 
                          onClick={() => toggleExpand(application.id)}
                          className="text-gray-500 hover:text-red-700"
                        >
                          {expandedApplication === application.id ? 
                            <ChevronUp size={16} /> : 
                            <ChevronDown size={16} />
                          }
                        </button>
                      </div>
                    </div>
                    
                    {/* Expanded Actions */}
                    {expandedApplication === application.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="mb-2 text-xs text-gray-700">
                          <strong>HOD Remarks:</strong> {application.hodApproved.remarks}
                        </div>
                        {application.status === "approved_by_hod" && (
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleApprove(application)}
                              className="px-3 py-1 bg-green-600 text-white rounded-md flex items-center text-sm hover:bg-green-700"
                            >
                              <Check size={14} className="mr-1" />
                              Approve
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowRejectModal(true);
                              }}
                              className="px-3 py-1 bg-red-600 text-white rounded-md flex items-center text-sm hover:bg-red-700"
                            >
                              <X size={14} className="mr-1" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {getFilteredApplications().length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No matching leave applications found
                  </div>
                )}
              </div>
            </div>
            
            {/* Activity Log */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-red-900">Recent Activity</h2>
              <div className="space-y-3">
                {activityLog.slice(0, 5).map((activity) => (
                  <div 
                    key={activity.id}
                    className="border-l-4 pl-3 py-2"
                    style={{
                      borderColor: activity.type === "approval" ? "#10B981" : "#EF4444"
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-800">{activity.faculty}</span>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                    <div className="text-xs text-gray-600">{activity.department}</div>
                    <div className="text-xs text-gray-700 mt-1">{activity.details}</div>
                  </div>
                ))}
                
                {activityLog.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
              
              <button className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center justify-center w-full">
                View all activity <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
          </div>
          
          {/* Right Column - Application Details */}
          <div className="lg:col-span-2">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-red-900">Leave Application Details</h2>
                    <p className="text-sm text-gray-500">Submitted on {formatDate(selectedApplication.submittedOn)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Faculty Info */}
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium text-red-800 mb-3">Faculty Information</h3>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img src={selectedApplication.faculty.image} alt={selectedApplication.faculty.name} />
                      </div>
                      <div>
                        <h4 className="font-medium">{selectedApplication.faculty.name}</h4>
                        <p className="text-sm text-gray-600">{selectedApplication.faculty.department}</p>
                        <p className="text-xs text-gray-500">ID: {selectedApplication.faculty.employeeId}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500">Designation</p>
                        <p className="text-sm font-medium">{selectedApplication.faculty.designation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Years of Service</p>
                        <p className="text-sm font-medium">{selectedApplication.faculty.yearsOfService} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Leave Balance</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-red-50 p-2 rounded text-center">
                            <p className="text-xs text-gray-600">Sick</p>
                            <p className="text-sm font-medium text-red-800">{selectedApplication.leaveBalance.sick}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded text-center">
                            <p className="text-xs text-gray-600">Casual</p>
                            <p className="text-sm font-medium text-green-800">{selectedApplication.leaveBalance.casual}</p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded text-center">
                            <p className="text-xs text-gray-600">Academic</p>
                            <p className="text-sm font-medium text-purple-800">{selectedApplication.leaveBalance.academic}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Leave Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-red-800 mb-3">Leave Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Leave Type</p>
                        <p className="font-medium">{selectedApplication.leaveType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{selectedApplication.totalDays} day{selectedApplication.totalDays > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium">{formatDate(selectedApplication.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium">{formatDate(selectedApplication.endDate)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Reason</p>
                      <p className="p-3 bg-gray-50 rounded-md mt-1">{selectedApplication.reason}</p>
                    </div>
                    
                    {/* HOD Approval Details */}
                    <div className="mt-4 p-3 bg-red-50 rounded-md">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-red-800">HOD Approval</p>
                        <p className="text-xs text-gray-600">{formatDate(selectedApplication.hodApproved.date)}</p>
                      </div>
                      <p className="text-sm mt-1">Approved by: {selectedApplication.hodApproved.name}</p>
                      <p className="text-sm mt-1">Remarks: {selectedApplication.hodApproved.remarks}</p>
                    </div>
                    
                    {/* Rejected by Principal (if applicable) */}
                    {selectedApplication.principalRejected && (
                      <div className="mt-4 p-3 bg-red-50 rounded-md">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-red-800">Principal Rejection</p>
                          <p className="text-xs text-gray-600">{formatDate(selectedApplication.principalRejected.date)}</p>
                        </div>
                        <p className="text-sm mt-1">Reason: {selectedApplication.principalRejected.reason}</p>
                      </div>
                    )}
                    
                    {/* Attachments */}
                    {selectedApplication.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Attachments</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.attachments.map((attachment, index) => (
                            <div key={index} className="bg-gray-100 rounded-md px-3 py-2 text-sm flex items-center">
                              <FileText size={14} className="mr-2 text-red-600" />
                              <span>{attachment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Schedule Impact - New section showing impact of this leave */}
                <div className="mt-6 p-4 border border-red-100 rounded-lg bg-red-50">
                  <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                    <Info size={18} className="mr-2" />
                    Department Schedule Impact
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Faculty on leave during this period:</p>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                          Dr. Elena Rodriguez (Physics)
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                          Prof. Jamal Carter (Computer Science)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Upcoming events during leave period:</p>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start text-sm">
                          <Calendar size={16} className="mr-2 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Mid-semester Evaluation</span>
                            <p className="text-xs text-gray-500">May 18 - May 22, 2025</p>
                          </div>
                        </li>
                        {selectedApplication.faculty.department === "Computer Science" && (
                          <li className="flex items-start text-sm">
                            <Calendar size={16} className="mr-2 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-red-600">Departmental Accreditation Visit</span>
                              <p className="text-xs text-gray-500">May 17, 2025</p>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Academic Coverage - For academic leaves */}
                {selectedApplication.leaveType === "Academic Leave" && (
                  <div className="mt-4 p-4 border border-green-100 rounded-lg bg-green-50">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Academic Coverage Plan</h3>
                    <p className="text-sm">Classes will be covered by Prof. Daniel Lewis during the absence period.</p>
                    <div className="mt-2 flex">
                      <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                        <FileText size={14} className="mr-1" />
                        View Coverage Schedule
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Long Leave Additional Info */}
                {selectedApplication.leaveType === "Long Leave" && (
                  <div className="mt-4 p-4 border border-purple-100 rounded-lg bg-purple-50">
                    <h3 className="text-lg font-medium text-purple-800 mb-2">Extended Leave Information</h3>
                    <p className="text-sm">This is a long-term leave request that requires special consideration of departmental staffing.</p>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Financial Impact</p>
                        <p className="text-sm font-medium">Pay continuation for first 30 days</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Substitute Arrangement</p>
                        <p className="text-sm font-medium">Adjunct professor to be hired</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                {selectedApplication.status === "approved_by_hod" && (
                  <div className="mt-8 flex justify-end space-x-4">
                    <button 
                      onClick={() => handleApprove(selectedApplication)}
                      className="px-5 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700"
                    >
                      <Check size={18} className="mr-2" />
                      Approve Leave
                    </button>
                    <button 
                      onClick={() => setShowRejectModal(true)}
                      className="px-5 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700"
                    >
                      <X size={18} className="mr-2" />
                      Reject Leave
                    </button>
                  </div>
                )}
                
                {selectedApplication.status !== "approved_by_hod" && (
                  <div className="mt-8 flex justify-end">
                    <button className="px-5 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700">
                      <Download size={18} className="mr-2" />
                      Download Application
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-red-800 mb-4 flex items-center">
                    <BarChart size={20} className="mr-2 text-red-600" />
                    Leave Distribution by Department
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(departmentCounts).map(([dept, count]) => (
                      <div key={dept}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{dept}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${(count / Object.values(departmentCounts).reduce((a, b) => a + b, 0)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center">
                    View detailed report <ChevronDown size={14} className="ml-1" />
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-red-800 mb-4 flex items-center">
                    <PieChart size={20} className="mr-2 text-red-600" />
                    Leave Types Overview
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(leaveTypeCounts).map(([type, count]) => (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{type}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              type === "Sick Leave" ? "bg-red-500" :
                              type === "Casual Leave" ? "bg-green-500" :
                              type === "Academic Leave" ? "bg-red-500" : "bg-purple-500"
                            }`}
                            style={{ width: `${(count / Object.values(leaveTypeCounts).reduce((a, b) => a + b, 0)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center">
                    Download statistics <Download size={14} className="ml-1" />
                  </button>
                </div>
                
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-64">
                  <div className="text-red-800 mb-4">
                    <AlertCircle size={48} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">No Application Selected</h2>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Select a leave application from the list to view details and take action
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <button className="p-4 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 flex flex-col items-center">
                      <Clock size={24} className="text-red-700 mb-2" />
                      <span className="text-sm font-medium text-red-800">View Calendar</span>
                    </button>
                    <button className="p-4 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 flex flex-col items-center">
                      <BarChart size={24} className="text-red-700 mb-2" />
                      <span className="text-sm font-medium text-red-800">Reports</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-100 border-t border-gray-200 p-4 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <div className="mb-2 md:mb-0">
            © 2025 University Management System
          </div>
          <div className="flex space-x-6">
            <button className="hover:text-red-700">Help</button>
            <button className="hover:text-red-700">Settings</button>
            <button className="hover:text-red-700">Support</button>
          </div>
        </div>
      </footer> */}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-900">Reject Leave Application</h3>
              <button 
                onClick={() => setShowRejectModal(false)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-4 text-gray-700">
              Please provide a reason for rejecting {selectedApplication?.faculty.name}'s leave application.
            </p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={4}
            />
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className={`px-4 py-2 rounded-md text-white ${
                  rejectionReason.trim() 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-red-400 cursor-not-allowed'
                }`}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover Info Tooltip */}
      {hoverInfo && (
        <div 
          className="fixed bg-white rounded-lg shadow-lg p-3 z-50 text-sm w-64"
          style={{
            top: hoverInfo.y + 10,
            left: hoverInfo.x + 10
          }}
        >
          <h4 className="font-medium text-red-800 mb-1">{hoverInfo.title}</h4>
          <p className="text-gray-700">{hoverInfo.content}</p>
        </div>
      )}

      {/* Action Notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-40">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className="bg-white rounded-lg shadow-lg p-3 flex items-center animate-slideIn"
            style={{
              animation: "slideIn 0.3s ease-out forwards",
            }}
          >
            <div className="mr-3 text-green-600">
              <ThumbsUp size={18} />
            </div>
            <span>{notification.message}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
