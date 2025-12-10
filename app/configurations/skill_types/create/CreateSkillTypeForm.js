"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { createSkillType } from "@/api/skill-types/createSkillType";

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

export default function CreateSkillTypeForm({ onSubmit }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        color: "#3B82F6",
        sequence: 0,
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
            // Success - redirect happens in server action
        } catch (error) {
            // Filter out NEXT_REDIRECT errors (they're expected from redirect())
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to create skill type");
        }
    };

    const handleSaveAndCreateAnother = async () => {
        const form = document.getElementById("createSkillTypeForm");
        const formDataObj = new FormData(form);

        const data = {
            name: formDataObj.get("name"),
            code: formDataObj.get("code"),
            description: formDataObj.get("description") || null,
            color: formDataObj.get("color") || "#000000",
            sequence: formDataObj.get("sequence") ? parseInt(formDataObj.get("sequence")) : 0,
            is_active: formDataObj.get("is_active") === "true"
        };

        try {
            await createSkillType(data);
            // Reset form on success
            setFormData({
                name: "",
                code: "",
                description: "",
                color: "#3B82F6",
                sequence: 0,
                is_active: true
            });
            toast.success("Skill type created successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to create skill type");
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link
                    href="/configurations/skill_types"
                    className="hover:text-gray-700 cursor-pointer"
                >
                    Skill Types
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Create Skill Type</h1>
            </div>

            {/* Form */}
            <form id="createSkillTypeForm" onSubmit={handleSubmit}>
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
                                placeholder="Enter skill type name"
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
                                placeholder="Enter skill type code"
                            />
                        </div>

                        {/* Color */}
                        <div>
                            <label
                                htmlFor="color"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Color
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, color: e.target.value }))
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>

                        {/* Sequence */}
                        <div>
                            <label
                                htmlFor="sequence"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Sequence
                            </label>
                            <input
                                type="number"
                                id="sequence"
                                name="sequence"
                                value={formData.sequence}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        {/* Active Status */}
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

                        {/* Description (Full Width) */}
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
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter skill type description"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                        <Link
                            href="/configurations/skill_types"
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <SaveAndCreateAnotherButton onClick={handleSaveAndCreateAnother} />
                        <SaveButton />
                    </div>
                </div>
            </form>
        </>
    );
}
