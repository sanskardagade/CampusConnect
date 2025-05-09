import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../redux/userRelated/userHandle';
import { underControl } from '../../redux/userRelated/userSlice';
import Popup from '../../components/admin/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <div className="container mx-auto p-4 bg-gray-100 text-gray-900">
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-red-800">Add Subjects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject Name"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
                                    value={subject.subName}
                                    onChange={handleSubjectNameChange(index)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject Code"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
                                    value={subject.subCode}
                                    onChange={handleSubjectCodeChange(index)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Sessions"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
                                    value={subject.sessions}
                                    onChange={handleSessionsChange(index)}
                                    required
                                />
                            </div>
                            <div className="flex items-end">
                                {index === 0 ? (
                                    <button
                                        type="button"
                                        onClick={handleAddSubject}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Add Subject
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleRemoveSubject(index)}
                                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900 disabled:bg-red-600 disabled:cursor-not-allowed flex items-center"
                            disabled={loader}
                        >
                            {loader ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </div>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </form>
        </div>
    );
};

export default SubjectForm;