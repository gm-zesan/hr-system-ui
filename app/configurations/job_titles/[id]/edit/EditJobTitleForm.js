"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Saving..." : "Save Changes"}
        </button>
    );
}

export default function EditJobTitleForm({ jobTitle, jobPositions, onSubmit }) {
    const [formData, setFormData] = useState({
        name: jobTitle.name || "",
        code: jobTitle.code || "",
        description: jobTitle.description || "",
        job_position_id: jobTitle.job_position_id || "",
        is_active: jobTitle.is_active ?? true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formDataObj = new FormData(form);

        try {
            await onSubmit(formDataObj);
            // Success - redirect happens in server action
        } catch (error) {
            // Filter out NEXT_REDIRECT errors (they're expected from redirect())
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to update job title");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                {/* General Information Section */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter job title name"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter job title code"
                        />
                    </div>

                    {/* Job Position */}
                    <div>
                        <label
                            htmlFor="job_position_id"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Job Position
                        </label>
                        <select
                            id="job_position_id"
                            name="job_position_id"
                            value={formData.job_position_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Job Position</option>
                            {jobPositions.map((position) => (
                                <option key={position.id} value={position.id}>
                                    {position.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Active Status */}
                    <div>
                        <label
                            htmlFor="is_active"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Active Status
                        </label>
                        <div className="flex items-center gap-4 mt-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value="true"
                                    checked={formData.is_active === true}
                                    onChange={() =>
                                        setFormData((prev) => ({ ...prev, is_active: true }))
                                    }
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value="false"
                                    checked={formData.is_active === false}
                                    onChange={() =>
                                        setFormData((prev) => ({ ...prev, is_active: false }))
                                    }
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700">Inactive</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-3">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter job title description"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <SaveButton />
                </div>
            </div>
        </form>
    );
}
