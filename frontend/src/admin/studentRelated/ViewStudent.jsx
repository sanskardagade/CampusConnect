import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/admin/attendanceCalculator';
import CustomBarChart from '../../components/admin/CustomBarChart';
import CustomPieChart from '../../components/admin/CustomPieChart';
import Popup from '../../components/admin/Popup';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const params = useParams();1
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [value, setValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('table');

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password };

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Attendance:</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sessions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Percentage</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                return (
                                    <tbody key={index} className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">{subName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{present}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{sessions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{subjectAttendancePercentage}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                <button
                                                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded"
                                                    onClick={() => handleOpen(subId)}
                                                >
                                                    {openStates[subId] ? '▲' : '▼'} Details
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => removeSubAttendance(subId)}
                                                >
                                                    🗑️
                                                </button>
                                                <button
                                                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded"
                                                    onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                                                >
                                                    Change
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4">
                                                <div className={`transition-all duration-300 ${openStates[subId] ? 'block' : 'hidden'}`}>
                                                    <div className="ml-4 mt-2">
                                                        <h4 className="text-lg font-medium">Attendance Details</h4>
                                                        <table className="min-w-full divide-y divide-gray-200 mt-2">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {allData.map((data, index) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-6 py-4 whitespace-nowrap">{dateString}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap">{data.status}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>
                    <div className="mt-4">
                        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                    </div>
                    <div className="space-x-4 mt-4">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
                        >
                            Delete All
                        </button>
                        <button
                            className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                        >
                            Add Attendance
                        </button>
                    </div>
                </div>
            );
        };

        const renderChartSection = () => {
            return (
                <div className="mt-4">
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </div>
            );
        };

        return (
            <div>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                    <div>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
                            <div className="flex justify-center">
                                <button
                                    className={`px-4 py-2 ${selectedSection === 'table' ? 'bg-red-800 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleSectionChange('table')}
                                >
                                    Table
                                </button>
                                <button
                                    className={`px-4 py-2 ${selectedSection === 'chart' ? 'bg-red-800 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleSectionChange('chart')}
                                >
                                    Chart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                        onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                    >
                        Add Attendance
                    </button>
                )}
            </div>
        );
    };

    const StudentMarksSection = () => {
        const renderTableSection = () => {
            return (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Subject Marks:</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {subjectMarks.map((result, index) => {
                                    if (!result.subName || !result.marksObtained) return null;
                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.subName.subName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.marksObtained}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button
                        className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                        onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                    >
                        Add Marks
                    </button>
                </div>
            );
        };

        const renderChartSection = () => {
            return (
                <div className="mt-4">
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </div>
            );
        };

        return (
            <div>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                    <div>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
                            <div className="flex justify-center">
                                <button
                                    className={`px-4 py-2 ${selectedSection === 'table' ? 'bg-red-800 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleSectionChange('table')}
                                >
                                    Table
                                </button>
                                <button
                                    className={`px-4 py-2 ${selectedSection === 'chart' ? 'bg-red-800 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleSectionChange('chart')}
                                >
                                    Chart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                        onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                    >
                        Add Marks
                    </button>
                )}
            </div>
        );
    };

    const StudentDetailsSection = () => {
        return (
            <div className="space-y-4 p-4 bg-white rounded-lg shadow">
                <div className="text-lg">
                    <p><span className="font-semibold">Name:</span> {userDetails.name}</p>
                    <p><span className="font-semibold">Roll Number:</span> {userDetails.rollNum}</p>
                    <p><span className="font-semibold">Class:</span> {sclassName.sclassName}</p>
                    <p><span className="font-semibold">School:</span> {studentSchool.schoolName}</p>
                </div>
                
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                    <div className="mt-4">
                        <CustomPieChart data={chartData} />
                    </div>
                )}
                
                <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    onClick={deleteHandler}
                >
                    Delete
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div>Loading...</div>
                </div>
            ) : (
                <div className="container mx-auto py-8">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="border-b border-gray-200">
                            <div className="flex space-x-4 px-4">
                                <button
                                    className={`py-4 px-2 font-medium ${value === '1' ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-500'}`}
                                    onClick={() => setValue('1')}
                                >
                                    Details
                                </button>
                                <button
                                    className={`py-4 px-2 font-medium ${value === '2' ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-500'}`}
                                    onClick={() => setValue('2')}
                                >
                                    Attendance
                                </button>
                                <button
                                    className={`py-4 px-2 font-medium ${value === '3' ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-500'}`}
                                    onClick={() => setValue('3')}
                                >
                                    Marks
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            {value === '1' && <StudentDetailsSection />}
                            {value === '2' && <StudentAttendanceSection />}
                            {value === '3' && <StudentMarksSection />}
                        </div>
                    </div>
                </div>
            )}
            
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ViewStudent;