"use client";

import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function JobPositionDetailsClient({ jobPosition, showUpdatedToast, onDelete }) {
    const toastShown = useRef(false);

    useEffect(() => {
        if (showUpdatedToast && !toastShown.current) {
            toastShown.current = true;

            const url = new URL(window.location.href);
            url.searchParams.delete("updated");
            window.history.replaceState({}, "", url.toString());

            toast.success("Job position updated successfully!");
        }
    }, [showUpdatedToast]);

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* General Information Section */}
                <div className="p-8">
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Title
                            </label>
                            <p className="text-gray-900 font-medium">{jobPosition.title || "-"}</p>
                        </div>

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Code
                            </label>
                            <p className="text-gray-900 font-medium">{jobPosition.code || "-"}</p>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Department
                            </label>
                            <p className="text-gray-900 font-medium">
                                {jobPosition.department_id
                                    ? `Department ID: ${jobPosition.department_id}`
                                    : "-"}
                            </p>
                        </div>

                        {/* Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Level
                            </label>
                            <p className="text-gray-900 font-medium">{jobPosition.level || "-"}</p>
                        </div>

                        {/* Active Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Active Status
                            </label>
                            <p className="text-gray-900 font-medium">
                                {jobPosition.is_active ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Inactive
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Created At */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Created At
                            </label>
                            <p className="text-gray-900 font-medium">
                                {new Date(jobPosition.created_at).toLocaleString()}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Description
                            </label>
                            <p className="text-gray-900">{jobPosition.description || "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
