import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userRelated/userHandle';
import Popup from '../components/admin/Popup';

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Left Panel - Form */}
            <div className="w-full md:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-red-900 mb-2">Admin Register</h2>
                    <p className="text-gray-600">
                        Create your own school by registering as an admin. You will be able to add students and faculty and manage the system.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Admin Name Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your Name</label>
                        <input
                            type="text"
                            name="adminName"
                            placeholder="Enter your name"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                adminNameError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            onChange={handleInputChange}
                        />
                        {adminNameError && <p className="mt-1 text-sm text-red-600">Name is required</p>}
                    </div>

                    {/* School Name Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">College Name</label>
                        <input
                            type="text"
                            name="schoolName"
                            placeholder="Create your school name"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                schoolNameError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            onChange={handleInputChange}
                        />
                        {schoolNameError && <p className="mt-1 text-sm text-red-600">College name is required</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                emailError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            onChange={handleInputChange}
                        />
                        {emailError && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={toggle ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                    passwordError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-red-700"
                                onClick={() => setToggle(!toggle)}
                            >
                                {toggle ? (
                                    <span className="material-icons-outlined">visibility_off</span>
                                ) : (
                                    <span className="material-icons-outlined">visibility</span>
                                )}
                            </button>
                        </div>
                        {passwordError && <p className="mt-1 text-sm text-red-600">Password is required</p>}
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-gray-700">
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-red-900 hover:bg-red-800 text-white font-medium rounded-lg transition duration-200 flex justify-center items-center"
                        disabled={loader}
                    >
                        {loader ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Register'
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/Adminlogin" className="text-red-700 hover:text-red-800 font-medium hover:underline">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden md:block md:w-3/5 bg-red-900 bg-opacity-10">
                <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/designlogin.jpg')" }}
                ></div>
            </div>

            {/* Popup Component */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default AdminRegisterPage;