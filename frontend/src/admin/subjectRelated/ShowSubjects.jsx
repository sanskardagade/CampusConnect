import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    // Check if currentUser exists before dispatching actions
    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        }
    }, [currentUser, dispatch]);

    // Handle the error if currentUser is null
    if (!currentUser) {
        return <div className="text-center text-red-600">User not logged in</div>;
    }

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

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name' },
        { id: 'sessions', label: 'Sessions' },
        { id: 'sclassName', label: 'Class' },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <div className="flex space-x-2">
            <button
                onClick={() => deleteHandler(row.id, "Subject")}
                className="text-red-700 hover:text-red-900"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <button
                onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
                View
            </button>
        </div>
    );

    const TableTemplate = ({ columns, rows, buttonHaver }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-red-800 text-white">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id} className="px-6 py-3 text-left text-sm font-medium">
                                {column.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            {columns.map((column) => (
                                <td key={column.id} className="px-6 py-4 text-sm text-gray-900">
                                    {row[column.id]}
                                </td>
                            ))}
                            <td className="px-6 py-4 text-sm">
                                {buttonHaver({ row })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const SpeedDialTemplate = ({ actions }) => (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.action}
                    className="bg-red-800 text-white p-3 rounded-full shadow-lg hover:bg-red-900"
                    title={action.name}
                >
                    {action.icon}
                </button>
            ))}
        </div>
    );

    const Popup = ({ message, showPopup, setShowPopup }) => (
        showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-900 mb-4">{message}</p>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    );

    const actions = [
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>,
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <div className="container mx-auto p-4 bg-gray-100 text-gray-900">
            {loading ? (
                <div className="text-center text-gray-900">Loading...</div>
            ) : (
                <>
                    {response ? (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Add Subjects
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
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

export default ShowSubjects;
