import React, { useState, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, FileCode } from 'lucide-react';

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [attendanceComplete, setAttendanceComplete] = useState(false);
  
  // Mock data fetching
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      const mockStudents = [
        { id: 1, rollNo: '001', name: 'Alex Johnson', present: false },
        { id: 2, rollNo: '002', name: 'Maria Garcia', present: false },
        { id: 3, rollNo: '003', name: 'James Wilson', present: false },
        { id: 4, rollNo: '004', name: 'Emma Chen', present: false },
        { id: 5, rollNo: '005', name: 'Noah Patel', present: false },
        { id: 6, rollNo: '006', name: 'Olivia Kim', present: false },
        { id: 7, rollNo: '007', name: 'Liam Rodriguez', present: false },
        { id: 8, rollNo: '008', name: 'Sophia Martinez', present: false },
        { id: 9, rollNo: '009', name: 'Ethan Thompson', present: false },
        { id: 10, rollNo: '010', name: 'Ava Williams', present: false },
      ];
      
      setStudents(mockStudents);
      setLoading(false);
      
      // Set current date in YYYY-MM-DD format
      const today = new Date();
      setCurrentDate(today.toISOString().split('T')[0]);
    }, 1000);
  }, []);

  // Toggle student's attendance
  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id ? {...student, present: !student.present} : student
    ));
  };

  // Mark all students as present
  const markAllPresent = () => {
    setStudents(students.map(student => ({...student, present: true})));
  };

  // Mark all students as absent
  const markAllAbsent = () => {
    setStudents(students.map(student => ({...student, present: false})));
  };

  // Save attendance to database
  const saveAttendance = () => {
    // In a real application, this would be an API call
    console.log('Saving attendance data:', {
      subject,
      date: currentDate,
      students
    });
    
    // Simulate saving to database
    setTimeout(() => {
      setAttendanceComplete(true);
      alert('Attendance has been saved successfully!');
    }, 800);
  };

  // Generate attendance data for downloads
  const generateAttendanceData = () => {
    return {
      subject,
      date: currentDate,
      students: students.map(({ rollNo, name, present }) => ({
        rollNo,
        name,
        status: present ? 'Present' : 'Absent'
      }))
    };
  };

  // Download as XLSX (mock function)
  const downloadXLSX = () => {
    const data = generateAttendanceData();
    console.log('Downloading XLSX:', data);
    alert('XLSX download initiated (mock). In a real app, this would download an Excel file.');
  };

  // Download as PDF (mock function)
  const downloadPDF = () => {
    const data = generateAttendanceData();
    console.log('Downloading PDF:', data);
    alert('PDF download initiated (mock). In a real app, this would download a PDF file.');
  };

  // Download as DOCX (mock function)
  const downloadDOCX = () => {
    const data = generateAttendanceData();
    console.log('Downloading DOCX:', data);
    alert('DOCX download initiated (mock). In a real app, this would download a Word document.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-900">
        <div className="text-white text-xl">Loading attendance system...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-900 p-6">
      <div className="max-w-4xl mx-auto bg-red-950 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-red-100 mb-6">Take Attendance of Students</h1>
        
        {/* Subject and Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-red-200 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 rounded bg-red-900 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
            />
          </div>
          <div>
            <label className="block text-red-200 mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 rounded bg-red-900 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={markAllPresent}
            className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Mark All Present
          </button>
          <button 
            onClick={markAllAbsent}
            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Mark All Absent
          </button>
          <button 
            onClick={saveAttendance}
            disabled={!subject}
            className={`bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ${!subject ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save Attendance
          </button>
        </div>
        
        {/* Students List */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-red-100">
            <thead className="bg-red-800 text-left">
              <tr>
                <th className="p-3 rounded-tl-lg">Roll No</th>
                <th className="p-3">Name</th>
                <th className="p-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr 
                  key={student.id} 
                  className={index % 2 === 0 ? 'bg-red-900/50' : 'bg-red-900/30'}
                >
                  <td className="p-3">{student.rollNo}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-24 py-1 px-2 rounded text-sm font-medium ${
                          student.present
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        {student.present ? 'Present' : 'Absent'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Download Section - Only visible after attendance is completed */}
        {attendanceComplete && (
          <div className="bg-red-800/40 rounded-lg p-4">
            <h2 className="text-xl font-bold text-red-100 mb-3">Download Attendance</h2>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={downloadXLSX}
                className="flex items-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                XLSX
              </button>
              <button 
                onClick={downloadPDF}
                className="flex items-center bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                <FileText className="mr-2 h-5 w-5" />
                PDF
              </button>
              <button 
                onClick={downloadDOCX}
                className="flex items-center bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                <FileCode className="mr-2 h-5 w-5" />
                DOCX
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;