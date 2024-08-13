import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthController } from "../controllers/AuthController";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const navigate = useNavigate();
    const user = AuthController.getAuthenticatedUser();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md dark:bg-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center justify-center">
                    <div className="text-white text-2xl font-bold mr-6 dark:text-gray-100">
                        Aksamedia Test
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="text-white hover:text-gray-200 dark:hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/articles" className="text-white hover:text-gray-200 dark:hover:text-gray-300">
                            Articles
                        </Link>
                        <Link to="/user-profile" className="text-white hover:text-gray-200 dark:hover:text-gray-300">
                            Profile
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="toggle-wrapper">
                        <label className="toggle">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} aria-label="Toggle Dark Mode" />
                            <span className={`slider round ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <span className={`icon ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {darkMode ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1M12 20v1M4.22 4.22l.71.71M18.36 18.36l.71.71M1 12h1M20 12h1M4.22 19.78l.71-.71M18.36 5.64l.71-.71" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                                        </svg>
                                    )}
                                </span>
                            </span>
                        </label>
                    </div>
                    {user && (
                        <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-white focus:outline-none flex items-center"
                            aria-expanded={dropdownOpen}
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
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 dark:bg-gray-700">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
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
                        aria-expanded={menuOpen}
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
                        className="block text-white hover:bg-blue-700 px-4 py-2 dark:hover:bg-blue-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/articles"
                        onClick={toggleMenu}
                        className="block text-white hover:bg-blue-700 px-4 py-2 dark:hover:bg-blue-600"
                    >
                        Articles
                    </Link>
                    <Link
                        to="/user-profile"
                        onClick={toggleMenu}
                        className="block text-white hover:bg-blue-700 px-4 py-2 dark:hover:bg-blue-600"
                    >
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
}
