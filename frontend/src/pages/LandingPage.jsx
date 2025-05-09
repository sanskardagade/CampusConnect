import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
  // import CollegeImg from "../assets/dit.jpeg"; // Adjust the image path if needed.
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen">
{/* Full Screen Image Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="relative w-full min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: `url(https://images.shiksha.com/mediadata/images/1744799227phpyYTD3H.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Overlay for Content Visibility */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Centered Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-4">
    <h1 className="text-5xl font-extrabold mb-4 text-center">Welcome to CampusConnect</h1>
    <p className="text-lg text-gray-200 mb-6 text-center">
      CampusConnect is your all-in-one platform for academic collaboration and campus life.
    </p>

    <button
      onClick={() => navigate("/signup")}
      className="px-8 py-3 bg-white text-red-800 rounded-full hover:bg-gray-100 transition font-semibold"
    >
      Get Started
    </button>
  </div>
</motion.div>

      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
