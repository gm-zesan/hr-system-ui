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
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";

// Mock data for employment types
const MOCK_EMPLOYMENT_TYPES = [
  {
    id: "1",
    name: "Employee",
    code: "Employee",
    country: "",
  },
  {
    id: "2",
    name: "Statutory",
    code: "Statutory",
    country: "",
  },
  {
    id: "3",
    name: "Thesis",
    code: "Thesis",
    country: "",
  },
  {
    id: "4",
    name: "Apprenticeship",
    code: "Apprenticeship",
    country: "",
  },
  {
    id: "5",
    name: "Student",
    code: "Student",
    country: "",
  },
  {
    id: "6",
    name: "Intern",
    code: "Intern",
    country: "",
  },
];

export default function EmploymentTypesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupBy, setGroupBy] = useState("-");

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === MOCK_EMPLOYMENT_TYPES.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(MOCK_EMPLOYMENT_TYPES.map((item) => item.id));
    }
  };

  const filteredEmploymentTypes = MOCK_EMPLOYMENT_TYPES.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Employment Types
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Employment Types</h1>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Employment Type
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
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
                <option>Country</option>
                <option>Code</option>
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
                      selectedItems.length === MOCK_EMPLOYMENT_TYPES.length &&
                      MOCK_EMPLOYMENT_TYPES.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Employment Type
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Code
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Country
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmploymentTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(type.id)}
                      onChange={() => toggleSelection(type.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {type.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {type.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {type.country}
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

          {filteredEmploymentTypes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No employment types found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
