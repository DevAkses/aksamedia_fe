import React from "react";

export default function Modal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Confirmation</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
