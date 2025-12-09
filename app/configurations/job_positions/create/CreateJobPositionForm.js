"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { createJobPosition } from "@/api/job-positions/createJobPosition";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

function SaveAndCreateAnotherButton({ onClick }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save & Create Another"}
    </button>
  );
}

export default function CreateJobPositionForm({ departments, onSubmit }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    department_id: "",
    level: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    try {
      await onSubmit(formDataObj);
      // Success - redirect happens in server action
    } catch (error) {
      // Filter out NEXT_REDIRECT errors (they're expected from redirect())
      if (error.message && error.message.includes('NEXT_REDIRECT')) {
        return;
      }
      toast.error(error.message || "Failed to create job position");
    }
  };

  const handleSaveAndCreateAnother = async () => {
    const form = document.getElementById("createJobPositionForm");
    const formDataObj = new FormData(form);

    const data = {
      title: formDataObj.get("title"),
      code: formDataObj.get("code"),
      description: formDataObj.get("description") || null,
      department_id: formDataObj.get("department_id") ? parseInt(formDataObj.get("department_id")) : null,
      level: formDataObj.get("level") || null,
      is_active: formDataObj.get("is_active") === "true",
    };

    try {
      await createJobPosition(data);
      // Reset form on success
      setFormData({
        title: "",
        code: "",
        description: "",
        department_id: "",
        level: "",
        is_active: true,
      });
      toast.success("Job position created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create job position");
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/configurations/job_positions" className="hover:text-gray-700 cursor-pointer">
          Job Positions
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Create</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Create Job Position</h1>
      </div>

      {/* Form */}
      <form id="createJobPositionForm" onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          {/* General Information Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job title"
              />
            </div>

            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job code"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <input
                type="text"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter level (e.g., Senior, Junior)"
              />
            </div>

            {/* Active Status */}
            <div>
              <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-2">
                Active Status
              </label>
              <div className="flex items-center gap-4 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="is_active"
                    value="true"
                    checked={formData.is_active === true}
                    onChange={() => setFormData((prev) => ({ ...prev, is_active: true }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="is_active"
                    value="false"
                    checked={formData.is_active === false}
                    onChange={() => setFormData((prev) => ({ ...prev, is_active: false }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job description"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <Link
              href="/configurations/job_positions"
              className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </Link>
            <SaveAndCreateAnotherButton onClick={handleSaveAndCreateAnother} />
            <SaveButton />
          </div>
        </div>
      </form>
    </>
  );
}
