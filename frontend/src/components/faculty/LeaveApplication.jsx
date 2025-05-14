import { useState } from 'react';
import { AlertCircle, Check, Loader2, Clock, CheckCircle, XCircle, Calendar, Info, ChevronRight, User, Bookmark, FileText, PlusCircle } from 'lucide-react';

export default function FacultyLeaveForm() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    facultyId: '',
    fromDate: '',
    toDate: '',
    reason: '',
    leaveType: 'sick',
  });

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [activeTab, setActiveTab] = useState('apply'); // 'apply', 'pending', 'history'

  // Leave type options
  const leaveTypeOptions = [
    { value: 'sick', label: 'Sick Leave', color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-4 w-4" /> },
    { value: 'academic', label: 'Academic Leave', color: 'bg-blue-100 text-blue-800', icon: <Bookmark className="h-4 w-4" /> },
    { value: 'emergency', label: 'Emergency Leave', color: 'bg-orange-100 text-orange-800', icon: <Info className="h-4 w-4" /> },
    { value: 'maternity', label: 'Maternity Leave', color: 'bg-pink-100 text-pink-800', icon: <User className="h-4 w-4" /> },
    { value: 'family', label: 'Family Function', color: 'bg-purple-100 text-purple-800', icon: <User className="h-4 w-4" /> },
    { value: 'travel', label: 'Travel Leave', color: 'bg-green-100 text-green-800', icon: <ChevronRight className="h-4 w-4" /> },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800', icon: <FileText className="h-4 w-4" /> }
  ];

  // Mock data for leave history and current status
  const [leaveHistory] = useState([
    {
      name: 'Atul Kathole',
      id: 'LV2025001',
      fromDate: '2025-04-10',
      toDate: '2025-04-12',
      leaveType: 'sick',
      reason: 'Medical appointment and recovery',
      status: 'approved',
      hodStatus: 'approved',
      hodRemarks: 'Approved as requested',
      hodDate: '2025-04-02',
      principalStatus: 'approved',
      principalRemarks: 'Approved',
      principalDate: '2025-04-03',
    },
    {
      name: 'Atul Kathole',
      id: 'LV2025002',
      fromDate: '2025-03-15',
      toDate: '2025-03-15',
      leaveType: 'family',
      reason: 'Personal work',
      status: 'rejected',
      hodStatus: 'approved',
      hodRemarks: 'Approved for half day',
      hodDate: '2025-03-10',
      principalStatus: 'rejected',
      principalRemarks: 'Too many faculty on leave that day',
      principalDate: '2025-03-12',
    },
    {
      name: 'Atul Kathole',
      id: 'LV2025003',
      fromDate: '2025-05-05',
      toDate: '2025-05-07',
      leaveType: 'family',
      reason: 'Family function',
      status: 'pending',
      hodStatus: 'approved',
      hodRemarks: 'Approved',
      hodDate: '2025-05-01',
      principalStatus: 'pending',
      principalRemarks: '',
      principalDate: '',
    },
    {
      name: 'Atul Kathole',
      id: 'LV2025004',
      fromDate: '2025-05-20',
      toDate: '2025-05-20',
      leaveType: 'academic',
      reason: 'Conference attendance',
      status: 'pending',
      hodStatus: 'pending',
      hodRemarks: '',
      hodDate: '',
      principalStatus: 'pending',
      principalRemarks: '',
      principalDate: '',
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate Faculty ID
    if (!formData.facultyId.trim()) {
      newErrors.facultyId = 'Faculty ID is required';
    }
    
    // Validate From Date
    if (!formData.fromDate) {
      newErrors.fromDate = 'From Date is required';
    }
    
    // Validate To Date
    if (!formData.toDate) {
      newErrors.toDate = 'To Date is required';
    } else if (formData.fromDate && new Date(formData.toDate) < new Date(formData.fromDate)) {
      newErrors.toDate = 'To Date cannot be before From Date';
    }
    
    // Validate Reason
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for leave is required';
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Please provide a more detailed reason (min 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Reset submission state
    setSubmitStatus(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        facultyId: '',
        fromDate: '',
        toDate: '',
        reason: '',
        leaveType: 'sick',
      });
    } catch (error) {
      // Show success message
      setSubmitStatus('error');
    } finally {
      // Hide loading state
      setIsSubmitting(false);
    }
  };

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </span>
        );
    }
  };

  // Function to get leave type badge
  const getLeaveTypeBadge = (leaveType) => {
    const leaveOption = leaveTypeOptions.find(option => option.value === leaveType) || leaveTypeOptions[6];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${leaveOption.color}`}>
        {leaveOption.icon}
        <span className="ml-1">{leaveOption.label}</span>
      </span>
    );
  };

  const LeaveApplicationForm = () => (
    <div className="space-y-6">
      {/* Faculty ID */}
      <div>
        <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">
          Faculty ID <span className="text-red-600">*</span>
        </label>
        <div className="mt-1">
          <input
            id="facultyId"
            name="facultyId"
            type="text"
            value={formData.facultyId}
            onChange={handleChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm transition-colors
            ${errors.facultyId ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            placeholder="Enter your faculty ID"
          />
          {errors.facultyId && (
            <p className="mt-2 text-sm text-red-600">{errors.facultyId}</p>
          )}
        </div>
      </div>
      
      {/* Date Range */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* From Date */}
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
            From Date <span className="text-red-600">*</span>
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="fromDate"
              name="fromDate"
              type="date"
              value={formData.fromDate}
              onChange={handleChange}
              className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm transition-colors
              ${errors.fromDate ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.fromDate && (
              <p className="mt-2 text-sm text-red-600">{errors.fromDate}</p>
            )}
          </div>
        </div>
        
        {/* To Date */}
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
            To Date <span className="text-red-600">*</span>
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="toDate"
              name="toDate"
              type="date"
              value={formData.toDate}
              onChange={handleChange}
              min={formData.fromDate}
              className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm transition-colors
              ${errors.toDate ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.toDate && (
              <p className="mt-2 text-sm text-red-600">{errors.toDate}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Leave Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Leave Type <span className="text-red-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {leaveTypeOptions.map((option) => (
            <div key={option.value} className="relative">
              <input
                id={`leave-type-${option.value}`}
                name="leaveType"
                type="radio"
                value={option.value}
                checked={formData.leaveType === option.value}
                onChange={handleChange}
                className="absolute opacity-0 w-full h-full cursor-pointer z-10"
              />
              <label
                htmlFor={`leave-type-${option.value}`}
                className={`flex items-center p-3 rounded-lg border ${
                  formData.leaveType === option.value
                    ? 'bg-red-200 border-red-600 ring-2 ring-red-600'
                    : 'border-gray-200 hover:bg-gray-50'
                } cursor-pointer transition-all`}
              >
                <div className={`rounded-full p-1 mr-2 ${option.color.replace('text-', 'bg-').replace('100', '500')}`}>
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Application <span className="text-red-600">*</span>
        </label>
        <div className="mt-1">
          <textarea
            id="reason"
            name="reason"
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm transition-colors
            ${errors.reason ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            placeholder="Please provide a detailed reason for your leave application"
          />
          {errors.reason && (
            <p className="mt-2 text-sm text-red-600">{errors.reason}</p>
          )}
        </div>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent 
          text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600
          transition-colors duration-200 ease-in-out
          ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Submitting...
            </>
          ) : (
            <>
              <PlusCircle className="-ml-1 mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );

  const PendingApprovals = () => {
    const pendingLeaves = leaveHistory.filter(leave => leave.status === 'pending');
    
    if (pendingLeaves.length === 0) {
      return (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No pending leave applications</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {pendingLeaves.map((leave) => (
          <div key={leave.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{leave.id}</h3>
                <div className="flex items-center mt-1">
                  {getLeaveTypeBadge(leave.leaveType)}
                  <span className="ml-2 text-sm text-gray-500">
                    {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {leave.reason}
                </p>
              </div>
              {getStatusBadge(leave.status)}
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">HOD Approval</h4>
                  <div className="mt-1 flex items-center">
                    {getStatusBadge(leave.hodStatus)}
                    {leave.hodStatus !== 'pending' && (
                      <span className="ml-2 text-xs text-gray-500">{formatDate(leave.hodDate)}</span>
                    )}
                  </div>
                  {leave.hodRemarks && (
                    <p className="mt-1 text-xs text-gray-600">{leave.hodRemarks}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Approval</h4>
                  <div className="mt-1 flex items-center">
                    {getStatusBadge(leave.principalStatus)}
                    {leave.principalStatus !== 'pending' && (
                      <span className="ml-2 text-xs text-gray-500">{formatDate(leave.principalDate)}</span>
                    )}
                  </div>
                  {leave.principalRemarks && (
                    <p className="mt-1 text-xs text-gray-600">{leave.principalRemarks}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const LeaveHistory = () => {
    const completedLeaves = leaveHistory.filter(leave => leave.status !== 'pending');
    
    if (completedLeaves.length === 0) {
      return (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No leave history found</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {completedLeaves.map((leave) => (
            <li key={leave.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`rounded-full p-1 mr-2 ${
                      leaveTypeOptions.find(opt => opt.value === leave.leaveType)?.color.replace('text-', 'bg-').replace('100', '500') || 'bg-gray-500'
                    }`}>
                      {leaveTypeOptions.find(opt => opt.value === leave.leaveType)?.icon || <FileText className="h-4 w-4" />}
                    </div>
                    <p className="text-sm font-medium text-red-700 truncate">{leave.id}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {getStatusBadge(leave.status)}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                    </p>
                    <p className="mt-1 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {getLeaveTypeBadge(leave.leaveType)}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{leave.reason}</p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">HOD: </span>
                    {leave.hodStatus === 'approved' ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-red-600">Rejected</span>
                    )}
                    {leave.hodRemarks && <span> - {leave.hodRemarks}</span>}
                  </div>
                  <div>
                    <span className="font-medium">Principal: </span>
                    {leave.principalStatus === 'approved' ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-red-600">Rejected</span>
                    )}
                    {leave.principalRemarks && <span> - {leave.principalRemarks}</span>}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-red-900 to-red-600 text-white py-6 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold">Faculty Leave Management</h2>
          <p className="text-center text-indigo-100 mt-1">Efficiently manage your leave applications</p>
        </div>
      </div>
      
      <div className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="sm:hidden">
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-red-600 focus:border-red-600 border-gray-300 rounded-md"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="apply">Apply For Leave</option>
                <option value="pending">Pending Approvals</option>
                <option value="history">Leave History</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('apply')}
                    className={`${
                      activeTab === 'apply'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
                  >
                    <PlusCircle className={`h-5 w-5 mr-2 ${activeTab === 'apply' ? 'text-red-600' : 'text-gray-400'}`} />
                    Apply For Leave
                  </button>
                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`${
                      activeTab === 'pending'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
                  >
                    <Clock className={`h-5 w-5 mr-2 ${activeTab === 'pending' ? 'text-red-600' : 'text-gray-400'}`} />
                    Pending Approvals
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`${
                      activeTab === 'history'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
                  >
                    <Calendar className={`h-5 w-5 mr-2 ${activeTab === 'history' ? 'text-red-600' : 'text-gray-400'}`} />
                    Leave History
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {activeTab === 'apply' && (
              <div className="p-6">
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center mb-6 animate-pulse">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Leave application submitted successfully!</span>
                  </div>
                )}
                
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center mb-6">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Failed to submit application. Please try again.</span>
                  </div>
                )}
                
                <h3 className="text-xl font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">New Leave Application</h3>
                <LeaveApplicationForm />
              </div>
            )}
            
            {activeTab === 'pending' && (
              <div>
                <div className="bg-red-200 px-6 py-4 border-b border-indigo-100">
                  <h3 className="text-lg font-medium text-red-900">Pending Approvals</h3>
                </div>
                <div className="p-6">
                  <PendingApprovals />
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div>
                <div className="bg-red-200 px-6 py-4 border-b border-indigo-100">
                  <h3 className="text-lg font-medium text-red-900">Leave History</h3>
                </div>
                <div className="p-6">
                  <LeaveHistory />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* <footer className="bg-gradient-to-r from-red-800 to-red-600 text-white py-4 px-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Faculty Leave Management System</p>
          <p className="text-sm text-indigo-200 mt-2 sm:mt-0">Modernized UI Version</p>
        </div>
      </footer> */}
    </div>
  );
}

