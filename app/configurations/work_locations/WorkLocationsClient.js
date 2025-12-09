"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ListFilter,
  ChevronRight,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import WorkLocationListItem from "@/app/components/WorkLocationListItem";

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

export default function WorkLocationsClient({ 
  workLocations, 
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
  const [selectedWorkLocations, setSelectedWorkLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [groupBy, setGroupBy] = useState("-");
  const [sortBy, setSortBy] = useState("-");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: "" });
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

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
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page on search
      router.push(`/configurations/work_locations?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Pagination handler
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/configurations/work_locations?${params.toString()}`);
  };

  // Limit change handler
  const handleLimitChange = (newLimit) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to first page when changing limit
    router.push(`/configurations/work_locations?${params.toString()}`);
  };

  // Show success toast when redirected from create page
  useEffect(() => {
    if (showSuccessToast && !successToastShown.current) {
      successToastShown.current = true;
      
      // Clean up URL parameter first
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      window.history.replaceState({}, '', url.toString());
      
      toast.success("Work Location created successfully!");
    }
  }, [showSuccessToast]);

  // Show deleted toast when redirected after deletion
  useEffect(() => {
    if (showDeletedToast && !deletedToastShown.current) {
      deletedToastShown.current = true;
      
      // Clean up URL parameter first
      const url = new URL(window.location.href);
      url.searchParams.delete('deleted');
      window.history.replaceState({}, '', url.toString());
      
      toast.success("Work Location deleted successfully!");
    }
  }, [showDeletedToast]);

  // Calculate filter count
  const filterCount = React.useMemo(() => {
    let count = 0;
    if (filterStatus) count++;
    if (filterCity) count++;
    if (filterCountry) count++;
    return count;
  }, [filterStatus, filterCity, filterCountry]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilterStatus("");
    setFilterCity("");
    setFilterCountry("");
    setShowFilters(false);
  };

  // Handle delete
  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
    // Trigger animation after modal is rendered
    setTimeout(() => {
      setIsModalAnimating(true);
    }, 10);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/work_locations/${deleteModal.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete work location');
      }
      
      setIsModalAnimating(false);
      setTimeout(() => {
        setDeleteModal({ show: false, id: null, name: "" });
      }, 300);
      toast.success("Work location deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete work location");
    }
  };

  const handleDeleteCancel = () => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setDeleteModal({ show: false, id: null, name: "" });
    }, 300);
  };

  const toggleSelection = (id) => {
    setSelectedWorkLocations((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Filter workLocations (client-side filters only, search is handled by API)
  const filteredWorkLocations = workLocations.filter((wl) => {
    const matchesStatus = !filterStatus || 
      (filterStatus === "active" && wl.is_active) ||
      (filterStatus === "inactive" && !wl.is_active);
    
    const matchesCity = !filterCity ||
      (wl.city && wl.city.toLowerCase().includes(filterCity.toLowerCase()));
    
    const matchesCountry = !filterCountry ||
      (wl.country && wl.country.toLowerCase().includes(filterCountry.toLowerCase()));
    
    return matchesStatus && matchesCity && matchesCountry;
  });

  // Sort workLocations
  const sortedWorkLocations = [...filteredWorkLocations].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "city-asc") {
      return (a.city || "").localeCompare(b.city || "");
    } else if (sortBy === "city-desc") {
      return (b.city || "").localeCompare(a.city || "");
    } else if (sortBy === "country-asc") {
      return (a.country || "").localeCompare(b.country || "");
    } else if (sortBy === "country-desc") {
      return (b.country || "").localeCompare(a.country || "");
    }
    return 0;
  });

  // Group workLocations
  const groupedWorkLocations = React.useMemo(() => {
    if (groupBy === "-") {
      return { "All Work Locations": sortedWorkLocations };
    } else if (groupBy === "city") {
      return sortedWorkLocations.reduce((groups, wl) => {
        const key = wl.city || "No City";
        if (!groups[key]) groups[key] = [];
        groups[key].push(wl);
        return groups;
      }, {});
    } else if (groupBy === "country") {
      return sortedWorkLocations.reduce((groups, wl) => {
        const key = wl.country || "No Country";
        if (!groups[key]) groups[key] = [];
        groups[key].push(wl);
        return groups;
      }, {});
    } else if (groupBy === "status") {
      return sortedWorkLocations.reduce((groups, wl) => {
        const key = wl.is_active ? "Active" : "Inactive";
        if (!groups[key]) groups[key] = [];
        groups[key].push(wl);
        return groups;
      }, {});
    }
    return { "All Work Locations": sortedWorkLocations };
  }, [groupBy, sortedWorkLocations]);

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
              <option value="city">City</option>
              <option value="country">Country</option>
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
              placeholder="Search work locations..."
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
              <option value="city-asc">City (A-Z)</option>
              <option value="city-desc">City (Z-A)</option>
              <option value="country-asc">Country (A-Z)</option>
              <option value="country-desc">Country (Z-A)</option>
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
                City
              </label>
              <input
                type="text"
                placeholder="Filter by city..."
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                placeholder="Filter by country..."
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Work Locations List */}
      <div className="p-6">
        <div>
          {Object.entries(groupedWorkLocations).map(([groupName, workLocationsGroup]) => (
            <div key={groupName} className="mb-6">
              {groupBy !== "-" && (
                <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  {groupName} ({workLocationsGroup.length})
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
                            workLocationsGroup.every(wl => selectedWorkLocations.includes(wl.id)) &&
                            workLocationsGroup.length > 0
                          }
                          onChange={() => {
                            const allSelected = workLocationsGroup.every(wl => selectedWorkLocations.includes(wl.id));
                            if (allSelected) {
                              setSelectedWorkLocations(prev => 
                                prev.filter(id => !workLocationsGroup.find(wl => wl.id === id))
                              );
                            } else {
                              setSelectedWorkLocations(prev => [
                                ...prev,
                                ...workLocationsGroup.filter(wl => !prev.includes(wl.id)).map(wl => wl.id)
                              ]);
                            }
                          }}
                        />
                      </th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Name</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Code</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">City</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Country</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Address</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Status</th>
                      <th className="p-2 text-left font-semibold text-sm text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workLocationsGroup.map((workLocation) => (
                      <WorkLocationListItem
                        key={workLocation.id}
                        workLocation={workLocation}
                        isSelected={selectedWorkLocations.includes(workLocation.id)}
                        onToggleSelect={toggleSelection}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        
        {sortedWorkLocations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No work locations found matching your search.
          </div>
        )}

        {/* Pagination */}
        {sortedWorkLocations.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200">
            {/* Pagination Info */}
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{((currentPage - 1) * limit) + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * limit, total)}</span> of{" "}
              <span className="font-medium">{total}</span> work locations
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Items per page */}
              <div className="flex items-center gap-2 mr-4">
                <label className="text-sm text-gray-600">Show:</label>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>

              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-300 ${
              isModalAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleDeleteCancel}
          />

          {/* Modal */}
          <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transition-all duration-300 ${
            isModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Modal Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Work Location</h3>
            </div>

            {/* Modal Body */}
            <div className="mb-6">
              <p className="text-gray-600 mb-3">
                Are you sure you want to delete the work location{" "}
                <span className="font-semibold text-gray-900">&ldquo;{deleteModal.name}&rdquo;</span>?
              </p>
              <p className="text-sm text-red-600 font-medium">
                This action cannot be undone.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
