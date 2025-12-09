import React from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

export default function JobTitleListItem({ jobTitle, isSelected, onToggleSelect }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => window.location.href = `/job_titles/${jobTitle.id}`}>
      <td className="p-2" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(jobTitle.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        />
      </td>
      <td className="p-2 text-sm text-gray-900 font-medium">{jobTitle.name}</td>
      <td className="p-2 text-sm text-gray-700">{jobTitle.code || "-"}</td>
      <td className="p-2 text-sm text-gray-700">
        {jobTitle.description ? (
          <span className="line-clamp-1">{jobTitle.description}</span>
        ) : (
          "-"
        )}
      </td>
      <td className="p-2">
        {jobTitle.is_active ? (
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
        <div className="flex items-center gap-2">
          <Link
            href={`/job_titles/${jobTitle.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/job_titles/${jobTitle.id}/edit`}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
