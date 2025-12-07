"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  ListFilter,
  Users,
  Archive,
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";

// Mock data for job positions
const MOCK_JOB_POSITIONS = [
  {
    id: "1",
    position: "Quality Analyst",
    department: "Research & Development",
    company: "TechNova Solutions Pvt. Ltd.",
    status: "active",
  },
  {
    id: "2",
    position: "ReactJS Frontend Developer",
    department: "Research & Development",
    company: "TechNova Solutions Pvt. Ltd.",
    status: "active",
  },
  {
    id: "3",
    position: "Chartered Accountant",
    department: "Accounts",
    company: "SwiftRetail Pvt. Ltd.",
    status: "active",
  },
  {
    id: "4",
    position: "Legal Advisor",
    department: "",
    company: "",
    status: "active",
  },
  {
    id: "5",
    position: "Finance Analyst",
    department: "",
    company: "",
    status: "active",
  },
];

// Tab Component
const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
      active
        ? "border-blue-600 text-blue-600 bg-blue-50/50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

export default function JobPositionsPage() {
  const [activeTab, setActiveTab] = useState("Default");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupBy, setGroupBy] = useState("-");

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === MOCK_JOB_POSITIONS.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(MOCK_JOB_POSITIONS.map((item) => item.id));
    }
  };

  const filteredJobPositions = MOCK_JOB_POSITIONS.filter((position) =>
    position.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-700 cursor-pointer">
          Configurations
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-700 cursor-pointer">
          Job Positions
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Job Positions</h1>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Job Position
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="p-4 flex items-center border-b border-gray-200 overflow-x-auto">
          <TabButton
            label="Default"
            icon={ListFilter}
            active={activeTab === "Default"}
            onClick={() => setActiveTab("Default")}
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
          <button className="px-3 py-2 text-gray-400 hover:text-gray-600 ml-auto">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          {/* Left: Sort and Group By */}
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowUpDown className="w-4 h-4" />
            </button>

            <div className="relative flex-1 md:flex-initial">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                Group by
              </span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="pl-24 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48 appearance-none"
              >
                <option>-</option>
                <option>Department</option>
                <option>Company</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Right: Search and Filters */}
          <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
              <Filter className="w-5 h-5" />
            </button>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === MOCK_JOB_POSITIONS.length &&
                      MOCK_JOB_POSITIONS.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Job Position
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Department
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Company
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Status
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobPositions.map((position) => (
                <tr
                  key={position.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(position.id)}
                      onChange={() => toggleSelection(position.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {position.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {position.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {position.company}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3 justify-end">
                      <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>

                      <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>

                      <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors text-sm">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredJobPositions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No job positions found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
