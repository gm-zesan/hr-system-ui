"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, MoreVertical, Search, X } from "lucide-react";

export default function ManageResumesPage({ params }) {
    const [resumes, setResumes] = useState([]);
    const [groupBy, setGroupBy] = useState("-");
    const [searchQuery, setSearchQuery] = useState("");
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showDisplayTypeDropdown, setShowDisplayTypeDropdown] = useState(false);
    const groupDropdownRef = useRef(null);
    const typeDropdownRef = useRef(null);
    const displayTypeDropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        startDate: "",
        endDate: "",
        displayType: "",
        description: "",
    });

    const typeOptions = ["Education", "Work Experience", "Certification", "Project"];
    const displayTypeOptions = ["Resume", "Cover Letter", "Certificate"];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
                setShowGroupDropdown(false);
            }
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
                setShowTypeDropdown(false);
            }
            if (
                displayTypeDropdownRef.current &&
                !displayTypeDropdownRef.current.contains(event.target)
            ) {
                setShowDisplayTypeDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCreate = () => {
        // Add resume creation logic here
        setIsClosing(true);
        setTimeout(() => {
            setShowAddModal(false);
            setIsClosing(false);
            setIsAnimating(false);
            setFormData({
                title: "",
                type: "",
                startDate: "",
                endDate: "",
                displayType: "",
                description: "",
            });
        }, 300);
    };

    const handleCreateAndAnother = () => {
        // Add resume creation logic here
        setFormData({
            title: "",
            type: "",
            startDate: "",
            endDate: "",
            displayType: "",
            description: "",
        });
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowAddModal(false);
            setIsClosing(false);
            setIsAnimating(false);
        }, 300);
    };

    const handleOpenModal = () => {
        setShowAddModal(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 10);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Header with Add Resume Button */}
                <div className="p-6 flex items-center justify-end border-b border-gray-200">
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Resume
                    </button>
                </div>

                {/* Filters Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-4">
                        {/* Group By Filter */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Group by</span>
                            <div className="relative" ref={groupDropdownRef}>
                                <button
                                    onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                                    className="min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm text-gray-900">{groupBy}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform ${showGroupDropdown ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {showGroupDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <button
                                            onClick={() => {
                                                setGroupBy("-");
                                                setShowGroupDropdown(false);
                                            }}
                                            className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => {
                                                setGroupBy("Display Type");
                                                setShowGroupDropdown(false);
                                            }}
                                            className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                        >
                                            Display Type
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search and Filter Icons */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Title
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Start Date
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        End Date
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Display Type
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <span className="text-sm font-semibold text-gray-900">
                                        Description
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Created By
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                                <svg
                                                    className="w-6 h-6 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                                No employee resumes
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Create a employee resume to get started.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Resume Modal */}
            {showAddModal && (
                <div
                    className={`fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isAnimating && !isClosing ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${isAnimating && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Create Employee Resume
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Title<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter title"
                                    />
                                </div>

                                {/* Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Type
                                    </label>
                                    <div className="relative" ref={typeDropdownRef}>
                                        <button
                                            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <span
                                                className={`text-sm ${formData.type ? "text-gray-900" : "text-gray-400"}`}
                                            >
                                                {formData.type || "Select an option"}
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-400 transition-transform ${showTypeDropdown ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        {showTypeDropdown && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                {typeOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                type: option,
                                                            });
                                                            setShowTypeDropdown(false);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Duration Section */}
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-4">Duration</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Start Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Start Date<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    startDate: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    endDate: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Display Type */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Display Type<span className="text-red-500">*</span>
                                </label>
                                <div className="relative" ref={displayTypeDropdownRef}>
                                    <button
                                        onClick={() =>
                                            setShowDisplayTypeDropdown(!showDisplayTypeDropdown)
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <span
                                            className={`text-sm ${formData.displayType ? "text-gray-900" : "text-gray-400"}`}
                                        >
                                            {formData.displayType || "Select an option"}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform ${showDisplayTypeDropdown ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {showDisplayTypeDropdown && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {displayTypeOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            displayType: option,
                                                        });
                                                        setShowDisplayTypeDropdown(false);
                                                    }}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Enter description"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={handleCreate}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                            >
                                Create
                            </button>
                            <button
                                onClick={handleCreateAndAnother}
                                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors"
                            >
                                Create & create another
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
