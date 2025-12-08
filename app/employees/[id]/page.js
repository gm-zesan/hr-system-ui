"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Briefcase,
  Lock,
  Settings as SettingsIcon,
  Building2,
  MapPin,
  Clock,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import profile from "../../../public/profile.avif";

// Mock employee data - in a real app, this would come from an API based on the ID
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
  avatar: "https://i.pravatar.cc/300?img=12",
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

export default function ViewEmployeePage({ params }) {
  const [detailTab, setDetailTab] = useState("work");

  return (
    <>
      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Employee Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Name */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Name</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {EMPLOYEE_DATA.name}
                </p>
              </div>

              {/* Job Title */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </h3>
                <p className="text-base text-gray-900">{EMPLOYEE_DATA.jobTitle}</p>
              </div>

              {/* Work Emai */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Work Email
                </h3>
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-base">{EMPLOYEE_DATA.workEmail}</span>
                </div>
              </div>

              {/* Work Mobile */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Work Mobile
                </h3>
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-base">{EMPLOYEE_DATA.workMobile}</span>
                </div>
              </div>

              {/* Work Phone */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Work Phone
                </h3>
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-base">{EMPLOYEE_DATA.workPhone}</span>
                </div>
              </div>

              {/* Employee Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Employee Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {EMPLOYEE_DATA.employeeTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-50 text-pink-700 border border-pink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="lg:col-span-1 space-y-6">

              {/* Image */}
              <div className="w-30 h-30 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Image
                    src={profile}
                    alt={EMPLOYEE_DATA.name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>



              {/* Department */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Department
                </h3>
                <p className="text-base text-gray-900">{EMPLOYEE_DATA.department}</p>
              </div>

              {/* Job Position */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Job Position
                </h3>
                <p className="text-base text-gray-900">
                  {EMPLOYEE_DATA.jobPosition}
                </p>
              </div>

              {/* Manager */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Manager</h3>
                <p className="text-base text-gray-900">{EMPLOYEE_DATA.manager}</p>
              </div>

              {/* Coach */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Coach</h3>
                <p className="text-base text-gray-900">{EMPLOYEE_DATA.coach}</p>
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
                <h3 className="text-base font-semibold text-gray-900 mb-6">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Address</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-base">BlueOcean Technologies Inc.</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Location</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-base">Home</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvers Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Approvers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Time Off</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-base">HR Admin</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attendance Manager</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-base">Admin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Working Hours</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-base">Flexible 40 hours/week</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Timezone</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-base">Asia/Kolkata</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Details Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Company</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-base">TechNova Solutions Pvt. Ltd.</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Color</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <span className="text-base">—</span>
                    </div>
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
                <h3 className="text-base font-semibold text-gray-900 mb-6">Private Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Street Address</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Street Address Line 2</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">City</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Post Code</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Country</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">State</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Private Phone</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Private Email</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Private Car Plate</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Distance Home to Work</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-base">0km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Name</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Phone</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                </div>
              </div>

              {/* Work Permit Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Work Permit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visa Number</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Permit Number</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visa Expiration Date</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Permit Expiration Date</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Permit Document</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                </div>
              </div>

              {/* Citizenship Section */}
              <div className="lg:col-span-1 mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Citizenship</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Country</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">State</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Identification ID</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">SSN No</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">SIN No</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Passport ID</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Gender</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Date of Birth</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Country of Birth</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Phone Code</h4>
                    <span className="text-base text-gray-900">—</span>
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
              {/* Employee Settings Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Employee Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Active Employee</h4>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Flexible Work Arrangement</h4>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Fully Flexible Schedule</h4>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Work Permit Scheduled Activity</h4>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Related User</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-base">Aarav Mehta</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Departure Reason</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Departure Date</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Departure Description</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="lg:col-span-2 border border-gray-400 rounded-lg p-4 relative mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Additional Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Language</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                </div>
              </div>

              {/* Attendance/Point of Sale Section */}
              <div className="lg:col-span-1 mt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-6">Attendance/Point of Sale</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Badge ID</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">PIN</h4>
                    <span className="text-base text-gray-900">—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
