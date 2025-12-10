import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

const JobPositionListItem = ({ jobPosition, isSelected, onToggleSelect, onDelete }) => {
    const handleRowClick = (e) => {
        if (
            e.target.closest('input[type="checkbox"]') ||
            e.target.closest('a[href*="/edit"]') ||
            e.target.closest('a[title="View"]') ||
            e.target.closest('a[title="Edit"]')
        ) {
            return;
        }
        window.location.href = `/configurations/job_positions/${jobPosition.id}`;
    };

    return (
        <tr
            onClick={handleRowClick}
            className={`border-b border-gray-200 transition-all cursor-pointer ${
                isSelected ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"
            }`}
        >

            {/* Title */}
            <td className="p-2 px-4">
                <span className="font-medium text-gray-900">{jobPosition.title}</span>
            </td>

            {/* Code */}
            <td className="p-2 px-4 text-sm text-gray-600">{jobPosition.code || "-"}</td>

            {/* Level */}
            <td className="p-2 px-4 text-sm text-gray-600">{jobPosition.level || "-"}</td>

            {/* Description */}
            <td className="p-2 px-4 text-sm text-gray-600">
                <div className="line-clamp-2">{jobPosition.description || "-"}</div>
            </td>

            {/* Status */}
            <td className="p-2 px-4 text-sm text-gray-600">
                {jobPosition.is_active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Inactive
                    </span>
                )}
            </td>

            {/* Action Buttons */}
            <td className="p-2 px-4">
                <div className="flex items-center gap-1">
                    <Link
                        href={`/configurations/job_positions/${jobPosition.id}`}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors z-10 relative"
                        title="View"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Eye className="w-4 h-4" />
                    </Link>

                    <Link
                        href={`/configurations/job_positions/${jobPosition.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors z-10 relative"
                        title="Edit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(jobPosition.id, jobPosition.title);
                        }}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors z-10 relative cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default JobPositionListItem;
