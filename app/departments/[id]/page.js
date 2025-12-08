"use client";

import React from "react";

export default function DepartmentViewPage({ params }) {
  const unwrappedParams = React.use(params);
  const departmentId = unwrappedParams.id;

  // Static department data
  const department = {
    name: "Engineering Department",
    code: "ENG-001",
    parent_department_name: "Technology Division",
    manager_name: "John Doe",
    is_active: true,
    employee_count: 25,
    description: "Responsible for all software development and engineering activities across the organization.",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* General Information Section */}
      <div className="p-8">
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <p className="text-gray-900 font-medium">{department.name || "-"}</p>
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Code
            </label>
            <p className="text-gray-900 font-medium">{department.code || "-"}</p>
          </div>

          {/* Parent Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Parent Department
            </label>
            <p className="text-gray-900 font-medium">
              {department.parent_department_name || "-"}
            </p>
          </div>

          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Manager
            </label>
            <p className="text-gray-900 font-medium">{department.manager_name || "-"}</p>
          </div>

          {/* Active Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Active Status
            </label>
            <p className="text-gray-900 font-medium">
              {department.is_active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Inactive
                </span>
              )}
            </p>
          </div>

          {/* Employee Count */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Employee Count
            </label>
            <p className="text-gray-900 font-medium">
              {department.employee_count || 0}
            </p>
          </div>

          {/* Description */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <p className="text-gray-900">{department.description || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
