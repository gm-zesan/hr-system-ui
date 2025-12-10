import React from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { getSkillTypes } from "@/api/skill-types/getSkillTypes";
import SkillTypesClient from "./SkillTypesClient";

export default async function SkillTypesPage({ searchParams }) {
    const params = await searchParams;
    const showSuccess = params?.success === "true";
    const showDeleted = params?.deleted === "true";
    const page = parseInt(params?.page || "1");
    const limit = parseInt(params?.limit || "10");
    const search = params?.search || "";

    let skillTypesData = null;
    let apiError = null;

    try {
        skillTypesData = await getSkillTypes(page, limit, search);
    } catch (error) {
        console.error("Failed to fetch skill types from API:", error.message);
        apiError = error.message;
    }

    return (
        <>
            {/* API Error Warning */}
            {apiError && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0">
                            <svg
                                className="w-5 h-5 text-yellow-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-yellow-800">
                                API Connection Error
                            </h3>
                            <p className="mt-1 text-sm text-yellow-700">
                                Unable to connect to the API. Please ensure the backend server is
                                running.
                            </p>
                            <p className="mt-1 text-xs text-yellow-600 font-mono">{apiError}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/configurations" className="hover:text-blue-600 transition-colors">
                    Configurations
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Skill Types</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Skill Types</h1>
                    <p className="text-gray-600 mt-1">Manage skill type classifications</p>
                </div>
                <Link
                    href="/configurations/skill_types/create"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Create New
                </Link>
            </div>

            {/* Client Component */}
            {skillTypesData && (
                <SkillTypesClient
                    skillTypes={skillTypesData.items || []}
                    total={skillTypesData.total || 0}
                    currentPage={skillTypesData.page || 1}
                    totalPages={skillTypesData.pages || 1}
                    limit={skillTypesData.limit || 10}
                    showSuccessToast={showSuccess}
                    showDeletedToast={showDeleted}
                    initialSearch={search}
                />
            )}
        </>
    );
}
