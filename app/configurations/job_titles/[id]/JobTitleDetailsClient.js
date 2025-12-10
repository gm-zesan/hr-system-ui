"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function JobTitleDetailsClient({ jobTitle, onDelete }) {
    const searchParams = useSearchParams();
    const showUpdated = searchParams.get("updated") === "true";
    const toastShown = useRef(false);

    useEffect(() => {
        if (showUpdated && !toastShown.current) {
            toastShown.current = true;

            // Clean up URL parameter
            const url = new URL(window.location.href);
            url.searchParams.delete("updated");
            window.history.replaceState({}, "", url.toString());

            toast.success("Job title updated successfully!");
        }
    }, [showUpdated]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Job Position ID
                    </label>
                    <p className="text-base text-gray-900">{jobTitle.job_position_id || "-"}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                    {jobTitle.is_active ? (
                        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                            Inactive
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Created At
                    </label>
                    <p className="text-base text-gray-900">
                        {new Date(jobTitle.created_at).toLocaleString()}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Updated At
                    </label>
                    <p className="text-base text-gray-900">
                        {new Date(jobTitle.updated_at).toLocaleString()}
                    </p>
                </div>
            </div>

            {jobTitle.description && (
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Description
                    </label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap">
                        {jobTitle.description}
                    </p>
                </div>
            )}
        </div>
    );
}
