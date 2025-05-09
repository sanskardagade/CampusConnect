import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#4b0000] text-white shadow-md w-full">
      <div className="w-full px-2 sm:px-4 py-3 flex justify-between items-center">
        {/* Logo on Left */}
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          CampusConnect
        </Link>

        {/* Right Side Menu - Desktop */}
        <div className="hidden md:flex items-center gap-8 sm:gap-6 ml-auto">
          {/* <Link to="/dashboard/student" className="hover:text-red-300">Dashboard</Link> */}
          <Link to="/features" className="hover:text-red-300">Features</Link>
          <Link to="/about" className="hover:text-red-300">About</Link>
          <Link to="/contact" className="hover:text-red-300">Contact</Link>
          <Link
            to="/signin"
            className="bg-red-700 px-3 py-2 rounded-lg hover:bg-red-800 transition text-sm"
          >
            Sign In
          </Link>
          <FaUserCircle size={22} className="cursor-pointer" />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#4b0000] px-4 pb-4 space-y-3">
          {/* <Link to="/dashboard/student" className="block hover:text-red-300">Dashboard</Link> */}
          <Link to="/features" className="block hover:text-red-300">Features</Link>
          <Link to="/about" className="block hover:text-red-300">About</Link>
          <Link to="/contact" className="block hover:text-red-300">Contact</Link>
          <Link
            to="/signin"
            className="block bg-red-700 px-4 py-2 rounded-lg hover:bg-red-800"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
