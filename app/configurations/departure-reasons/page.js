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

// Mock data for departure reasons
const MOCK_DEPARTURE_REASONS = [
  {
    id: "1",
    name: "Retired",
  },
  {
    id: "2",
    name: "Resigned",
  },
  {
    id: "3",
    name: "Fired",
  },
];

export default function DepartureReasonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === MOCK_DEPARTURE_REASONS.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(MOCK_DEPARTURE_REASONS.map((item) => item.id));
    }
  };

  const filteredReasons = MOCK_DEPARTURE_REASONS.filter((reason) =>
    reason.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Departure Reasons
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Departure Reasons</h1>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Departure Reason
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          {/* Left: Sort Button */}
          <div className="w-full md:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowUpDown className="w-4 h-4" />
            </button>
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
                      selectedItems.length === MOCK_DEPARTURE_REASONS.length &&
                      MOCK_DEPARTURE_REASONS.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Name
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReasons.map((reason) => (
                <tr
                  key={reason.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(reason.id)}
                      onChange={() => toggleSelection(reason.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {reason.name}
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

          {filteredReasons.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No departure reasons found matching your search.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to {filteredReasons.length} of {filteredReasons.length}{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Per page</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 appearance-none"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
