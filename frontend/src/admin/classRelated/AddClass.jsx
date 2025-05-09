import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addStuff} from '../../redux/userRelated/userHandle'
import { underControl } from '../../redux/userRelated/userSlice';
import Popup from "../../components/admin/Popup";
// import Classroom from "../../assets/admin/classroom.png";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
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
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-white">
                <div className="bg-white border border-gray-300 shadow-lg rounded-md p-8 max-w-lg w-full">
                    <div className="flex justify-center mb-6">
                        <img
                            src={Classroom}
                            alt="classroom"
                            className="w-4/5"
                        />
                    </div>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Create a class</label>
                            <input
                                type="text"
                                value={sclassName}
                                onChange={(e) => setSclassName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full py-2 bg-red-700 text-white font-semibold rounded hover:bg-red-800 transition duration-300"
                        >
                            {loader ? <span className="loader small"></span> : "Create"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-full py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-300"
                        >
                            Go Back
                        </button>
                    </form>
                </div>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddClass;
