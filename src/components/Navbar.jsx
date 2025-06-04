import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cover Letter", path: "/cover-letter" },
    { name: "FAQ", path: "/faq" }
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link className="cursor-pointer" to='/'>iCRAFT</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-yellow-400 transition ${
                  isActive ? "text-yellow-400 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
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
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
