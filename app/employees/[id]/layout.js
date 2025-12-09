"use client";

import React from "react";
import { ChevronRight, Eye, Edit, Zap, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Tab Component that uses Link instead of button
const TabLink = ({ href, label, icon: Icon, isActive }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </Link>
);

export default function EmployeeDetailsLayout({ children, params }) {
  const pathname = usePathname();
  const unwrappedParams = React.use(params);
  const employeeId = unwrappedParams.id;

  // Determine which tab is active based on the current pathname
  const isViewActive = pathname === `/employees/${employeeId}`;
  const isEditActive = pathname === `/employees/${employeeId}/edit`;
  const isSkillsActive = pathname === `/employees/${employeeId}/skills`;
  const isResumesActive = pathname === `/employees/${employeeId}/resumes`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/employees" className="hover:text-gray-700 cursor-pointer">
          Employees
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">
          {isViewActive && "View"}
          {isEditActive && "Edit"}
          {isSkillsActive && "Manage Skills"}
          {isResumesActive && "Manage Resumes"}
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {isViewActive && "View Employee"}
          {isEditActive && "Edit Employees"}
          {isSkillsActive && "Manage Skills"}
          {isResumesActive && "Manage Resumes"}
        </h1>
        <div className="flex items-center gap-3">
          {/* <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-600">
              0
            </span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            Delete
          </button> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm inline-flex p-2">
          <TabLink
            href={`/employees/${employeeId}`}
            label="View"
            icon={Eye}
            isActive={isViewActive}
          />
          <TabLink
            href={`/employees/${employeeId}/edit`}
            label="Edit"
            icon={Edit}
            isActive={isEditActive}
          />
          <TabLink
            href={`/employees/${employeeId}/skills`}
            label="Manage Skills"
            icon={Zap}
            isActive={isSkillsActive}
          />
          <TabLink
            href={`/employees/${employeeId}/resumes`}
            label="Manage Resumes"
            icon={FileText}
            isActive={isResumesActive}
          />
        </div>
      </div>

      {/* Child Page Content */}
      {children}
    </>
  );
}
