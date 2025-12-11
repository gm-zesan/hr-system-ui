import React from "react";
import { Eye, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profile from "../../public/profile.avif";

const EmployeeListItem = ({ employee, isSelected, onToggleSelect }) => {
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
        window.location.href = `/employees/${employee.id}`;
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
                <td className="p-2">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                                src={profile}
                                alt={employee.name}
                                className="w-full h-full object-cover"
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className="font-medium text-gray-900">{employee.name}</span>
                    </div>
                </td>

                {/* Job Position */}
                <td className="p-2 text-sm text-gray-600">{employee.role}</td>

                {/* Email */}
                <td className="p-2 text-sm text-gray-600">{employee.email || "-"}</td>

                {/* Phone */}
                <td className="p-2 text-sm text-gray-600">{employee.phone || "-"}</td>

                {/* Department */}
                <td className="p-2 text-sm text-gray-600">{employee.department}</td>

                {/* Manager */}
                <td className="p-2 text-sm text-gray-600">{employee.manager || "-"}</td>

                {/* Action Buttons */}
                <td className="p-2">
                    <div className="flex items-center gap-1">
                        <Link
                            href={`/employees/${employee.id}`}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors z-10 relative"
                            title="View"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                            href={`/employees/${employee.id}/edit`}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors z-10 relative"
                            title="Edit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Edit2 className="w-4 h-4" />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default EmployeeListItem;
