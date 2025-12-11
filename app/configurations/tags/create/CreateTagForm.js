"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { createTag } from "@/api/tags/createTag";

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Saving..." : "Save"}
        </button>
    );
}

function SaveAndCreateAnotherButton({ onClick }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={pending}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Saving..." : "Save & Create Another"}
        </button>
    );
}

export default function CreateTagForm({ onSubmit }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        is_active: true
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
            toast.error(error.message || "Failed to create tag");
        }
    };

    const handleSaveAndCreateAnother = async () => {
        const form = document.getElementById("createTagForm");
        const formDataObj = new FormData(form);

        const data = {
            name: formDataObj.get("name"),
            code: formDataObj.get("code") || null,
            description: formDataObj.get("description") || null,
            is_active: formDataObj.get("is_active") === "true"
        };

        try {
            await createTag(data);
            setFormData({
                name: "",
                code: "",
                description: "",
                is_active: true
            });
            toast.success("Tag created successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to create tag");
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/configurations" className="hover:text-gray-700 cursor-pointer">
                    Configurations
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/configurations/tags" className="hover:text-gray-700 cursor-pointer">
                    Tags
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Create Tag</h1>
                
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <form id="createTagForm" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter tag name"
                            />
                        </div>

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Code
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter tag code"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="is_active"
                                value={formData.is_active.toString()}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter tag description"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-end gap-3">
                        <Link
                            href="/configurations/tags"
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            Cancel
                        </Link>
                        <SaveAndCreateAnotherButton onClick={handleSaveAndCreateAnother} />
                        <SaveButton />
                    </div>
                </form>
            </div>
        </>
    );
}
