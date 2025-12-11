"use client";

import React, { useState } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";
import EmployeeListItem from "@/app/components/EmployeeListItem";
import Link from "next/link";

import {
    ChevronRight,
    Plus,
    Search,
    Filter,
    ListFilter,
    Grid3x3,
    List,
} from "lucide-react";

const MOCK_EMPLOYEES = [
    {
        id: "1",
        name: "John Carter",
        role: "UI/UX Designer",
        department: "Design",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "john.carter@company.com",
        phone: "+1 (555) 123-4567",
        manager: "Sarah Johnson",
    },
    {
        id: "2",
        name: "Sarah Smith",
        role: "Frontend Developer",
        department: "Engineering",
        avatar: "https://i.pravatar.cc/150?img=32",
        email: "sarah.smith@company.com",
        phone: "+1 (555) 234-5678",
        manager: "Michael Brown",
    },
    {
        id: "3",
        name: "Michael Brown",
        role: "Backend Engineer",
        department: "Engineering",
        avatar: "https://i.pravatar.cc/150?img=48",
        email: "michael.brown@company.com",
        phone: "+1 (555) 345-6789",
        manager: "Daniel Lee",
    },
    {
        id: "4",
        name: "Emily Johnson",
        role: "HR Manager",
        department: "Human Resources",
        avatar: "https://i.pravatar.cc/150?img=24",
        email: "emily.johnson@company.com",
        phone: "+1 (555) 456-7890",
        manager: "John Carter",
    },
    {
        id: "5",
        name: "Daniel Lee",
        role: "Product Manager",
        department: "Product",
        avatar: "https://i.pravatar.cc/150?img=14",
        email: "daniel.lee@company.com",
        phone: "+1 (555) 567-8901",
        manager: "Sarah Smith",
    },
    {
        id: "6",
        name: "Sophia Williams",
        role: "QA Engineer",
        department: "Quality Assurance",
        avatar: "https://i.pravatar.cc/150?img=55",
        email: "sophia.williams@company.com",
        phone: "+1 (555) 678-9012",
        manager: "Oliver Davis",
    },
    {
        id: "7",
        name: "Oliver Davis",
        role: "Full Stack Developer",
        department: "Engineering",
        avatar: "https://i.pravatar.cc/150?img=19",
        email: "oliver.davis@company.com",
        phone: "+1 (555) 789-0123",
        manager: "Emily Johnson",
    },
    {
        id: "8",
        name: "Ava Thompson",
        role: "Marketing Specialist",
        department: "Marketing",
        avatar: "https://i.pravatar.cc/150?img=39",
        email: "ava.thompson@company.com",
        phone: "+1 (555) 890-1234",
        manager: "Sophia Williams",
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
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
    const [groupBy, setGroupBy] = useState("-");
    const [sortBy, setSortBy] = useState("-");
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterManager, setFilterManager] = useState("");

    // Calculate filter count
    const filterCount = React.useMemo(() => {
        let count = 0;
        if (filterDepartment) count++;
        if (filterRole) count++;
        if (filterManager) count++;
        return count;
    }, [filterDepartment, filterRole, filterManager]);

    // Clear all filters
    const clearAllFilters = () => {
        setFilterDepartment("");
        setFilterRole("");
        setFilterManager("");
        setShowFilters(false);
    };

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

    // Filter employees
    const filteredEmployees = MOCK_EMPLOYEES.filter((emp) => {
        // Search filter
        const matchesSearch =
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase());

        // Department filter
        const matchesDepartment = !filterDepartment || emp.department === filterDepartment;

        // Role filter
        const matchesRole = !filterRole || emp.role === filterRole;

        // Manager filter
        const matchesManager = !filterManager || emp.manager === filterManager;

        return matchesSearch && matchesDepartment && matchesRole && matchesManager;
    });

    // Sort employees
    const sortedEmployees = React.useMemo(() => {
        const sorted = [...filteredEmployees];

        if (sortBy === "name-asc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name-desc") {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === "role-asc") {
            sorted.sort((a, b) => a.role.localeCompare(b.role));
        } else if (sortBy === "role-desc") {
            sorted.sort((a, b) => b.role.localeCompare(a.role));
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
            if (groupBy === "department") {
                key = emp.department || "No Department";
            } else if (groupBy === "role") {
                key = emp.role || "No Role";
            } else if (groupBy === "manager") {
                key = emp.manager || "No Manager";
            }

            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(emp);
        });

        return groups;
    }, [sortedEmployees, groupBy]);

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
                <Link
                    href="/employees/create"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
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
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
                    {/* Left: Group By */}
                    <div className="w-full md:w-auto">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                Group by
                            </span>
                            <select
                                value={groupBy}
                                onChange={(e) => setGroupBy(e.target.value)}
                                className="pl-20 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48"
                            >
                                <option value="-">-</option>
                                <option value="department">Department</option>
                                <option value="role">Role</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                    </div>
                    {/* Right Controls */}
                    <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
                        <div className="relative md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                            {filterCount > 0 && (
                                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {filterCount}
                                </span>
                            )}
                        </button>

                        <div className="relative hidden sm:block">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                Sort by
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-16 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 focus:ring-blue-500 w-44"
                            >
                                <option value="-">-</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="role-asc">Role (A-Z)</option>
                                <option value="role-desc">Role (Z-A)</option>
                            </select>
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
                                    Department
                                </label>
                                <select
                                    value={filterDepartment}
                                    onChange={(e) => setFilterDepartment(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">All Departments</option>
                                    <option value="Design">Design</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Human Resources">Human Resources</option>
                                    <option value="Product">Product</option>
                                    <option value="Quality Assurance">Quality Assurance</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">All Roles</option>
                                    <option value="UI/UX Designer">UI/UX Designer</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Engineer">Backend Engineer</option>
                                    <option value="HR Manager">HR Manager</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="Full Stack Developer">
                                        Full Stack Developer
                                    </option>
                                    <option value="Marketing Specialist">
                                        Marketing Specialist
                                    </option>
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
                                    <option value="Sarah Johnson">Sarah Johnson</option>
                                    <option value="Michael Brown">Michael Brown</option>
                                    <option value="Daniel Lee">Daniel Lee</option>
                                    <option value="John Carter">John Carter</option>
                                    <option value="Sarah Smith">Sarah Smith</option>
                                    <option value="Oliver Davis">Oliver Davis</option>
                                    <option value="Emily Johnson">Emily Johnson</option>
                                    <option value="Sophia Williams">Sophia Williams</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Row + Employee Grid/List */}
                <div className="p-6">
                    {Object.entries(groupedEmployees).map(([groupName, employees]) => (
                        <div key={groupName} className="mb-8 last:mb-0">
                            {/* Group Header */}
                            {groupBy !== "-" && (
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {groupName}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        ({employees.length})
                                    </span>
                                </div>
                            )}

                            {/* Grid View */}
                            {viewMode === "grid" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {employees.map((employee) => (
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
                                                    Job Position
                                                </th>
                                                <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                    Email
                                                </th>
                                                <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                    Phone
                                                </th>
                                                <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                    Department
                                                </th>
                                                <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                    Manager
                                                </th>
                                                <th className="p-4 text-left font-semibold text-sm text-gray-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee) => (
                                                <EmployeeListItem
                                                    key={employee.id}
                                                    employee={employee}
                                                    isSelected={selectedEmployees.includes(
                                                        employee.id
                                                    )}
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
                            No employees found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
