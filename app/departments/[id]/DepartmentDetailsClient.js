"use client";

import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import DeleteDepartmentButton from "./DeleteDepartmentButton";
import { useRouter } from "next/navigation";

export default function DepartmentDetailsClient({ department, showUpdatedToast, onDelete }) {
    const toastShown = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (showUpdatedToast && !toastShown.current) {
            toastShown.current = true;

            // Clean up URL parameter
            const url = new URL(window.location.href);
            url.searchParams.delete("updated");
            window.history.replaceState({}, "", url.toString());

            toast.success("Department updated successfully!");
        }
    }, [showUpdatedToast]);

    const handleDelete = async () => {
        try {
            await onDelete();
            // Redirect is handled by the server action
        } catch (error) {
            // Filter out NEXT_REDIRECT errors (they're expected from redirect())
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to delete department");
        }
    };

    return (
        <>
            {/* Action Buttons */}
            <div className="mb-6 flex justify-end">
                <DeleteDepartmentButton
                    departmentId={department.id}
                    departmentName={department.name}
                    onDelete={handleDelete}
                />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* General Information Section */}
                <div className="p-8">
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Name
                            </label>
                            <p className="text-gray-900 font-medium">{department.name || "-"}</p>
                        </div>

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Code
                            </label>
                            <p className="text-gray-900 font-medium">{department.code || "-"}</p>
                        </div>

                        {/* Parent Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Parent Department
                            </label>
                            <p className="text-gray-900 font-medium">
                                {department.parent_department_id
                                    ? `Department ID: ${department.parent_department_id}`
                                    : "-"}
                            </p>
                        </div>

                        {/* Manager */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Manager
                            </label>
                            <p className="text-gray-900 font-medium">
                                {department.manager_id
                                    ? `Manager ID: ${department.manager_id}`
                                    : "-"}
                            </p>
                        </div>

                        {/* Active Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Active Status
                            </label>
                            <p className="text-gray-900 font-medium">
                                {department.is_active ? (
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
                                {new Date(department.created_at).toLocaleString()}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Description
                            </label>
                            <p className="text-gray-900">{department.description || "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
