import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#4b0000] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* CampusConnect Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">CampusConnect</h2>
          <p className="text-sm text-gray-300">
            Bridging the gap between students and institutions with a smart and collaborative platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-300">Home</Link></li>
            {/* <li><Link to="/dashboard/student" className="hover:text-red-300">Dashboard</Link></li> */}
            <li><Link to="/features" className="hover:text-red-300">Features</Link></li>
            <li><Link to="/contact" className="hover:text-red-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Email: atul.kathole@dypvp.edu.in</li>
            <li>Email: suvarna.patil@dypvp.edu.in</li>
            <li>Address: DYPIT , Pimpri</li>
          </ul>
        </div>

        {/* Newsletter Signup + Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} CampusConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
