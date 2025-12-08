"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EditDepartmentPage({ params }) {
  const unwrappedParams = React.use(params);
  const departmentId = unwrappedParams.id;

  const [formData, setFormData] = useState({
    name: "Engineering Department",
    code: "ENG-001",
    parentDepartment: "services",
    manager: "john",
    is_active: "active",
    description: "Responsible for all software development and engineering activities across the organization.",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Form Content */}
      <div className="p-8">
        {/* Section Header */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Parent Department */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Parent Department
            </label>
            <select
              value={formData.parentDepartment}
              onChange={(e) => handleInputChange("parentDepartment", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
            >
              <option value="">Select an option</option>
              <option value="administration">Administration</option>
              <option value="management">Management</option>
              <option value="services">Professional Services</option>
            </select>
          </div>

          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Manager
            </label>
            <select
              value={formData.manager}
              onChange={(e) => handleInputChange("manager", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors text-gray-400"
            >
              <option value="">Select Manager</option>
              <option value="paul">Paul Williams</option>
              <option value="john">John Carter</option>
              <option value="sarah">Sarah Smith</option>
            </select>
          </div>

          {/* Active Status */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Active Status
            </label>
            <select
              value={formData.is_active}
              onChange={(e) => handleInputChange("is_active", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={4}
              placeholder=""
            ></textarea>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Save
        </button>
        <Link
          href={`/departments/${departmentId}`}
          className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
