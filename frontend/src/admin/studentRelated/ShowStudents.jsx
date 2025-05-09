import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../redux/userRelated/userHandle';
import TableTemplate from '../../components/admin/TableTemplate';
import SpeedDialTemplate from '../../components/admin/SpeedDialTemplate';
import Popup from '../../components/admin/Popup';
import { FaUserPlus, FaUserMinus, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    });

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate("/Admin/students/student/attendance/" + row.id);
        };

        const handleMarks = () => {
            navigate("/Admin/students/student/marks/" + row.id);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
            if (index === 0) handleAttendance();
            if (index === 1) handleMarks();
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => deleteHandler(row.id, "Student")}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                    <FaUserMinus className="w-5 h-5" />
                </button>

                <button
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                    View
                </button>

                <div className="relative">
                    <div className="flex" ref={anchorRef}>
                        <button
                            onClick={handleClick}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-l-md transition-colors"
                        >
                            {options[selectedIndex]}
                        </button>
                        <button
                            onClick={handleToggle}
                            className="px-2 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-r-md transition-colors"
                        >
                            {open ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </div>

                    {open && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md overflow-hidden">
                            {options.map((option, index) => (
                                <button
                                    key={option}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                    className={`block w-full px-4 py-2 text-left hover:bg-red-100 dark:hover:bg-gray-600 ${
                                        index === selectedIndex ? 'bg-red-100 dark:bg-gray-600' : ''
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const actions = [
        {
            icon: <FaUserPlus className="text-blue-500" />,
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <FaUserMinus className="text-red-500" />,
            name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                </div>
            ) : (
                <>
                    {response ? (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => navigate("/Admin/addstudents")}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                            >
                                Add Students
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                            {Array.isArray(studentsList) && studentsList.length > 0 && (
                                <TableTemplate
                                    buttonHaver={StudentButtonHaver}
                                    columns={studentColumns}
                                    rows={studentRows}
                                    headerClasses="bg-red-600 dark:bg-red-800 text-white"
                                    rowClasses="hover:bg-red-50 dark:hover:bg-gray-600"
                                    cellClasses="border-b border-gray-200 dark:border-gray-600 px-4 py-2"
                                />
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </div>
                    )}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowStudents;