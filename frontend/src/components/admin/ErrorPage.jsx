import React from 'react';

const ErrorPage = () => {
    return (
        <div 
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: "url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                fontFamily: "'Josefin Sans', sans-serif"
            }}
        >
            <div className="max-w-3xl p-8 mx-4 bg-white bg-opacity-90 rounded-lg shadow-xl backdrop-blur-sm">
                <h1 className="mb-10 text-3xl md:text-4xl font-bold text-red-900">
                    Oops, something went wrong
                </h1>
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;