"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    ListFilter,
    ChevronRight,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SkillTypeListItem from "@/app/components/SkillTypeListItem";

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

export default function SkillTypesClient({
    skillTypes,
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
    const [selectedSkillTypes, setSelectedSkillTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [groupBy, setGroupBy] = useState("-");
    const [sortBy, setSortBy] = useState("-");
    const [showFilters, setShowFilters] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: "" });
    const [isModalAnimating, setIsModalAnimating] = useState(false);

    // Filter states
    const [filterStatus, setFilterStatus] = useState("");
    const [filterCode, setFilterCode] = useState("");

    // Ref to track if toasts have been shown
    const successToastShown = useRef(false);
    const deletedToastShown = useRef(false);
    const searchTimeoutRef = useRef(null);
    const isInitialMount = useRef(true);

    // Handle search with debouncing (skip initial mount)
    useEffect(() => {
        // Skip the effect on initial mount to avoid unnecessary API call
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
            params.set("page", "1"); // Reset to first page on search
            router.push(`/configurations/skill_types?${params.toString()}`);
        }, 500); // 500ms debounce

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]); // Removed router and searchParams from dependencies

    // Pagination handler
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/configurations/skill_types?${params.toString()}`);
    };

    // Limit change handler
    const handleLimitChange = (newLimit) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit.toString());
        params.set("page", "1"); // Reset to first page when changing limit
        router.push(`/configurations/skill_types?${params.toString()}`);
    };

    // Show success toast when redirected from create page
    useEffect(() => {
        if (showSuccessToast && !successToastShown.current) {
            successToastShown.current = true;

            // Clean up URL parameter first
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            window.history.replaceState({}, "", url.toString());

            toast.success("Skill Type created successfully!");
        }
    }, [showSuccessToast]);

    // Show deleted toast when redirected after deletion
    useEffect(() => {
        if (showDeletedToast && !deletedToastShown.current) {
            deletedToastShown.current = true;

            // Clean up URL parameter first
            const url = new URL(window.location.href);
            url.searchParams.delete("deleted");
            window.history.replaceState({}, "", url.toString());

            toast.success("Skill Type deleted successfully!");
        }
    }, [showDeletedToast]);

    // Calculate filter count
    const filterCount = React.useMemo(() => {
        let count = 0;
        if (filterStatus) count++;
        if (filterCode) count++;
        return count;
    }, [filterStatus, filterCode]);

    // Clear all filters
    const clearAllFilters = () => {
        setFilterStatus("");
        setFilterCode("");
        setShowFilters(false);
    };

    // Handle delete
    const handleDeleteClick = (id, title) => {
        setDeleteModal({ show: true, id, title });
        // Trigger animation after modal is rendered
        setTimeout(() => {
            setIsModalAnimating(true);
        }, 10);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/configurations/skill_types/${deleteModal.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete skill type");
            }

            setIsModalAnimating(false);
            setTimeout(() => {
                setDeleteModal({ show: false, id: null, title: "" });
            }, 300);
            toast.success("Skill type deleted successfully!");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to delete skill type");
        }
    };

    const handleDeleteCancel = () => {
        setIsModalAnimating(false);
        setTimeout(() => {
            setDeleteModal({ show: false, id: null, title: "" });
        }, 300);
    };

    const toggleSelection = (id) => {
        setSelectedSkillTypes((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedSkillTypes.length === skillTypes.length) {
            setSelectedSkillTypes([]);
        } else {
            setSelectedSkillTypes(skillTypes.map((d) => d.id));
        }
    };

    // Filter skillTypes (client-side filters only, search is handled by API)
    const filteredSkillTypes = skillTypes.filter((st) => {
        const matchesStatus =
            !filterStatus ||
            (filterStatus === "active" && st.is_active) ||
            (filterStatus === "inactive" && !st.is_active);

        const matchesCode =
            !filterCode || (st.code && st.code.toLowerCase().includes(filterCode.toLowerCase()));

        return matchesStatus && matchesCode;
    });

    // Sort skillTypes
    const sortedSkillTypes = [...filteredSkillTypes].sort((a, b) => {
        if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name);
        } else if (sortBy === "sequence-asc") {
            return a.sequence - b.sequence;
        } else if (sortBy === "sequence-desc") {
            return b.sequence - a.sequence;
        }
        return 0;
    });

    // Group skillTypes
    const groupedSkillTypes = React.useMemo(() => {
        if (groupBy === "-") {
            return { "All Skill Types": sortedSkillTypes };
        } else if (groupBy === "status") {
            return sortedSkillTypes.reduce((groups, st) => {
                const key = st.is_active ? "Active" : "Inactive";
                if (!groups[key]) groups[key] = [];
                groups[key].push(st);
                return groups;
            }, {});
        }
        return { "All Skill Types": sortedSkillTypes };
    }, [groupBy, sortedSkillTypes]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="p-4 flex items-center gap-4 border-b border-gray-200 overflow-x-auto">
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
                            placeholder="Search skill types..."
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
                            <option value="sequence-asc">Sequence (Low-High)</option>
                            <option value="sequence-desc">Sequence (High-Low)</option>
                        </select>
                        <ChevronRight className="rotate-90 w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Color
                            </th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Sequence
                            </th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedSkillTypes).map(([groupName, items]) => (
                            <React.Fragment key={groupName}>
                                {groupBy !== "-" && (
                                    <tr className="bg-gray-100">
                                        <td
                                            colSpan="8"
                                            className="p-2 text-sm font-semibold text-gray-700"
                                        >
                                            {groupName} ({items.length})
                                        </td>
                                    </tr>
                                )}
                                {items.map((skillType) => (
                                    <SkillTypeListItem
                                        key={skillType.id}
                                        skillType={skillType}
                                        isSelected={selectedSkillTypes.includes(skillType.id)}
                                        onToggleSelect={toggleSelection}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {filteredSkillTypes.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p>No skill types found</p>
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
                        of {total} skill type{total !== 1 ? "s" : ""}
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

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                    <div
                        className={`bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ${
                            isModalAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Skill Type
                            </h3>

                            <div className="mb-6">
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold">{deleteModal.title}</span>?
                                </p>
                                <p className="text-sm text-red-600 font-medium">
                                    This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
