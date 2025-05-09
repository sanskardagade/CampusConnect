import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Users, UserPlus } from 'lucide-react';

const Divisions = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Simulating axios with fetch since we're in a sandbox
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                { name: "Alex Johnson", rollNumber: "CS101", division: "A" },
                { name: "Jamie Smith", rollNumber: "CS102", division: "A" },
                { name: "Taylor Brown", rollNumber: "CS103", division: "A" },
                { name: "Morgan Davis", rollNumber: "CS104", division: "A" },
                { name: "Casey Wilson", rollNumber: "CS201", division: "B" },
                { name: "Jordan Miller", rollNumber: "CS202", division: "B" },
                { name: "Riley Jones", rollNumber: "CS203", division: "B" },
                { name: "Quinn Thomas", rollNumber: "CS204", division: "B" },
                { name: "Avery Martin", rollNumber: "CS301", division: "C" },
                { name: "Charlie Moore", rollNumber: "CS302", division: "C" },
                { name: "Dakota Lewis", rollNumber: "CS303", division: "C" },
                { name: "Sam Clark", rollNumber: "CS30", division: "C" },
                { name: "Drew Adams", rollNumber: "CS41", division: "D" },
                { name: "Ellis Scott", rollNumber: "CE02", division: "D" },
                { name: "Finley Hall", rollNumber: "CE03", division: "D" },
                { name: "Harper Young", rollNumber: "C404", division: "D" }
              ]
            });
          }, 800);
        });
        setStudents(response.data);
      } catch (err) {
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filterStudents = (division) => {
    setActiveFilter(division);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = activeFilter === 'all' || student.division === activeFilter;
    return matchesSearch && matchesDivision;
  });

  const divisions = ['A', 'B', 'C', 'D'];
  const divisionCounts = divisions.reduce((acc, div) => {
    acc[div] = students.filter(s => s.division === div).length;
    return acc;
  }, {});

  const renderDivision = (division) => {
    const divisionStudents = filteredStudents.filter(student => student.division === division);
    
    if (activeFilter !== 'all' && activeFilter !== division) {
      return null;
    }

    if (divisionStudents.length === 0) {
      return null;
    }

    return (
      <div key={division} className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center text-white mr-2">
            <Users size={16} />
          </div>
          <h2 className="text-xl font-bold text-red-900">Division {division}</h2>
          <span className="ml-2 text-gray-500 text-sm">({divisionStudents.length} students)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {divisionStudents.map((student, idx) => (
            <div 
              key={idx} 
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-red-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-red-800">{student.division}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6 px-4 shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Computer Engineering - Divisions</h1>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-2 rounded-lg border border-red-700 bg-red-800 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-3 top-2.5 text-red-200">
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="focus:outline-none">
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="flex space-x-1 bg-red-800 p-1 rounded-lg self-center">
              <button
                onClick={() => filterStudents('all')}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  activeFilter === 'all' ? 'bg-white text-red-900 font-medium' : 'text-red-100 hover:bg-red-700'
                }`}
              >
                All
              </button>
              {divisions.map(div => (
                <button
                  key={div}
                  onClick={() => filterStudents(div)}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${
                    activeFilter === div ? 'bg-white text-red-900 font-medium' : 'text-red-100 hover:bg-red-700'
                  }`}
                >
                  Div {div} ({divisionCounts[div]})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-10 w-10 text-red-800 animate-spin mb-4" />
            <p className="text-red-800">Loading student data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
            <AlertCircle className="h-6 w-6 text-red-800 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No students found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveFilter('all');}}
              className="mt-2 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            {divisions.map(renderDivision)}
          </div>
        )}

        <div className="mt-8 bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-2">
            <UserPlus className="h-5 w-5 text-red-800 mr-2" />
            <h3 className="text-lg font-medium text-red-900">Quick Stats</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {divisions.map(div => (
              <div key={div} className="bg-red-50 p-3 rounded-md border border-red-100">
                <p className="text-sm text-gray-600">Division {div}</p>
                <p className="text-xl font-bold text-red-900">{divisionCounts[div]} students</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divisions;


// import React, { useEffect, useState } from "react";

// const Divisions = () => {

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/faculty/divisions") // Updated backend route
//       .then(res => res.json())
//       .then(data => setUsers(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Faculty Users</h2>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>{user.name}</li> // Adjust based on your data structure
//         ))}
//       </ul>
//     </div>
//   )
// }
 

// export default Divisions;
