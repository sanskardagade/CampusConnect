import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import bgpic from "../assets/designlogin.jpg";

const LoginPage = ({ role }) => {
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, currentRole } = useSelector(state => state.user);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        let fields = {};
        let newErrors = {};

        if (role === "Student") {
            fields = {
                rollNum: form.rollNumber.value,
                studentName: form.studentName.value,
                password: form.password.value
            };

            if (!fields.rollNum) newErrors.rollNumber = true;
            if (!fields.studentName) newErrors.studentName = true;
        } else {
            fields = {
                email: form.email.value,
                password: form.password.value
            };

            if (!fields.email) newErrors.email = true;
        }

        if (!fields.password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoader(true);
        dispatch(loginUser(fields, role));
    };

    const handleInputChange = (event) => {
        setErrors(prev => ({ ...prev, [event.target.name]: false }));
    };

    useEffect(() => {
        if (status === 'success' || currentUser) {
            if (currentRole === 'Admin') navigate('/Admin/dashboard');
            else if (currentRole === 'Student') navigate('/Student/dashboard');
            else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, currentUser, currentRole, response, navigate]);

    return (
        <div className="flex min-h-screen">
            <div className="w-full max-w-md m-auto p-8 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-red-700 mb-4">{role} Login</h2>
                <p className="text-sm text-gray-500 mb-6">Welcome back! Please enter your details</p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {role === "Student" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                                <input type="number" name="rollNumber" onChange={handleInputChange} className={`w-full p-2 border rounded ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.rollNumber && <p className="text-red-500 text-xs">Roll Number is required</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="studentName" onChange={handleInputChange} className={`w-full p-2 border rounded ${errors.studentName ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.studentName && <p className="text-red-500 text-xs">Name is required</p>}
                            </div>
                        </>
                    )}

                    {role !== "Student" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" onChange={handleInputChange} className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input type={toggle ? "text" : "password"} name="password" onChange={handleInputChange} className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                            <button type="button" onClick={() => setToggle(!toggle)} className="absolute right-2 top-2 text-sm text-gray-600">
                                {toggle ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-red-600 hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition">
                        {loader ? "Loading..." : "Login"}
                    </button>

                    {role === "Admin" && (
                        <p className="text-sm mt-4">Don't have an account? <Link to="/Adminregister" className="text-red-600 hover:underline">Sign up</Link></p>
                    )}
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgpic})` }}></div>
            {showPopup && <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />}
        </div>
    );
}

export default LoginPage;