import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../../redux/userRelated/userSlice';
import { underStudentControl } from '../../redux/studentRelated/studentSlice';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
                dispatch(underControl());
                dispatch(underStudentControl());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showPopup, dispatch, setShowPopup]);

    return (
        showPopup && (
            <div className="fixed top-4 right-4 z-50">
                <div
                    className={`max-w-sm w-full px-4 py-3 rounded shadow-lg text-white text-sm font-medium
                        ${message === "Done Successfully" ? 'bg-green-600' : 'bg-red-600'}`}
                >
                    {message}
                    <button
                        onClick={() => {
                            setShowPopup(false);
                            dispatch(underControl());
                            dispatch(underStudentControl());
                        }}
                        className="float-right ml-4 font-bold text-white hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>
            </div>
        )
    );
};

export default Popup;
