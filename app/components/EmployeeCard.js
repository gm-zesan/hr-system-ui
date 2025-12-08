import React from 'react';
import { Briefcase, Mail, Phone, Eye, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import profile from "../../public/profile.avif";

const EmployeeCard = ({ employee, isSelected, onToggleSelect }) => {
  return (
    <div 
      className={`relative border rounded-2xl p-4 transition-all bg-white ${
        isSelected ? 'border-blue-600 ring-2 ring-blue-300 shadow-lg' : 'border-gray-200 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(employee.id)}
        className="absolute top-5 right-5 w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer z-10"
      />

      {/* Clickable Card Area */}
      <Link href={`/employees/${employee.id}`} className="block">
        {/* Employee Avatar - Large Circular */}
        <div className="flex justify-center mb-3 mt-2">
          <div className="w-30 h-30 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
            <Image 
              src={profile} 
              alt={employee.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-center font-bold text-xl text-gray-900 mb-4">
          {employee.name}
        </h3>

        {/* Role with Icon */}
        <div className="flex items-center justify-start gap-2 text-gray-700 mb-2 px-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <span className="text-base">{employee.role}</span>
        </div>

        {/* Email with Icon */}
        <div className="flex items-center justify-start gap-2 text-gray-700 mb-2 px-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <span className="text-base truncate">{employee.email || 'jhon@example.com'}</span>
        </div>

        {/* Phone with Icon */}
        <div className="flex items-center justify-start gap-2 text-gray-700 mb-3 px-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <span className="text-base">{employee.phone || '1234567890'}</span>
        </div>

        {/* Employee Badge */}
        <div className="flex justify-start mb-4 px-2">
          <span className="inline-block bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm font-medium border border-pink-200">
            Employee
          </span>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center justify-start gap-4 pt-2 border-t border-gray-200 px-2">
        <Link 
          href={`/employees/${employee.id}`}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors z-10 relative"
        >
          <Eye className="w-5 h-5" />
          <span className="text-base font-medium">View</span>
        </Link>
        
        <Link
          href={`/employees/${employee.id}/edit`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors z-10 relative"
        >
          <Edit2 className="w-5 h-5" />
          <span className="text-base font-medium">Edit</span>
        </Link>
        
        <button className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors z-10 relative">
          <Trash2 className="w-5 h-5" />
          <span className="text-base font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
