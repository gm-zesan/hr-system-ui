import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function TagListItem({ tag, isSelected, onToggleSelect, onDelete }) {
    return (
        <tr
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => (window.location.href = `/configurations/tags/${tag.id}`)}
        >
            <td className="p-2 px-4 text-sm text-gray-900 font-medium">{tag.name}</td>
            <td className="p-2 px-4 text-sm text-gray-700">{tag.code || "-"}</td>
            <td className="p-2 px-4 text-sm text-gray-700">
                {tag.description ? <span className="line-clamp-1">{tag.description}</span> : "-"}
            </td>
            <td className="p-2 px-4">
                {tag.is_active ? (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Active
                    </span>
                ) : (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        Inactive
                    </span>
                )}
            </td>
            <td className="p-2 px-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1">
                    <Link
                        href={`/configurations/tags/${tag.id}`}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors z-10 relative"
                        title="View"
                    >
                        <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                        href={`/configurations/tags/${tag.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors z-10 relative"
                        title="Edit"
                    >
                        <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(tag.id, tag.name);
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
}
