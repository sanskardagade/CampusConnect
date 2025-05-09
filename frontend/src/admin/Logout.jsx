import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white text-black flex flex-col justify-center items-center max-w-md mx-auto mt-20">
            <h1 className="text-2xl font-semibold mb-4">{currentUser.name}</h1>
            <p className="mb-6 text-lg text-center">Are you sure you want to log out?</p>
            <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded mb-3 transition duration-200"
            >
                Log Out
            </button>
            <button
                onClick={handleCancel}
                className="bg-purple-800 hover:bg-purple-900 text-white px-6 py-2 rounded transition duration-200"
            >
                Cancel
            </button>
        </div>
    );
};

export default Logout;
