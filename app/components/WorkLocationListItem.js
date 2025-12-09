import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function WorkLocationListItem({ workLocation, isSelected, onToggleSelect, onDelete }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => window.location.href = `/configurations/work_locations/${workLocation.id}`}>
      <td className="p-2" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(workLocation.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        />
      </td>
      <td className="p-2 text-sm text-gray-900 font-medium">{workLocation.name}</td>
      <td className="p-2 text-sm text-gray-700">{workLocation.code || "-"}</td>
      <td className="p-2 text-sm text-gray-700">{workLocation.city || "-"}</td>
      <td className="p-2 text-sm text-gray-700">{workLocation.country || "-"}</td>
      <td className="p-2 text-sm text-gray-700">
        {workLocation.address ? (
          <span className="line-clamp-1">{workLocation.address}</span>
        ) : (
          "-"
        )}
      </td>
      <td className="p-2">
        {workLocation.is_active ? (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            Active
          </span>
        ) : (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            Inactive
          </span>
        )}
      </td>
      <td className="p-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          <Link
            href={`/configurations/work_locations/${workLocation.id}`}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors z-10 relative"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/configurations/work_locations/${workLocation.id}/edit`}
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors z-10 relative"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(workLocation.id, workLocation.name);
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
