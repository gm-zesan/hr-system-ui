"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function SaveButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export default function EditDepartmentForm({ department, departments, updateAction, departmentId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: department.name || "",
    code: department.code || "",
    parent_department_id: department.parent_department_id?.toString() || "",
    manager_id: department.manager_id?.toString() || "",
    is_active: department.is_active,
    description: department.description || "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (formDataObj) => {
    setError("");
    
    try {
      await updateAction(formDataObj);
      // Redirect happens in server action, but if it doesn't throw, it worked
    } catch (err) {
      // Only show error if it's not a redirect
      if (err?.message?.includes("NEXT_REDIRECT")) {
        return;
      }
      
      console.error("Error updating department:", err);
      const errorMessage = err.response?.data?.message || "Failed to update department. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form action={handleSubmit}>
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
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter department name"
                  required
                />
              </div>

              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., ADM-001"
                  required
                />
              </div>

              {/* Parent Department */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Parent Department
                </label>
                <select
                  name="parent_department_id"
                  value={formData.parent_department_id}
                  onChange={(e) => handleInputChange("parent_department_id", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
                >
                  <option value="">None</option>
                  {departments && departments.filter(d => d.id !== parseInt(departmentId)).map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Manager ID
                </label>
                <input
                  type="number"
                  name="manager_id"
                  value={formData.manager_id}
                  onChange={(e) => handleInputChange("manager_id", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Manager ID (optional)"
                />
              </div>

              {/* Active Status */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Active Status
                </label>
                <select
                  name="is_active"
                  value={formData.is_active}
                  onChange={(e) => handleInputChange("is_active", e.target.value === "true")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={4}
                  placeholder="Enter department description"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
            <SaveButton />
            <Link
              href={`/departments/${departmentId}`}
              className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}