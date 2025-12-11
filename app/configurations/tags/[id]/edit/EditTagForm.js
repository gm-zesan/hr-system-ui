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

export default function EditTagForm({ tag, onSubmit }) {
    const [formData, setFormData] = useState({
        name: tag.name || "",
        code: tag.code || "",
        description: tag.description || "",
        is_active: tag.is_active ?? true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formDataObj = new FormData(form);

        try {
            await onSubmit(formDataObj);
        } catch (error) {
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to update tag");
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
                            placeholder="Enter tag name"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter tag code"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label
                            htmlFor="is_active"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Status
                        </label>
                        <select
                            id="is_active"
                            name="is_active"
                            value={formData.is_active.toString()}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Description Section */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                </div>

                <div className="mb-8">
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
                        placeholder="Enter tag description"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <SaveButton />
                </div>
            </div>
        </form>
    );
}
