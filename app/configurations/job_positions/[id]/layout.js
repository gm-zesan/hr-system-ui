"use client";

import React from "react";
import { ChevronRight, Eye, Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabLink = ({ href, label, icon: Icon, isActive }) => (
    <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
            isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </Link>
);

export default function JobPositionDetailsLayout({ children, params }) {
    const pathname = usePathname();
    const unwrappedParams = React.use(params);
    const jobPositionId = unwrappedParams.id;

    const isViewActive = pathname === `/configurations/job_positions/${jobPositionId}`;
    const isEditActive = pathname === `/configurations/job_positions/${jobPositionId}/edit`;

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link
                    href="/configurations/job_positions"
                    className="hover:text-gray-700 cursor-pointer"
                >
                    Job Positions
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
                    {isViewActive && "View Job Position"}
                    {isEditActive && "Edit Job Position"}
                </h1>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex justify-center">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm inline-flex p-2">
                    <TabLink
                        href={`/configurations/job_positions/${jobPositionId}`}
                        label="View"
                        icon={Eye}
                        isActive={isViewActive}
                    />
                    <TabLink
                        href={`/configurations/job_positions/${jobPositionId}/edit`}
                        label="Edit"
                        icon={Edit}
                        isActive={isEditActive}
                    />
                </div>
            </div>

            {/* Page Content */}
            {children}
        </>
    );
}
