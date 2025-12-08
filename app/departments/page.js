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
  Grid3x3,
  List,
} from "lucide-react";
import DepartmentCard from "@/app/components/DepartmentCard";
import DepartmentListItem from "@/app/components/DepartmentListItem";

// Mock data for departments
const MOCK_DEPARTMENTS = [
  {
    id: "1",
    name: "Administration",
    code: "ADM-001",
    manager_name: "Paul Williams 1",
    description: "Handles all administrative tasks and office management.",
    is_active: true,
  },
  {
    id: "2",
    name: "Long Term Projects",
    code: "LTP-002",
    manager_name: "Paul Williams 2",
    description: "Oversees projects with extended timelines and complex deliverables.",
    is_active: false,
  },
  {
    id: "3",
    name: "Management",
    code: "MGT-003",
    manager_name: "Paul Williams 1",
    description: "Responsible for strategic planning and overall company direction.",
    is_active: true,
  },
  {
    id: "4",
    name: "Professional Services",
    code: "PS-004",
    manager_name: "Paul Williams 2",
    description: "Provides expert consulting and implementation services to clients.",
    is_active: true,
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
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [groupBy, setGroupBy] = useState("-");
  const [sortBy, setSortBy] = useState("-");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState("");
  const [filterManager, setFilterManager] = useState("");
  const [filterCode, setFilterCode] = useState("");

  // Calculate filter count
  const filterCount = React.useMemo(() => {
    let count = 0;
    if (filterStatus) count++;
    if (filterManager) count++;
    if (filterCode) count++;
    return count;
  }, [filterStatus, filterManager, filterCode]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilterStatus("");
    setFilterManager("");
    setFilterCode("");
    setShowFilters(false);
  };

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

  // Filter departments
  const filteredDepartments = MOCK_DEPARTMENTS.filter((dept) => {
    // Search filter
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = !filterStatus || 
      (filterStatus === "active" && dept.is_active) ||
      (filterStatus === "inactive" && !dept.is_active);
    
    // Manager filter
    const matchesManager = !filterManager ||
      dept.manager_name === filterManager;
    
    // Code filter
    const matchesCode = !filterCode ||
      (dept.code && dept.code.toLowerCase().includes(filterCode.toLowerCase()));
    
    return matchesSearch && matchesStatus && matchesManager && matchesCode;
  });

  // Sort departments
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "code-asc") {
      return (a.code || "").localeCompare(b.code || "");
    } else if (sortBy === "code-desc") {
      return (b.code || "").localeCompare(a.code || "");
    }
    return 0;
  });

  // Group departments
  const groupedDepartments = React.useMemo(() => {
    if (groupBy === "-") {
      return { "All Departments": sortedDepartments };
    } else if (groupBy === "manager") {
      return sortedDepartments.reduce((groups, dept) => {
        const key = dept.manager_name || "No Manager";
        if (!groups[key]) groups[key] = [];
        groups[key].push(dept);
        return groups;
      }, {});
    } else if (groupBy === "status") {
      return sortedDepartments.reduce((groups, dept) => {
        const key = dept.is_active ? "Active" : "Inactive";
        if (!groups[key]) groups[key] = [];
        groups[key].push(dept);
        return groups;
      }, {});
    }
    return { "All Departments": sortedDepartments };
  }, [groupBy, sortedDepartments]);

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
          {/* <TabButton
            label="Archived Departments"
            icon={Archive}
            active={activeTab === "Archived Departments"}
            onClick={() => setActiveTab("Archived Departments")}
          />
          <button className="px-3 py-2 text-gray-400 hover:text-gray-600 ml-auto">
            <MoreVertical className="w-4 h-4" />
          </button> */}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          {/* Left: Group By */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                Group by
              </span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="pl-24 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 focus:ring-blue-500 w-full md:w-48 appearance-none"
              >
                <option value="-">-</option>
                <option value="manager">Manager</option>
                <option value="status">Status</option>
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
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Filter className="w-5 h-5" />
              {filterCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {filterCount}
                </span>
              )}
            </button>

            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-16 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 focus:ring-blue-500 w-40 appearance-none"
              >
                <option value="-">-</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="code-asc">Code (A-Z)</option>
                <option value="code-desc">Code (Z-A)</option>
              </select>
              <ChevronRight className="rotate-90 w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Manager
                </label>
                <select 
                  value={filterManager}
                  onChange={(e) => setFilterManager(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Managers</option>
                  <option value="Paul Williams 1">Paul Williams 1</option>
                  <option value="Paul Williams 2">Paul Williams 2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Code
                </label>
                <input
                  type="text"
                  placeholder="Filter by code..."
                  value={filterCode}
                  onChange={(e) => setFilterCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Selection Row + Department Grid/List */}
        <div className="p-6">
          {viewMode === "grid" && groupBy === "-" && (
            <div className="flex items-center gap-3 mb-5">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                checked={
                  selectedDepartments.length === sortedDepartments.length &&
                  sortedDepartments.length > 0
                }
                onChange={toggleAll}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div>
              {Object.entries(groupedDepartments).map(([groupName, departments]) => (
                <div key={groupName} className="mb-6">
                  {groupBy !== "-" && (
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                      {groupName} ({departments.length})
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {departments.map((department) => (
                      <DepartmentCard
                        key={department.id}
                        department={department}
                        isSelected={selectedDepartments.includes(department.id)}
                        onToggleSelect={toggleSelection}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div>
              {Object.entries(groupedDepartments).map(([groupName, departments]) => (
                <div key={groupName} className="mb-6">
                  {groupBy !== "-" && (
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                      {groupName} ({departments.length})
                    </h3>
                  )}
                  <div className="border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-2 text-left w-12">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                              checked={
                                departments.every(d => selectedDepartments.includes(d.id)) &&
                                departments.length > 0
                              }
                              onChange={() => {
                                const allSelected = departments.every(d => selectedDepartments.includes(d.id));
                                if (allSelected) {
                                  setSelectedDepartments(prev => 
                                    prev.filter(id => !departments.find(d => d.id === id))
                                  );
                                } else {
                                  setSelectedDepartments(prev => [
                                    ...prev,
                                    ...departments.filter(d => !prev.includes(d.id)).map(d => d.id)
                                  ]);
                                }
                              }}
                            />
                          </th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Name</th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Code</th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Manager</th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Description</th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Status</th>
                          <th className="p-2 text-left font-semibold text-sm text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments.map((department) => (
                          <DepartmentListItem
                            key={department.id}
                            department={department}
                            isSelected={selectedDepartments.includes(department.id)}
                            onToggleSelect={toggleSelection}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sortedDepartments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No departments found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
