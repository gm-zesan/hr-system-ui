"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CreateDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    parentDepartment: "",
    manager: "",
    company: "",
    color: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleCreateAndAnother = (e) => {
    e.preventDefault();
    // Handle form submission and reset
    console.log("Create and another:", formData);
    setFormData({
      name: "",
      parentDepartment: "",
      manager: "",
      company: "",
      color: "",
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/departments" className="hover:text-gray-700 cursor-pointer">
          Departments
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Create</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Department</h1>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Form Content */}
        <div className="p-8">
          {/* Section Header */}
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            General Information
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors text-gray-400"
              >
                <option value="">Select Manager</option>
                <option value="paul">Paul Williams</option>
                <option value="john">John Carter</option>
                <option value="sarah">Sarah Smith</option>
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company
              </label>
              <select
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors text-gray-400"
              >
                <option value="">Select Company</option>
                <option value="technova">TechNova Solutions Pvt. Ltd.</option>
                <option value="other">Other Company</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Color
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder=""
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Could open a color picker
                  }}
                >
                  <span className="sr-only">Pick color</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Create
          </button>
          <button
            onClick={handleCreateAndAnother}
            className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            Create & create another
          </button>
          <Link
            href="/departments"
            className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
}
