import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">iCRAFT</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {["Home", "Cover Letter", "FAQ"].map((item, index) => (
            <NavLink 
              key={index} 
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} 
              className={({ isActive }) => `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`}
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">Sign Up</button>
          <button className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition">Log In</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4">
          <div className="flex flex-col space-y-4 text-center">
            {["Home", "Cover Letter", "FAQ"].map((item, index) => (
              <NavLink 
                key={index} 
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} 
                className="hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </NavLink>
            ))}
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
              Sign Up
            </button>
            <button className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition">
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
