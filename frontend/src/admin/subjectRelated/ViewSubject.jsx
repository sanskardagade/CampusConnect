import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState('1');

  const handleChange = (tab) => {
    setValue(tab);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  });

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </button>
      </div>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </button>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        >
          Provide Marks
        </button>
      </div>
    );
  };

  const TableTemplate = ({ columns, rows, buttonHaver: ButtonHaver }) => {
    return (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              {columns.map((column) => (
                <th 
                  key={column.id}
                  className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.id} className="py-4 px-6 text-sm text-gray-500">
                    {row[column.id]}
                  </td>
                ))}
                <td className="py-4 px-6 text-sm font-medium">
                  <ButtonHaver row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add Students
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="text-xl font-semibold mb-4">
              Students List:
            </h5>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-around items-center">
                <button
                  className={`flex flex-col items-center py-2 px-4 flex-1 ${selectedSection === 'attendance' ? 'text-red-800 font-semibold' : 'text-gray-600'}`}
                  onClick={() => handleSectionChange('attendance')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="mt-1 text-xs">Attendance</span>
                </button>
                <button
                  className={`flex flex-col items-center py-2 px-4 flex-1 ${selectedSection === 'marks' ? 'text-red-800 font-semibold' : 'text-gray-600'}`}
                  onClick={() => handleSectionChange('marks')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="mt-1 text-xs">Marks</span>
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-800 mb-6">
          Subject Details
        </h1>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">
            Subject Name: <span className="font-normal">{subjectDetails && subjectDetails.subName}</span>
          </h2>
          <h2 className="text-lg font-medium">
            Subject Code: <span className="font-normal">{subjectDetails && subjectDetails.subCode}</span>
          </h2>
          <h2 className="text-lg font-medium">
            Subject Sessions: <span className="font-normal">{subjectDetails && subjectDetails.sessions}</span>
          </h2>
          <h2 className="text-lg font-medium">
            Number of Students: <span className="font-normal">{numberOfStudents}</span>
          </h2>
          <h2 className="text-lg font-medium">
            Class Name: <span className="font-normal">{subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</span>
          </h2>
          {subjectDetails && subjectDetails.teacher ? (
            <h2 className="text-lg font-medium">
              Teacher Name: <span className="font-normal">{subjectDetails.teacher.name}</span>
            </h2>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
            >
              Add Subject Teacher
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {subloading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-800 font-medium">Loading...</div>
        </div>
      ) : (
        <div className="w-full bg-gray-50 min-h-screen">
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex">
              <button 
                className={`py-4 px-6 ${value === '1' ? 'border-b-2 border-red-800 text-red-800' : 'text-gray-500'}`}
                onClick={() => handleChange('1')}
              >
                Details
              </button>
              <button 
                className={`py-4 px-6 ${value === '2' ? 'border-b-2 border-red-800 text-red-800' : 'text-gray-500'}`}
                onClick={() => handleChange('2')}
              >
                Students
              </button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 mt-12 mb-16">
            {value === '1' && <SubjectDetailsSection />}
            {value === '2' && <SubjectStudentsSection />}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubject;