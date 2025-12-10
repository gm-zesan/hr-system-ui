"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

const TabLink = ({ href, label, isActive }) => (
    <Link
        href={href}
        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
            isActive
                ? "border-blue-600 text-blue-600 bg-blue-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
    >
        {label}
    </Link>
);

export default function SkillTypeLayout({ children }) {
    const pathname = usePathname();
    const params = useParams();
    const id = params.id;

    const isViewActive = pathname === `/configurations/skill_types/${id}`;
    const isEditActive = pathname === `/configurations/skill_types/${id}/edit`;

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
                <span className="text-gray-900 font-medium">
                    {isViewActive && "View"}
                    {isEditActive && "Edit"}
                </span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    {isViewActive && "View Skill Type"}
                    {isEditActive && "Edit Skill Type"}
                </h1>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex justify-center">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm inline-flex p-2">
                    <TabLink
                        href={`/configurations/skill_types/${id}`}
                        label="View"
                        isActive={isViewActive}
                    />
                    <TabLink
                        href={`/configurations/skill_types/${id}/edit`}
                        label="Edit"
                        isActive={isEditActive}
                    />
                </div>
            </div>

            {children}
        </>
    );
}
