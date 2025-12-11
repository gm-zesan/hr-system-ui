"use client";

import React, { useState, useEffect, useRef } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";
import EmployeeListItem from "@/app/components/EmployeeListItem";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
    ChevronRight,
    Plus,
    Search,
    Filter,
    ListFilter,
    Grid3x3,
    List,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from "lucide-react";

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

export default function EmployeesClient({
    employees,
    total,
    currentPage,
    totalPages,
    limit,
    showSuccessToast,
    showDeletedToast,
    initialSearch = ""
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("Default");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [viewMode, setViewMode] = useState("grid");
    const [groupBy, setGroupBy] = useState("-");
    const [sortBy, setSortBy] = useState("-");
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const successToastShown = useRef(false);
    const deletedToastShown = useRef(false);
    const searchTimeoutRef = useRef(null);
    const isInitialMount = useRef(true);

    // Handle search with debouncing (skip initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("search", searchTerm);
            } else {
                params.delete("search");
            }
            params.set("page", "1");
            router.push(`/employees?${params.toString()}`);
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]);

    // Pagination handler
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/employees?${params.toString()}`);
    };

    // Limit change handler
    const handleLimitChange = (newLimit) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit.toString());
        params.set("page", "1");
        router.push(`/employees?${params.toString()}`);
    };

    // Show success toast
    useEffect(() => {
        if (showSuccessToast && !successToastShown.current) {
            successToastShown.current = true;
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            window.history.replaceState({}, "", url.toString());
            toast.success("Employee created successfully!");
        }
    }, [showSuccessToast]);

    // Show deleted toast
    useEffect(() => {
        if (showDeletedToast && !deletedToastShown.current) {
            deletedToastShown.current = true;
            const url = new URL(window.location.href);
            url.searchParams.delete("deleted");
            window.history.replaceState({}, "", url.toString());
            toast.success("Employee deleted successfully!");
        }
    }, [showDeletedToast]);

    // Calculate filter count
    const filterCount = React.useMemo(() => {
        let count = 0;
        if (filterDepartment) count++;
        if (filterStatus) count++;
        return count;
    }, [filterDepartment, filterStatus]);

    // Clear all filters
    const clearAllFilters = () => {
        setFilterDepartment("");
        setFilterStatus("");
        setShowFilters(false);
    };

    const toggleSelection = (id) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map((e) => e.id));
        }
    };

    // Filter employees (client-side filters only, search is handled by API)
    const filteredEmployees = employees.filter((emp) => {
        const matchesDepartment =
            !filterDepartment || emp.department_id === parseInt(filterDepartment);
        const matchesStatus =
            !filterStatus ||
            (filterStatus === "active" && emp.is_active) ||
            (filterStatus === "inactive" && !emp.is_active);
        return matchesDepartment && matchesStatus;
    });

    // Sort employees
    const sortedEmployees = React.useMemo(() => {
        const sorted = [...filteredEmployees];

        if (sortBy === "name-asc") {
            sorted.sort((a, b) => {
                const nameA = `${a.first_name} ${a.last_name}`;
                const nameB = `${b.first_name} ${b.last_name}`;
                return nameA.localeCompare(nameB);
            });
        } else if (sortBy === "name-desc") {
            sorted.sort((a, b) => {
                const nameA = `${a.first_name} ${a.last_name}`;
                const nameB = `${b.first_name} ${b.last_name}`;
                return nameB.localeCompare(nameA);
            });
        } else if (sortBy === "code-asc") {
            sorted.sort((a, b) => (a.employee_code || "").localeCompare(b.employee_code || ""));
        } else if (sortBy === "code-desc") {
            sorted.sort((a, b) => (b.employee_code || "").localeCompare(a.employee_code || ""));
        }

        return sorted;
    }, [filteredEmployees, sortBy]);

    // Group employees
    const groupedEmployees = React.useMemo(() => {
        if (groupBy === "-") {
            return { "All Employees": sortedEmployees };
        }

        const groups = {};

        sortedEmployees.forEach((emp) => {
            let key;
            if (groupBy === "status") {
                key = emp.is_active ? "Active" : "Inactive";
            } else if (groupBy === "department") {
                key = emp.department_id ? `Department ${emp.department_id}` : "No Department";
            }

            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(emp);
        });

        return groups;
    }, [sortedEmployees, groupBy]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="p-4 flex items-center gap-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
                <TabButton
                    label="Default"
                    icon={ListFilter}
                    active={activeTab === "Default"}
                    onClick={() => setActiveTab("Default")}
                />
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
                            <option value="status">Status</option>
                            <option value="department">Department</option>
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
                            placeholder="Search employees..."
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
                            className="pl-16 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 focus:ring-blue-500 w-48 appearance-none"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Department
                            </label>
                            <input
                                type="text"
                                placeholder="Filter by department ID..."
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
                    <div key={groupName} className="mb-8 last:mb-0">
                        {/* Group Header */}
                        {groupBy !== "-" && (
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
                                <span className="text-sm text-gray-500">
                                    ({groupEmployees.length})
                                </span>
                            </div>
                        )}

                        {/* Grid View */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {groupEmployees.map((employee) => (
                                    <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        isSelected={selectedEmployees.includes(employee.id)}
                                        onToggleSelect={toggleSelection}
                                    />
                                ))}
                            </div>
                        )}

                        {/* List View */}
                        {viewMode === "list" && (
                            <div className="border border-gray-200 rounded-lg overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Name
                                            </th>
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Code
                                            </th>
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Email
                                            </th>
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Phone
                                            </th>
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Status
                                            </th>
                                            <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupEmployees.map((employee) => (
                                            <EmployeeListItem
                                                key={employee.id}
                                                employee={employee}
                                                isSelected={selectedEmployees.includes(employee.id)}
                                                onToggleSelect={toggleSelection}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}

                {sortedEmployees.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p>No employees found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Show</span>
                    <select
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="px-2 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span>
                        of {total} employee{total !== 1 ? "s" : ""}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                        currentPage === pageNum
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
