import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import Popup from '../../components/admin/Popup';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        // Ensure currentUser is available before dispatching
        if (currentUser) {
            dispatch(getAllTeachers(currentUser._id));
        }
    }, [currentUser, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [showSpeedDial, setShowSpeedDial] = useState(false);

    if (loading) {
        return <div className="flex justify-center items-center h-40 text-red-800 font-medium">Loading...</div>;
    } else if (response) {
        return (
            <div className="flex justify-end mt-4">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => navigate("/Admin/teachers/chooseclass")}
                >
                    Add Teacher
                </button>
            </div>
        );
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRows = rows.slice(startIndex, endIndex);

    const actions = [
        {
            icon: "UserPlus",
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: "UserMinus",
            name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser?._id, "Teachers")
        },
    ];

    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-red-800">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayedRows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (column.id === 'teachSubject') {
                                        return (
                                            <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {value ? (
                                                    value
                                                ) : (
                                                    <button
                                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                                        onClick={() => {
                                                            navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                        }} >
                                                        Add Subject
                                                    </button>
                                                )}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {value}
                                        </td>
                                    );
                                })}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-colors duration-200"
                                            onClick={() => deleteHandler(row.id, "Teacher")}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${page === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(Math.min(Math.ceil(rows.length / rowsPerPage) - 1, page + 1))}
                        disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                        className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${page >= Math.ceil(rows.length / rowsPerPage) - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(endIndex, rows.length)}</span> of{' '}
                            <span className="font-medium">{rows.length}</span> results
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                                className="rounded border-gray-300 text-sm"
                            >
                                {[5, 10, 25, 100].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Speed Dial */}
            <div className="fixed right-6 bottom-6">
                <div className="relative">
                    <button
                        onClick={() => setShowSpeedDial(!showSpeedDial)}
                        className="w-14 h-14 rounded-full bg-red-800 text-white flex items-center justify-center shadow-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" />
                        </svg>
                    </button>
                    {showSpeedDial && (
                        <div className="absolute bottom-16 right-0 space-y-2">
                            {actions.map((action, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-xl rounded-lg flex items-center space-x-2 p-4 cursor-pointer hover:bg-gray-100"
                                    onClick={action.action}
                                >
                                    <span className="text-xs font-semibold">{action.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Popup for error */}
            {showPopup && <Popup message={message} />}
        </div>
    );
};

export default ShowTeachers;
