import React from "react";
import { Eye, Edit2, Trash2, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";

const JobPositionCard = ({ jobPosition, isSelected, onToggleSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(jobPosition.id, jobPosition.title);
    }
  };

  return (
    <div
      className={`relative border rounded-xl p-5 transition-all bg-white ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-300 shadow-lg"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(jobPosition.id)}
        className="absolute top-4 right-4 w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer z-10"
      />

      {/* Clickable Card Area */}
      <Link href={`/job_positions/${jobPosition.id}`} className="block">
        {/* Job Position Icon */}
        <div className="flex justify-center mb-4 mt-2">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Job Position Title */}
        <h3 className="text-center font-bold text-lg text-gray-900 mb-4">
          {jobPosition.title}
        </h3>

        {/* Code */}
        <div className="flex items-center justify-start gap-2 text-gray-600 mb-2 px-1">
          <span className="text-sm font-medium text-gray-500">Code:</span>
          <span className="text-sm">{jobPosition.code || "-"}</span>
        </div>

        {/* Level */}
        <div className="flex items-center justify-start gap-2 text-gray-600 mb-2 px-1">
          <span className="text-sm font-medium text-gray-500">Level:</span>
          <span className="text-sm">{jobPosition.level || "-"}</span>
        </div>

        {/* Description */}
        <div className="flex items-start justify-start gap-2 text-gray-600 mb-5 px-1">
          <Building2 className="w-4 h-4 text-gray-500 mt-0.5" />
          <span className="text-sm line-clamp-2">{jobPosition.description || "-"}</span>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center justify-start gap-4 pt-4 border-t border-gray-200">
        <Link
          href={`/job_positions/${jobPosition.id}`}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm z-10 relative"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Link>

        <Link
          href={`/job_positions/${jobPosition.id}/edit`}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors text-sm z-10 relative"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </Link>

        <button 
          onClick={handleDelete}
          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors text-sm z-10 relative cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default JobPositionCard;
