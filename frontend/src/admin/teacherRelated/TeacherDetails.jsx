import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {loading ? (
                <div className="text-2xl text-red-900">Loading...</div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-red-900 text-center mb-6">
                        Teacher Details
                    </h1>
                    <h2 className="text-xl text-red-900 mb-4">
                        Teacher Name: {teacherDetails?.name}
                    </h2>
                    <h2 className="text-xl text-red-900 mb-4">
                        Class Name: {teacherDetails?.teachSclass?.sclassName}
                    </h2>
                    {isSubjectNamePresent ? (
                        <>
                            <h2 className="text-xl text-red-900 mb-4">
                                Subject Name: {teacherDetails?.teachSubject?.subName}
                            </h2>
                            <h2 className="text-xl text-red-900 mb-4">
                                Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                            </h2>
                        </>
                    ) : (
                        <button
                            className="w-full bg-red-900 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
                            onClick={handleAddSubject}
                        >
                            Add Subject
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherDetails;