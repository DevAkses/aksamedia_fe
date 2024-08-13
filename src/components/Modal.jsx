import React from "react";

export default function Modal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Confirm Deletion</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to delete this article?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
