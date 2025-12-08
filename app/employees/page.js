"use client";

import React, { useState } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";
import Link from "next/link";

import {
  ChevronRight,
  Plus,
  Users,
  Archive,
  Calendar,
  MoreVertical,
  Search,
  Filter,
  ListFilter,
} from "lucide-react";

const MOCK_EMPLOYEES = [
  {
    id: "1",
    name: "John Carter",
    role: "UI/UX Designer",
    department: "Design",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "2",
    name: "Sarah Smith",
    role: "Frontend Developer",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Backend Engineer",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: "4",
    name: "Emily Johnson",
    role: "HR Manager",
    department: "Human Resources",
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: "5",
    name: "Daniel Lee",
    role: "Product Manager",
    department: "Product",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "6",
    name: "Sophia Williams",
    role: "QA Engineer",
    department: "Quality Assurance",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    id: "7",
    name: "Oliver Davis",
    role: "Full Stack Developer",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: "8",
    name: "Ava Thompson",
    role: "Marketing Specialist",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/150?img=39",
  },
];

// Tabs
const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-md font-medium transition-colors border-b-2 ${
      active
        ? "border-blue-600 text-blue-600 bg-blue-50/50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState("Default");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSelection = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedEmployees.length === MOCK_EMPLOYEES.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(MOCK_EMPLOYEES.map((e) => e.id));
    }
  };

  const filteredEmployees = MOCK_EMPLOYEES.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-700 cursor-pointer">Employees</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <Link href="/employees/create" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Employee
        </Link>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="p-4 flex items-center gap-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
          <TabButton
            label="Default"
            icon={ListFilter}
            active={activeTab === "Default"}
            onClick={() => setActiveTab("Default")}
          />
          <TabButton
            label="My Team"
            icon={Users}
            active={activeTab === "My Team"}
            onClick={() => setActiveTab("My Team")}
          />
          <TabButton
            label="My Department"
            icon={Users}
            active={activeTab === "My Department"}
            onClick={() => setActiveTab("My Department")}
          />
          <TabButton
            label="Archived"
            icon={Archive}
            active={activeTab === "Archived"}
            onClick={() => setActiveTab("Archived")}
          />
          <TabButton
            label="Newly Hired"
            icon={Calendar}
            active={activeTab === "Newly Hired"}
            onClick={() => setActiveTab("Newly Hired")}
          />
          <button className="px-3 py-2 text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          {/* Left: Group By */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                Group by
              </span>
              <select className="pl-20 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48">
                <option>-</option>
                <option>Department</option>
                <option>Role</option>
              </select>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
            <div className="relative md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1"
              />
            </div>

            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <Filter className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-gray-200 text-gray-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>

            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                Sort by
              </span>
              <select className="pl-16 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-40">
                <option>-</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Row + Employee Grid */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              checked={
                selectedEmployees.length === MOCK_EMPLOYEES.length &&
                MOCK_EMPLOYEES.length > 0
              }
              onChange={toggleAll}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isSelected={selectedEmployees.includes(employee.id)}
                onToggleSelect={toggleSelection}
              />
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No employees found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
