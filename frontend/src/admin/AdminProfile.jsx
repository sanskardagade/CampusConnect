import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../redux/userRelated/userSlice';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    const [showTab, setShowTab] = useState(false);
    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser?.schoolName || "");

    // Only update fields if currentUser exists
    const fields = password === "" 
        ? { name, email, schoolName } 
        : { name, email, password, schoolName };

    // Ensuring currentUser exists before rendering
    useEffect(() => {
        if (!currentUser) {
            // Redirect or show an error message if currentUser is not found
            navigate("/login"); // or show an error modal
        }
    }, [currentUser, navigate]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (currentUser) {
            dispatch(updateUser(fields, currentUser._id, address));
        }
    };

    const deleteHandler = () => {
        if (currentUser) {
            try {
                dispatch(deleteUser(currentUser._id, "Students"));
                dispatch(deleteUser(currentUser._id, address));
                dispatch(authLogout());
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {currentUser ? (
                <>
                    <h2 className="text-3xl font-semibold text-red-900 mb-4">Admin Profile</h2>
                    <p className="mb-2"><span className="font-medium text-red-900">Name:</span> {currentUser.name}</p>
                    <p className="mb-2"><span className="font-medium text-red-900">Email:</span> {currentUser.email}</p>
                    <p className="mb-4"><span className="font-medium text-red-900">School:</span> {currentUser.schoolName}</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={deleteHandler}
                            className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition"
                        >
                            Delete Account
                        </button>
                        <button
                            onClick={() => setShowTab(!showTab)}
                            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition"
                        >
                            {showTab ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {showTab && (
                        <form onSubmit={submitHandler} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">School Name</label>
                                <input
                                    type="text"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                                    placeholder="Leave empty to keep current password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-red-900 text-white rounded hover:bg-red-800 transition"
                            >
                                Update Profile
                            </button>
                        </form>
                    )}
                </>
            ) : (
                <div className="text-center">Loading...</div>
            )}
        </div>
    );
};

export default AdminProfile;
