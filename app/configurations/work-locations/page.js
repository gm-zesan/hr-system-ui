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
  Building2,
  Home as HomeIcon,
  MapPin,
  MoreVertical,
} from "lucide-react";

// Mock data for work locations
const MOCK_WORK_LOCATIONS = [
  {
    id: "1",
    name: "Home",
    locationType: "Home",
    status: "active",
    company: "TechNova Solutions Pvt. Ltd.",
  },
  {
    id: "2",
    name: "Building 1, Second Floor",
    locationType: "Office",
    status: "active",
    company: "TechNova Solutions Pvt. Ltd.",
  },
  {
    id: "3",
    name: "Other",
    locationType: "Other",
    status: "active",
    company: "TechNova Solutions Pvt. Ltd.",
  },
];

// Tab Component
const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
      active
        ? "text-blue-600 bg-blue-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

export default function WorkLocationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === MOCK_WORK_LOCATIONS.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(MOCK_WORK_LOCATIONS.map((item) => item.id));
    }
  };

  const filteredLocations = MOCK_WORK_LOCATIONS.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (activeTab === "All") return matchesSearch;
    return matchesSearch && location.locationType === activeTab;
  });

  const getLocationTypeIcon = (type) => {
    switch (type) {
      case "Home":
        return <HomeIcon className="w-4 h-4 text-green-600" />;
      case "Office":
        return <Building2 className="w-4 h-4 text-orange-600" />;
      case "Other":
        return <MapPin className="w-4 h-4 text-blue-600" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLocationTypeColor = (type) => {
    switch (type) {
      case "Home":
        return "text-green-600";
      case "Office":
        return "text-orange-600";
      case "Other":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-700 cursor-pointer">
          Configurations
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-700 cursor-pointer">
          Work Locations
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Work Locations</h1>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Work Location
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="px-4 pt-4 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <TabButton
              label="All"
              active={activeTab === "All"}
              onClick={() => setActiveTab("All")}
            />
            <TabButton
              label="Office"
              icon={Building2}
              active={activeTab === "Office"}
              onClick={() => setActiveTab("Office")}
            />
            <TabButton
              label="Home"
              icon={HomeIcon}
              active={activeTab === "Home"}
              onClick={() => setActiveTab("Home")}
            />
            <TabButton
              label="Other"
              icon={MapPin}
              active={activeTab === "Other"}
              onClick={() => setActiveTab("Other")}
            />
          </div>
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
                <option>Location Type</option>
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
                      selectedItems.length === MOCK_WORK_LOCATIONS.length &&
                      MOCK_WORK_LOCATIONS.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Company
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.map((location) => (
                <tr
                  key={location.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(location.id)}
                      onChange={() => toggleSelection(location.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getLocationTypeIcon(location.locationType)}
                      <span
                        className={`font-medium ${getLocationTypeColor(
                          location.locationType
                        )}`}
                      >
                        {location.locationType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {location.company}
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

          {filteredLocations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No work locations found matching your search.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to {filteredLocations.length} of {filteredLocations.length}{" "}
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
