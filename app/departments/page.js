"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  ListFilter,
  Archive,
  MoreVertical,
  Search,
  Filter,
} from "lucide-react";
import DepartmentCard from "@/app/components/DepartmentCard";

// Mock data for departments
const MOCK_DEPARTMENTS = [
  {
    id: "1",
    name: "Administration",
    manager: "Paul Williams",
    company: "TechNova Solutions Pvt. Ltd.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=ffd5dc",
  },
  {
    id: "2",
    name: "Long Term Projects",
    manager: "Paul Williams",
    company: "TechNova Solutions Pvt. Ltd.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=projects&backgroundColor=ffd5dc",
  },
  {
    id: "3",
    name: "Management",
    manager: "Paul Williams",
    company: "TechNova Solutions Pvt. Ltd.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=management&backgroundColor=ffd5dc",
  },
  {
    id: "4",
    name: "Professional Services",
    manager: "Paul Williams",
    company: "TechNova Solutions Pvt. Ltd.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=services&backgroundColor=ffd5dc",
  },
];

// Tab Button Component
const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-md font-medium transition-colors border-b-2 ${
      active
        ? "border-blue-600 text-blue-600 bg-blue-50/50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState("Default");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSelection = (id) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedDepartments.length === MOCK_DEPARTMENTS.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(MOCK_DEPARTMENTS.map((d) => d.id));
    }
  };

  const filteredDepartments = MOCK_DEPARTMENTS.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-700 cursor-pointer">Departments</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <Link href="/departments/create" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Department
        </Link>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="p-4 flex items-center gap-4 border-b border-gray-200 overflow-x-auto">
          <TabButton
            label="Default"
            icon={ListFilter}
            active={activeTab === "Default"}
            onClick={() => setActiveTab("Default")}
          />
          <TabButton
            label="Archived Departments"
            icon={Archive}
            active={activeTab === "Archived Departments"}
            onClick={() => setActiveTab("Archived Departments")}
          />
          <button className="px-3 py-2 text-gray-400 hover:text-gray-600 ml-auto">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          {/* Left: Group By */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                Group by
              </span>
              <select className="pl-24 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48 appearance-none">
                <option>-</option>
                <option>Company</option>
                <option>Manager</option>
              </select>
              <ChevronRight className="rotate-90 w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
              <Filter className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 bg-gray-200 text-gray-700 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                0
              </span>
            </button>

            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                Sort by
              </span>
              <select className="pl-16 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-40 appearance-none">
                <option>-</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
              </select>
              <ChevronRight className="rotate-90 w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Selection Row + Department Grid */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              checked={
                selectedDepartments.length === MOCK_DEPARTMENTS.length &&
                MOCK_DEPARTMENTS.length > 0
              }
              onChange={toggleAll}
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDepartments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                isSelected={selectedDepartments.includes(department.id)}
                onToggleSelect={toggleSelection}
              />
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No departments found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
