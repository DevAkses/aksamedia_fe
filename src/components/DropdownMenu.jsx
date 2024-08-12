import React from "react";

export default function DropdownMenu({ onLogout }) {
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
            >
                Logout
            </button>
        </div>
    );
}
