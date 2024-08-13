import React, { useState } from "react";
import { AuthController } from "../controllers/AuthController";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (AuthController.login(username, password)) {
            onLogin(username);
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Tambahkan Navbar */}
            <div className="flex-grow flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                <div className="max-w-sm w-full bg-white p-8 rounded shadow-md dark:bg-gray-900">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full pr-10 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer dark:text-gray-400"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c1.91 0 3.703.487 5.242 1.344M21.542 12.001A9.955 9.955 0 0012 19.001c-1.91 0-3.703-.487-5.242-1.344M6.75 6.75L17.25 17.25" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-.203.746-.51 1.45-.905 2.072M12 19.001c-1.91 0-3.703-.487-5.242-1.344M3.457 17.244a10.978 10.978 0 01-.905-2.072" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
