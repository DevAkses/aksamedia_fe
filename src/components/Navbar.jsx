import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthController } from "../controllers/AuthController";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const user = AuthController.getAuthenticatedUser();

    const handleLogout = () => {
        AuthController.logout();
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center justify-center">
                    <div className="text-white text-2xl font-bold mr-6">
                        Aksamedia Test
                    </div>
                    <div className="hidden md:flex space-x-4 ">
                        <Link to="/" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link
                            to="/articles"
                            className="text-white hover:text-gray-200"
                        >
                            Articles
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-white focus:outline-none flex items-center"
                            >
                                <span className="mr-2">{user.username}</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none md:hidden"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    <Link
                        to="/"
                        onClick={toggleMenu}
                        className="block text-white hover:bg-blue-700 px-4 py-2"
                    >
                        Home
                    </Link>
                    <Link
                        to="/articles"
                        onClick={toggleMenu}
                        className="block text-white hover:bg-blue-700 px-4 py-2"
                    >
                        Articles
                    </Link>
                    {/* {user && (
                        <button
                            onClick={() => {
                                toggleMenu();
                                handleLogout();
                            }}
                            className="block text-white hover:bg-blue-700 w-full text-left px-4 py-2"
                        >
                            Logout
                        </button>
                    )} */}
                </div>
            )}
        </nav>
    );
}
