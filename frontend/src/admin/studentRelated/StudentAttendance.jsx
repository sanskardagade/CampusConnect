import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../redux/studentRelated/studentHandle';
import Popup from '../../components/admin/Popup';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id;
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation, params, dispatch]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails, situation]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("error");
        }
        else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        }
    }, [response, statestatus, error]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                    <div className="mb-6 space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Student Name: <span className="text-red-600 dark:text-red-400">{userDetails.name}</span>
                        </h2>
                        {currentUser.teachSubject && (
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Subject Name: <span className="text-red-600 dark:text-red-400">{currentUser.teachSubject?.subName}</span>
                            </h2>
                        )}
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {situation === "Student" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Select Subject
                                </label>
                                <select
                                    value={subjectName}
                                    onChange={changeHandler}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjectsList ? (
                                        subjectsList.map((subject, index) => (
                                            <option key={index} value={subject.subName}>
                                                {subject.subName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Add Subjects For Attendance</option>
                                    )}
                                </select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Attendance Status
                            </label>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-600 dark:text-white"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Select Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                                loader 
                                    ? 'bg-red-400 dark:bg-red-700 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900'
                            }`}
                        >
                            {loader ? (
                                <div className="flex justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>

                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </div>
            )}
        </div>
    );
};

export default StudentAttendance;