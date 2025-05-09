import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../redux/sclassRelated/sclassHandle";
// import { deleteUser } from '../../redux/userRelated/userHandle';
// import { resetSubjects } from "../../redux/sclassRelated/sclassSlice";
// import { BlueButton, GreenButton, PurpleButton } from "../../components/admin/buttonStyles";
import TableTemplate from "../../components/admin/TableTemplate";
import SpeedDialTemplate from "../../components/admin/SpeedDialTemplate";
import Popup from "../../components/admin/Popup";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');
    const handleChange = (newValue) => setValue(newValue);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name' },
        { id: 'code', label: 'Subject Code' },
    ];

    const subjectRows = subjectsList?.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <div className="flex gap-2">
            <button onClick={() => deleteHandler(row.id, "Subject")} className="text-red-500 hover:text-red-700">Delete</button>
            <button onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
        </div>
    );

    const subjectActions = [
        {
            icon: "➕", name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: "❌", name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => (
        <div className="mt-4">
            {response ? (
                <div className="text-right">
                    <button onClick={() => navigate("/Admin/addsubject/" + classID)} className="bg-green-500 text-white px-4 py-2 rounded">Add Subjects</button>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-2">Subjects List:</h2>
                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    <SpeedDialTemplate actions={subjectActions} />
                </>
            )}
        </div>
    );

    const studentColumns = [
        { id: 'name', label: 'Name' },
        { id: 'rollNum', label: 'Roll Number' },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => (
        <div className="flex gap-2">
            <button onClick={() => deleteHandler(row.id, "Student")} className="text-red-500 hover:text-red-700">Remove</button>
            <button onClick={() => navigate("/Admin/students/student/" + row.id)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
            <button onClick={() => navigate("/Admin/students/student/attendance/" + row.id)} className="bg-purple-600 text-white px-2 py-1 rounded">Attendance</button>
        </div>
    );

    const studentActions = [
        {
            icon: "➕", name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: "❌", name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => (
        <div className="mt-4">
            {getresponse ? (
                <div className="text-right">
                    <button onClick={() => navigate("/Admin/class/addstudents/" + classID)} className="bg-green-500 text-white px-4 py-2 rounded">Add Students</button>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-2">Students List:</h2>
                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                    <SpeedDialTemplate actions={studentActions} />
                </>
            )}
        </div>
    );

    const ClassTeachersSection = () => <div>Teachers</div>;

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-center">Class Details</h1>
                <p className="text-xl">This is Class {sclassDetails?.sclassName}</p>
                <p className="text-lg">Number of Subjects: {numberOfSubjects}</p>
                <p className="text-lg">Number of Students: {numberOfStudents}</p>
                {getresponse && (
                    <button onClick={() => navigate("/Admin/class/addstudents/" + classID)} className="bg-green-500 text-white px-4 py-2 rounded">Add Students</button>
                )}
                {response && (
                    <button onClick={() => navigate("/Admin/addsubject/" + classID)} className="bg-green-500 text-white px-4 py-2 rounded">Add Subjects</button>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow p-2">
                        <div className="flex gap-4 border-b border-gray-300 dark:border-gray-600">
                            <button className={`px-4 py-2 ${value === '1' ? 'bg-red-600 text-white' : 'text-red-600'}`} onClick={() => handleChange('1')}>Details</button>
                            <button className={`px-4 py-2 ${value === '2' ? 'bg-red-600 text-white' : 'text-red-600'}`} onClick={() => handleChange('2')}>Subjects</button>
                            <button className={`px-4 py-2 ${value === '3' ? 'bg-red-600 text-white' : 'text-red-600'}`} onClick={() => handleChange('3')}>Students</button>
                            <button className={`px-4 py-2 ${value === '4' ? 'bg-red-600 text-white' : 'text-red-600'}`} onClick={() => handleChange('4')}>Teachers</button>
                        </div>
                    </div>
                    <div className="mt-6">
                        {value === '1' && <ClassDetailsSection />}
                        {value === '2' && <ClassSubjectsSection />}
                        {value === '3' && <ClassStudentsSection />}
                        {value === '4' && <ClassTeachersSection />}
                    </div>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ClassDetails;
