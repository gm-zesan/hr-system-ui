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
    Briefcase,
    MoreVertical,
    X,
} from "lucide-react";

// Mock data for activity plans
const MOCK_ACTIVITY_PLANS = [
    {
        id: "1",
        name: "Offboarding",
        department: "",
        manager: "",
        company: "",
        status: "active",
    },
    {
        id: "2",
        name: "Onboarding",
        department: "Management",
        manager: "Paul Williams",
        company: "BlueOcean Technologies Inc.",
        status: "active",
    },
    {
        id: "3",
        name: "Verification",
        department: "Management",
        manager: "Paul Williams",
        company: "TechNova Solutions Pvt. Ltd.",
        status: "active",
    },
    {
        id: "4",
        name: "Review Candidate",
        department: "Management",
        manager: "Paul Williams",
        company: "TechNova Solutions Pvt. Ltd.",
        status: "active",
    },
];

// Tab Component
const TabButton = ({ active, label, count, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
            active
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
    >
        {label}{" "}
        {count !== undefined && (
            <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${
                    active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                }`}
            >
                {count}
            </span>
        )}
    </button>
);

export default function ActivityPlansPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        company: "",
        status: true,
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreate = () => {
        // Handle create logic
        console.log("Creating activity plan:", formData);
        setIsModalOpen(false);
        setFormData({
            name: "",
            department: "",
            company: "",
            status: true,
        });
    };

    const handleCreateAndAnother = () => {
        // Handle create and reset form
        console.log("Creating activity plan:", formData);
        setFormData({
            name: "",
            department: "",
            company: "",
            status: true,
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({
            name: "",
            department: "",
            company: "",
            status: true,
        });
    };

    const toggleSelection = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedItems.length === MOCK_ACTIVITY_PLANS.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(MOCK_ACTIVITY_PLANS.map((item) => item.id));
        }
    };

    const filteredPlans = MOCK_ACTIVITY_PLANS.filter((plan) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="hover:text-gray-700 cursor-pointer">Configurations</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-gray-700 cursor-pointer">Activity Plans</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">List</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Activity Plans</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    New Activity Plan
                </button>
            </div>

            {/* Main Card Container */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Sidebar Item Title */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-blue-600">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-semibold text-base">Activity Plans</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                        <TabButton
                            label="All"
                            count={4}
                            active={activeTab === "All"}
                            onClick={() => setActiveTab("All")}
                        />
                        <TabButton
                            label="Archived"
                            count={0}
                            active={activeTab === "Archived"}
                            onClick={() => setActiveTab("Archived")}
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
                                <option>Department</option>
                                <option>Company</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right: Search and Filters */}
                    <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
                        <div className="relative md:w-80">
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
                                            selectedItems.length === MOCK_ACTIVITY_PLANS.length &&
                                            MOCK_ACTIVITY_PLANS.length > 0
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
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        Department
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        Manager
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
                            {filteredPlans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(plan.id)}
                                            onChange={() => toggleSelection(plan.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {plan.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.department}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.manager}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.company}
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

                    {filteredPlans.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No activity plans found matching your search.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Create Activity Plan
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-6">
                                General Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full px-4 py-2.5 border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder=""
                                    />
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.department}
                                            onChange={(e) =>
                                                handleInputChange("department", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors text-gray-400"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="management">Management</option>
                                            <option value="administration">Administration</option>
                                            <option value="services">Professional Services</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <button
                                            type="button"
                                            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Company
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.company}
                                            onChange={(e) =>
                                                handleInputChange("company", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors text-gray-400"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="technova">
                                                TechNova Solutions Pvt. Ltd.
                                            </option>
                                            <option value="blueocean">
                                                BlueOcean Technologies Inc.
                                            </option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <button
                                            type="button"
                                            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Status
                                    </label>
                                    <button
                                        onClick={() =>
                                            handleInputChange("status", !formData.status)
                                        }
                                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                                            formData.status ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                                formData.status ? "translate-x-7" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3 rounded-b-lg">
                            <button
                                onClick={handleCreate}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Create
                            </button>
                            <button
                                onClick={handleCreateAndAnother}
                                className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
                            >
                                Create & create another
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
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
