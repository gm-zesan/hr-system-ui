"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";

export default function SkillDetailsClient({ skill, onDelete }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const showUpdated = searchParams.get("updated") === "true";
    const toastShown = useRef(false);
    const [deleteModal, setDeleteModal] = useState({ show: false });
    const [isModalAnimating, setIsModalAnimating] = useState(false);

    useEffect(() => {
        if (showUpdated && !toastShown.current) {
            toastShown.current = true;
            const url = new URL(window.location.href);
            url.searchParams.delete("updated");
            window.history.replaceState({}, "", url.toString());
            toast.success("Skill updated successfully!");
        }
    }, [showUpdated]);

    const handleDeleteClick = () => {
        setDeleteModal({ show: true });
        setTimeout(() => {
            setIsModalAnimating(true);
        }, 10);
    };

    const handleDeleteCancel = () => {
        setIsModalAnimating(false);
        setTimeout(() => {
            setDeleteModal({ show: false });
        }, 300);
    };

    const handleDeleteConfirm = async () => {
        try {
            await onDelete();
        } catch (error) {
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to delete skill");
        }
    };

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                {/* Basic Information Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Name
                            </label>
                            <p className="text-base text-gray-900">{skill.name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Skill Type
                            </label>
                            <p className="text-base text-gray-900">
                                {skill.skill_type_name || "-"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Status
                            </label>
                            {skill.is_active ? (
                                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                                    Inactive
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {skill.description && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                        <p className="text-base text-gray-900 whitespace-pre-wrap">
                            {skill.description}
                        </p>
                    </div>
                )}

                {/* Timestamps Section */}
                <div className="pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Created At
                            </label>
                            <p className="text-base text-gray-900">
                                {skill.created_at
                                    ? new Date(skill.created_at).toLocaleString()
                                    : "-"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Updated At
                            </label>
                            <p className="text-base text-gray-900">
                                {skill.updated_at
                                    ? new Date(skill.updated_at).toLocaleString()
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                    <div
                        className={`bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ${
                            isModalAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Skill
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">{skill.name}</span>? This action
                                cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
