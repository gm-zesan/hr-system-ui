import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profile from "../../public/profile.avif";

const DepartmentListItem = ({ department, isSelected, onToggleSelect, onDelete }) => {
    const handleRowClick = (e) => {
        // Don't navigate if clicking on checkbox or action buttons
        if (
            e.target.closest('input[type="checkbox"]') ||
            e.target.closest('a[href*="/edit"]') ||
            e.target.closest('a[title="View"]') ||
            e.target.closest('a[title="Edit"]')
        ) {
            return;
        }
        window.location.href = `/departments/${department.id}`;
    };

    return (
        <>
            <tr
                onClick={handleRowClick}
                className={`border-b border-gray-200 transition-all cursor-pointer ${
                    isSelected ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"
                }`}
            >
                {/* Name with Avatar */}
                <td className="p-2 px-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 flex-shrink-0">
                            <Image
                                src={profile}
                                alt={department.name}
                                className="w-full h-full object-cover"
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className="font-medium text-gray-900">{department.name}</span>
                    </div>
                </td>

                {/* Manager */}
                <td className="p-2 px-4 text-sm text-gray-600">{department.manager_name || "-"}</td>

                {/* Description */}
                <td className="p-2 px-4 text-sm text-gray-600">
                    <div className="line-clamp-2">{department.description || "-"}</div>
                </td>

                {/* is_active */}
                <td className="p-2 px-4 text-sm text-gray-600">
                    {department.is_active ? (
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
                            href={`/departments/${department.id}`}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors z-10 relative"
                            title="View"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                            href={`/departments/${department.id}/edit`}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors z-10 relative"
                            title="Edit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(department.id, department.name);
                            }}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors z-10 relative cursor-pointer"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default DepartmentListItem;
