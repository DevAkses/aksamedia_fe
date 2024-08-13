// src/pages/UserProfile.js
import React, { useState } from "react";
import { UserController } from "../controllers/UserController";

export default function UserProfile() {
    const user = UserController.getAuthenticatedUser();
    const [username, setUsername] = useState(user?.username || "");

    const handleSave = () => {
        if (user) {
            const updatedUser = { ...user, username };
            UserController.updateUser(updatedUser);
            window.location.reload(); // Reload to reflect changes in the Navbar
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Save
            </button>
        </div>
    );
}
