"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  Briefcase,
  Lock,
  Settings as SettingsIcon,
  X,
  Plus,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";

// Mock employee data
const EMPLOYEE_DATA = {
  id: "1",
  name: "Aarav Mehta",
  jobTitle: "Software Engineer",
  department: "Research & Development",
  jobPosition: "ReactJS Frontend Developer",
  manager: "Hans Müller",
  coach: "Ava Lewis",
  workEmail: "aarav.mehta@email.com",
  workMobile: "+91-9876543201",
  workPhone: "123456789789",
  employeeTags: ["Employee"],
};

// Detail Tab Component for Work Info/Private Info/Settings
const DetailTab = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
      active
        ? "text-blue-600 border-blue-600"
        : "text-gray-500 border-transparent hover:text-gray-700"
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default function EditEmployeePage({ params }) {
  const [detailTab, setDetailTab] = useState("work");
  const [formData, setFormData] = useState(EMPLOYEE_DATA);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagDropdownRef = useRef(null);

  const availableTags = [
    "Employee",
    "Manager",
    "Contractor",
    "Intern",
    "Remote",
    "Full-time",
    "Part-time",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (tag) => {
    if (!formData.employeeTags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        employeeTags: [...prev.employeeTags, tag],
      }));
    }
    setShowTagDropdown(false);
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      employeeTags: prev.employeeTags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <>
      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Employee Info Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job title"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => handleInputChange("workEmail", e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work email"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Work Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Work Mobile
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.workMobile}
                    onChange={(e) => handleInputChange("workMobile", e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work mobile"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Work Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Work Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.workPhone}
                    onChange={(e) => handleInputChange("workPhone", e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work phone"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Employee Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Employee Tags
                </label>
                <div className="relative" ref={tagDropdownRef}>
                  <div 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent min-h-[42px] flex flex-wrap items-center gap-2 cursor-pointer"
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                  >
                    {formData.employeeTags.length > 0 ? (
                      formData.employeeTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {tag}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                            className="hover:bg-blue-100 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Select tags...</span>
                    )}
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTagDropdown ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Dropdown Menu */}
                  {showTagDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {availableTags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddTag(tag);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                            formData.employeeTags.includes(tag) ? 'bg-blue-50' : ''
                          }`}
                        >
                          <span className="text-sm text-gray-900">{tag}</span>
                          {formData.employeeTags.includes(tag) && (
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info Form */}
            <div className="lg:col-span-1 space-y-6">

              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-blue-400"
                      viewBox="0 0 200 200"
                      fill="currentColor"
                    >
                      <path d="M100 20c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27zm0 100c-30 0-90 15-90 45v15h180v-15c0-30-60-45-90-45z" />
                    </svg>
                  </div>
                </div>
                {/* Edit and Delete Icons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg">
                    <X className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              </div>




              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select department</option>
                    <option value="Research & Development">Research & Development</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  {formData.department && (
                    <button
                      onClick={() => handleInputChange("department", "")}
                      className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Job Position */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Position
                </label>
                <div className="relative">
                  <select
                    value={formData.jobPosition}
                    onChange={(e) => handleInputChange("jobPosition", e.target.value)}
                    className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select job position</option>
                    <option value="ReactJS Frontend Developer">ReactJS Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  {formData.jobPosition && (
                    <button
                      onClick={() => handleInputChange("jobPosition", "")}
                      className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Manager
                </label>
                <div className="relative">
                  <select
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select manager</option>
                    <option value="Hans Müller">Hans Müller</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Michael Chen">Michael Chen</option>
                    <option value="Emma Davis">Emma Davis</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  {formData.manager && (
                    <button
                      onClick={() => handleInputChange("manager", "")}
                      className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Coach */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Coach
                </label>
                <div className="relative">
                  <select
                    value={formData.coach}
                    onChange={(e) => handleInputChange("coach", e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select coach</option>
                    <option value="Ava Lewis">Ava Lewis</option>
                    <option value="James Wilson">James Wilson</option>
                    <option value="Olivia Martinez">Olivia Martinez</option>
                    <option value="Liam Brown">Liam Brown</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  {formData.coach && (
                    <button
                      onClick={() => handleInputChange("coach", "")}
                      className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Sections */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Detail Tabs */}
        <div className="border-b border-gray-200">
          <div className="p-2 flex items-center gap-0">
            <DetailTab
              label="Work Information"
              icon={Briefcase}
              active={detailTab === "work"}
              onClick={() => setDetailTab("work")}
            />
            <DetailTab
              label="Private Information"
              icon={Lock}
              active={detailTab === "private"}
              onClick={() => setDetailTab("private")}
            />
            <DetailTab
              label="Settings"
              icon={SettingsIcon}
              active={detailTab === "settings"}
              onClick={() => setDetailTab("settings")}
            />
          </div>
        </div>

        {/* Work Information Tab */}
        {detailTab === "work" && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Location Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Address
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select work address</option>
                        <option value="BlueOcean Technologies Inc.">BlueOcean Technologies Inc.</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Location
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select work location</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvers Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Approver</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Time Off
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select approver</option>
                        <option value="HR Admin">HR Admin</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Attendance Manager
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Working Hours
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select working hours</option>
                        <option value="Flexible 40 hours/week">Flexible 40 hours/week</option>
                        <option value="Standard 40 hours/week">Standard 40 hours/week</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Timezone
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select timezone</option>
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="America/New_York">America/New York</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Details Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select company</option>
                        <option value="TechNova Solutions Pvt. Ltd.">TechNova Solutions Pvt. Ltd.</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter color"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Private Information Tab */}
        {detailTab === "private" && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Private Contact Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Private Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Street 1
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter street 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Street 2
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter street 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter postal code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      State
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Private Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter private phone"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Private Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter private email"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Private Car Plate
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter car plate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Km Home to Work
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue="0"
                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distance Unit Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Distance Unit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Distance Unit
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="Kilometer">Kilometer</option>
                        <option value="Miles">Miles</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter contact phone"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Bank Account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Bank Account
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Status Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Family Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Marital Status
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Education</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Certificate Level
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter field of study"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      School
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter school"
                    />
                  </div>
                </div>
              </div>

              {/* Citizenship Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Citizenship</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      State
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="California">California</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Identification ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      SSN No
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter SSN"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      SIN No
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter SIN"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Passport ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter passport ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Gender
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Country of Birth
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="United States">United States</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Permit Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Work Permit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Visa Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter visa number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Permit No
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter work permit number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Visa Expiration
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Permit Expiration Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Permit
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter work permit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {detailTab === "settings" && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Employment Status Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Employment Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Active Employee
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Flexible Work Arrangement
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Fully Flexible Schedule
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Work Permit Scheduled Activity
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Related User
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                        <option value="Aarav Mehta">Aarav Mehta</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="absolute right-16 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Departure Reason
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                        <option value="">Select an option</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 pointer-events-auto">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Additional Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Primary Language
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter primary language"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter additional notes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter notes"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance/Point of Sale Section */}
              <div className="lg:col-span-2 mt-4 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="absolute -top-[13px] bg-white text-base font-semibold text-gray-900 mb-6 px-2">Attendance/Point of Sale</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Badge ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter badge ID"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded-full p-1">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      PIN
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter PIN"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save and Cancel Buttons */}
      <div className="mt-6 flex items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          Save changes
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </>
  );
}
