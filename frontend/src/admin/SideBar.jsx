import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons from react-icons (replacing Material UI icons)
import { FiHome, FiUser, FiLogOut, FiBook, FiUsers, FiAlertCircle, FiFileText, FiUserCheck, FiMessageSquare } from 'react-icons/fi';

const SideBar = () => {
    const location = useLocation();

    return (
        <div className="h-full bg-white shadow-lg w-64 flex flex-col">
            {/* Main Navigation */}
            <div className="flex flex-col">
                <Link
                    to="/Admin"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname === '/Admin' || location.pathname === '/Admin/dashboard'
                            ? 'text-red-900 bg-red-100'
                            : 'text-gray-700'
                    }`}
                >
                    <FiHome className="mr-3 text-xl" />
                    <span className="text-base font-medium">Home</span>
                </Link>
                <Link
                    to="/Admin/classes"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/classes') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiBook className="mr-3 text-xl" />
                    <span className="text-base font-medium">Classes</span>
                </Link>
                <Link
                    to="/Admin/subjects"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/subjects') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiFileText className="mr-3 text-xl" />
                    <span className="text-base font-medium">Subjects</span>
                </Link>
                <Link
                    to="/Admin/teachers"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/teachers') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiUserCheck className="mr-3 text-xl" />
                    <span className="text-base font-medium">Teachers</span>
                </Link>
                <Link
                    to="/Admin/students"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/students') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiUsers className="mr-3 text-xl" />
                    <span className="text-base font-medium">Students</span>
                </Link>
                <Link
                    to="/Admin/notices"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/notices') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiMessageSquare className="mr-3 text-xl" />
                    <span className="text-base font-medium">Notices</span>
                </Link>
                <Link
                    to="/Admin/complains"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/complains') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiAlertCircle className="mr-3 text-xl" />
                    <span className="text-base font-medium">Complains</span>
                </Link>
            </div>

            {/* Divider */}
            <hr className="my-2 border-gray-200" />

            {/* User Section */}
            <div className="flex flex-col">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500">User</div>
                <Link
                    to="/Admin/profile"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/profile') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiUser className="mr-3 text-xl" />
                    <span className="text-base font-medium">Profile</span>
                </Link>
                <Link
                    to="/Admin/logout"
                    className={`flex items-center p-4 hover:bg-red-50 ${
                        location.pathname.startsWith('/Admin/logout') ? 'text-red-900 bg-red-100' : 'text-gray-700'
                    }`}
                >
                    <FiLogOut className="mr-3 text-xl" />
                    <span className="text-base font-medium">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default SideBar;