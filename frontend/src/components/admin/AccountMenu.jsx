import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiSettings, FiLogOut, FiUser } from 'react-icons/fi';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Optional fallback for user initial
    const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : '?';

    return (
        <div className="relative">
            <div className="flex items-center text-center">
                <button
                    onClick={handleClick}
                    className="ml-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center">
                        {userInitial}
                    </div>
                </button>
            </div>

            {open && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        {/* Profile */}
                        <div className="px-4 py-2 flex items-center hover:bg-red-50">
                            <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center mr-2">
                                <FiUser className="w-4 h-4" />
                            </div>
                            <Link 
                                to={`/${currentRole}/profile`} 
                                className="text-gray-700 hover:text-red-700"
                                onClick={handleClose}
                            >
                                Profile
                            </Link>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        {/* Settings */}
                        <button 
                            className="w-full text-left px-4 py-2 flex items-center hover:bg-red-50 text-gray-700 hover:text-red-700"
                            onClick={handleClose}
                        >
                            <FiSettings className="w-4 h-4 mr-2 text-gray-500" />
                            Settings
                        </button>

                        {/* Logout */}
                        <div className="px-4 py-2 flex items-center hover:bg-red-50">
                            <FiLogOut className="w-4 h-4 mr-2 text-gray-500" />
                            <Link 
                                to="/logout" 
                                className="text-gray-700 hover:text-red-700"
                                onClick={handleClose}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
    