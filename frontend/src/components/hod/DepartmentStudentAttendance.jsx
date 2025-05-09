import React, { useState, useEffect } from 'react';

const dummyData = {
  A: [
    { id: 1, name: 'Alice', attendance: '92%' },
    { id: 2, name: 'Arjun', attendance: '87%' }
  ],
  B: [
    { id: 3, name: 'Bhavna', attendance: '95%' },
    { id: 4, name: 'Bala', attendance: '90%' }
  ],
  C: [
    { id: 5, name: 'Chirag', attendance: '80%' },
    { id: 6, name: 'Chitra', attendance: '85%' }
  ],
  D: [
    { id: 7, name: 'Deepak', attendance: '98%' },
    { id: 8, name: 'Disha', attendance: '91%' }
  ]
};

const DepartmentStudentAttendance = () => {
  const [activeDivision, setActiveDivision] = useState('A');
  const [data, setData] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate fetch
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, []);

  const filteredData = data[activeDivision].filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-[#8B0000] mb-8">Department Student Attendance</h1>

      {/* Division Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {['A', 'B', 'C', 'D'].map(division => (
          <button
            key={division}
            onClick={() => {
              setActiveDivision(division);
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 border-2 ${
              activeDivision === division
                ? 'bg-[#8B0000] text-white border-[#8B0000]'
                : 'bg-white text-[#8B0000] border-[#8B0000] hover:bg-[#b22222] hover:text-white'
            }`}
          >
            Division {division}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search student by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-md w-full max-w-md border border-[#8B0000] focus:ring-[#8B0000] focus:outline-none"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-lg font-semibold text-[#8B0000]">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-[#8B0000] rounded-md overflow-hidden">
            <thead className="bg-[#8B0000] text-white">
              <tr>
                <th className="p-3 border border-[#8B0000]">ID</th>
                <th className="p-3 border border-[#8B0000]">Name</th>
                <th className="p-3 border border-[#8B0000]">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(student => (
                  <tr key={student.id} className="bg-white hover:bg-gray-200">
                    <td className="p-3 border border-[#8B0000]">{student.id}</td>
                    <td className="p-3 border border-[#8B0000]">{student.name}</td>
                    <td className="p-3 border border-[#8B0000]">{student.attendance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-[#8B0000]">
                    No matching students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentStudentAttendance;
