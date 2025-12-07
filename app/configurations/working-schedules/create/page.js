"use client";

import React, { useState } from "react";
import { ChevronRight, X, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function CreateWorkingSchedulePage() {
  const [formData, setFormData] = useState({
    scheduleName: "",
    timezone: "UTC",
    company: "",
    hoursPerDay: "8",
    fullTimeRequiredHours: "40",
    status: true,
    twoWeeksCalendar: false,
    flexibleHours: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleCreateAndAnother = (e) => {
    e.preventDefault();
    console.log("Create and another:", formData);
    setFormData({
      scheduleName: "",
      timezone: "UTC",
      company: "",
      hoursPerDay: "8",
      fullTimeRequiredHours: "40",
      status: true,
      twoWeeksCalendar: false,
      flexibleHours: false,
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/configurations" className="hover:text-gray-700 cursor-pointer">
          Configurations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link
          href="/configurations/working-schedules"
          className="hover:text-gray-700 cursor-pointer"
        >
          Working Schedules
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Create</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Working Schedules</h1>
      </div>

      {/* Main Container with Sidebar */}
      <div className="flex gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {/* General Information Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                General Information
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Schedule Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      Schedule Name<span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.scheduleName}
                    onChange={(e) => handleInputChange("scheduleName", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder=""
                  />
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      Timezone<span className="text-red-500">*</span>
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder=""
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                    </div>
                  </div>
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
                    <option value="">Select an option</option>
                    <option value="technova">TechNova Solutions Pvt. Ltd.</option>
                    <option value="blueocean">BlueOcean Technologies Inc.</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Work Hours Configuration Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Work Hours Configuration
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hours Per Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Hours Per Day
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.hoursPerDay}
                      onChange={(e) => handleInputChange("hoursPerDay", e.target.value)}
                      className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      Hours
                    </span>
                  </div>
                </div>

                {/* Full Time Required Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Time Required Hours
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.fullTimeRequiredHours}
                      onChange={(e) =>
                        handleInputChange("fullTimeRequiredHours", e.target.value)
                      }
                      className="w-full px-4 py-2.5 pr-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      Hours Per Week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pb-6">
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
              href="/configurations/working-schedules"
              className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Right Sidebar - Flexibility */}
        <div className="w-80 shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Flexibility</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Status
                </label>
                <button
                  onClick={() => handleInputChange("status", !formData.status)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    formData.status ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.status ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Two Weeks Calendar */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  <div className="flex items-center gap-2">
                    Two Weeks Calendar
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </div>
                </label>
                <button
                  onClick={() =>
                    handleInputChange("twoWeeksCalendar", !formData.twoWeeksCalendar)
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    formData.twoWeeksCalendar ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.twoWeeksCalendar ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Flexible Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  <div className="flex items-center gap-2">
                    Flexible Hours
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                  </div>
                </label>
                <button
                  onClick={() =>
                    handleInputChange("flexibleHours", !formData.flexibleHours)
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    formData.flexibleHours ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.flexibleHours ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
