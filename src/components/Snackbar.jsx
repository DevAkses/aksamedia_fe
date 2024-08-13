import React from "react";

export default function Snackbar({ message, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 dark:bg-green-700 dark:text-gray-100">
            <p>{message}</p>
            <button onClick={onClose} className="absolute top-1 right-1 text-white dark:text-gray-100">
                &times;
            </button>
        </div>
    );
}
