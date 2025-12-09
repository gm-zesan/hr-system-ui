import React from "react";
import Link from "next/link";
import { Pencil, Eye, Trash2, Award } from "lucide-react";

export default function JobTitleCard({ jobTitle, isSelected, onToggleSelect, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow relative group cursor-pointer">
      {/* Checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect(jobTitle.id);
          }}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        />
      </div>

      {/* Clickable overlay */}
      <Link href={`/job_titles/${jobTitle.id}`} className="absolute inset-0 z-0" />

      {/* Icon */}
      <div className="flex justify-center mb-3 mt-2">
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
          <Award className="w-7 h-7 text-purple-600" />
        </div>
      </div>

      {/* Title & Code */}
      <div className="text-center mb-3">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{jobTitle.name}</h3>
        {jobTitle.code && (
          <p className="text-sm text-gray-500">Code: {jobTitle.code}</p>
        )}
      </div>

      {/* Description */}
      {jobTitle.description && (
        <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
          {jobTitle.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100 relative z-10">
        <Link
          href={`/job_titles/${jobTitle.id}`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye className="w-4 h-4" />
          View
        </Link>
        <Link
          href={`/job_titles/${jobTitle.id}/edit`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(jobTitle.id, jobTitle.name);
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
