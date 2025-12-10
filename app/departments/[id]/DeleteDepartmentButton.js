"use client";

import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteDepartmentButton({ departmentId, departmentName, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error("Delete failed:", error);
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Delete Button */}
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
                <Trash2 className="w-4 h-4" />
                Delete
            </button>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => !isDeleting && setShowModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        {/* Close Button */}
                        <button
                            onClick={() => !isDeleting && setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            disabled={isDeleting}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Delete Department
                                </h3>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="mb-6">
                            <p className="text-gray-600 mb-3">
                                Are you sure you want to delete the department{" "}
                                <span className="font-semibold text-gray-900">
                                    &ldquo;{departmentName}&rdquo;
                                </span>
                                ?
                            </p>
                            <p className="text-sm text-red-600 font-medium">
                                This action cannot be undone.
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
