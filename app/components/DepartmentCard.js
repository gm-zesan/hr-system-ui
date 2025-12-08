import React from "react";
import { Eye, Edit2, Trash2, User, Building2 } from "lucide-react";
import Image from "next/image";
import profile from "../../public/profile.avif";

const DepartmentCard = ({ department, isSelected, onToggleSelect }) => {
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
        onChange={() => onToggleSelect(department.id)}
        className="absolute top-4 right-4 w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
      />

      {/* Department Avatar */}
      <div className="flex justify-center mb-4 mt-2">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100">
          <Image
            src={profile}
            alt={department.name}
            className="w-full h-full object-cover"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* Department Name */}
      <h3 className="text-center font-bold text-lg text-gray-900 mb-4">
        {department.name}
      </h3>

      {/* Manager */}
      <div className="flex items-center justify-start gap-2 text-gray-600 mb-2 px-1">
        <User className="w-4 h-4 text-gray-500" />
        <span className="text-sm">{department.manager}</span>
      </div>

      {/* Company */}
      <div className="flex items-center justify-start gap-2 text-gray-600 mb-5 px-1">
        <Building2 className="w-4 h-4 text-gray-500" />
        <span className="text-sm">{department.company}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-start gap-4 pt-4 border-t border-gray-200">
        <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm">
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>

        <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors text-sm">
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>

        <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors text-sm">
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
