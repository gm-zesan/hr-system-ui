"use client";

import React, { useState } from "react";
import {
    ChevronRight,
    Briefcase,
    Lock,
    Settings,
    Mail,
    Phone,
    User,
    MapPin,
    Clock,
    Building2,
    Upload,
    QrCode,
    Plus,
} from "lucide-react";
import Link from "next/link";

// Tab Button Component
const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            active
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
        }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

export default function CreateEmployeePage() {
    const [activeTab, setActiveTab] = useState("work");
    const [formData, setFormData] = useState({
        // Work Information
        name: "",
        jobTitle: "",
        workEmail: "",
        workMobile: "",
        workPhone: "",
        employeeTags: "",
        department: "",
        jobPosition: "",
        manager: "",
        coach: "",
        workAddress: "",
        workLocation: "",
        timeOff: "",
        attendanceManager: "",
        company: "",
        color: "",

        // Private Information
        street1: "",
        street2: "",
        city: "",
        postalCode: "",
        country: "",
        state: "",
        privatePhone: "",
        bankAccount: "",
        privateEmail: "",
        privateCarPlate: "",
        distanceHomeToWork: "0",
        kmHomeToWork: "0",
        citizenshipCountry: "",
        citizenshipState: "",
        identificationId: "",
        ssnNo: "",
        sinNo: "",
        passportId: "",

        // Settings
        activeEmployee: true,
        flexibleWorkArrangement: false,
        fullyFlexibleSchedule: false,
        workPermitScheduledActivity: false,
        relatedUser: "",
        departureReason: "",
        badgeId: "",
        pin: "",
        primaryLanguage: "",
        additionalNotes: "",
        notes: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/employees" className="hover:text-gray-700 cursor-pointer">
                    Employees
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create Employees</h1>
            </div>

            {/* Main Form Container */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Form Content */}
                <div className="p-8">
                    {/* Work Information Tab Content */}
                    {activeTab === "work" && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                handleInputChange("name", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Job Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) =>
                                                handleInputChange("jobTitle", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Work Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Work Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={formData.workEmail}
                                                onChange={(e) =>
                                                    handleInputChange("workEmail", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Work Mobile */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Work Mobile
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={formData.workMobile}
                                                onChange={(e) =>
                                                    handleInputChange("workMobile", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Work Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Work Phone
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={formData.workPhone}
                                                onChange={(e) =>
                                                    handleInputChange("workPhone", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Employee Tags */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Employee Tags
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.employeeTags}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "employeeTags",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="">Select an option</option>
                                            </select>
                                            <button className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Image Upload */}
                                    <div className="flex justify-center">
                                        <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-4 hover:border-blue-500 transition-colors cursor-pointer">
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600">
                                                Drag & Drop
                                                <br />
                                                your files or{" "}
                                                <span className="text-blue-600 font-medium">
                                                    Browse
                                                </span>
                                            </p>
                                        </div>
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
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="">Select an option</option>
                                            </select>
                                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Job Position */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Job Position
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.jobPosition}
                                                onChange={(e) =>
                                                    handleInputChange("jobPosition", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="">Select an option</option>
                                            </select>
                                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Manager */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Manager
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.manager}
                                                onChange={(e) =>
                                                    handleInputChange("manager", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="">Select an option</option>
                                            </select>
                                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Coach */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Coach
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.coach}
                                                onChange={(e) =>
                                                    handleInputChange("coach", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                            >
                                                <option value="">Select an option</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <div className="flex items-center gap-6 border-b border-gray-200">
                                    <TabButton
                                        id="work"
                                        label="Work Information"
                                        icon={Briefcase}
                                        active={activeTab === "work"}
                                        onClick={() => setActiveTab("work")}
                                    />
                                    <TabButton
                                        id="private"
                                        label="Private Information"
                                        icon={Lock}
                                        active={activeTab === "private"}
                                        onClick={() => setActiveTab("private")}
                                    />
                                    <TabButton
                                        id="settings"
                                        label="Settings"
                                        icon={Settings}
                                        active={activeTab === "settings"}
                                        onClick={() => setActiveTab("settings")}
                                    />
                                </div>

                                {/* Location Section */}
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Location */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Location
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Work Address */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Work Address
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.workAddress}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "workAddress",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>

                                            {/* Work Location */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Work Location
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                        <MapPin className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        value={formData.workLocation}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "workLocation",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Approver Section */}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
                                            Approver
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Time Off */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Time Off
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.timeOff}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "timeOff",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>

                                            {/* Attendance Manager */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Attendance Manager
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.attendanceManager}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "attendanceManager",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Organization Details */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Organization Details
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Company */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Company
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                        <Building2 className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        value={formData.company}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "company",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Color */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Color
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.color}
                                                    onChange={(e) =>
                                                        handleInputChange("color", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Private Information Tab Content */}
                    {activeTab === "private" && (
                        <>
                            {/* Tabs */}
                            <div className="mb-8 border-b border-gray-200">
                                <div className="flex items-center gap-6">
                                    <TabButton
                                        id="work"
                                        label="Work Information"
                                        icon={Briefcase}
                                        active={activeTab === "work"}
                                        onClick={() => setActiveTab("work")}
                                    />
                                    <TabButton
                                        id="private"
                                        label="Private Information"
                                        icon={Lock}
                                        active={activeTab === "private"}
                                        onClick={() => setActiveTab("private")}
                                    />
                                    <TabButton
                                        id="settings"
                                        label="Settings"
                                        icon={Settings}
                                        active={activeTab === "settings"}
                                        onClick={() => setActiveTab("settings")}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Private Contact */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Private Contact
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Street 1
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.street1}
                                                    onChange={(e) =>
                                                        handleInputChange("street1", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Street 2
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.street2}
                                                    onChange={(e) =>
                                                        handleInputChange("street2", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) =>
                                                        handleInputChange("city", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.postalCode}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "postalCode",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Country
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.country}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "country",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    State
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.state}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "state",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Private Phone
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        value={formData.privatePhone}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "privatePhone",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Bank Account
                                                </label>
                                                <select
                                                    value={formData.bankAccount}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "bankAccount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                >
                                                    <option value="">Select an option</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Private Email
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        value={formData.privateEmail}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "privateEmail",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Private Car Plate
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.privateCarPlate}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "privateCarPlate",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Distance Home to Work
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={formData.distanceHomeToWork}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "distanceHomeToWork",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                        km
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Km Home to Work
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={formData.kmHomeToWork}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "kmHomeToWork",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                        km
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Citizenship */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Citizenship
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Country
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={formData.citizenshipCountry}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "citizenshipCountry",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                >
                                                    <option value="">Select an option</option>
                                                </select>
                                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                State
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={formData.citizenshipState}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "citizenshipState",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                >
                                                    <option value="">Select an option</option>
                                                </select>
                                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Identification ID
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.identificationId}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "identificationId",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                SSN No
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.ssnNo}
                                                onChange={(e) =>
                                                    handleInputChange("ssnNo", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                SIN No
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.sinNo}
                                                onChange={(e) =>
                                                    handleInputChange("sinNo", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Passport ID
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.passportId}
                                                onChange={(e) =>
                                                    handleInputChange("passportId", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Settings Tab Content */}
                    {activeTab === "settings" && (
                        <>
                            {/* Tabs */}
                            <div className="mb-8 border-b border-gray-200">
                                <div className="flex items-center gap-6">
                                    <TabButton
                                        id="work"
                                        label="Work Information"
                                        icon={Briefcase}
                                        active={activeTab === "work"}
                                        onClick={() => setActiveTab("work")}
                                    />
                                    <TabButton
                                        id="private"
                                        label="Private Information"
                                        icon={Lock}
                                        active={activeTab === "private"}
                                        onClick={() => setActiveTab("private")}
                                    />
                                    <TabButton
                                        id="settings"
                                        label="Settings"
                                        icon={Settings}
                                        active={activeTab === "settings"}
                                        onClick={() => setActiveTab("settings")}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Employment Status */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Employment Status
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Active Employee
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "activeEmployee",
                                                            !formData.activeEmployee
                                                        )
                                                    }
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.activeEmployee
                                                            ? "bg-blue-600"
                                                            : "bg-gray-300"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.activeEmployee
                                                                ? "translate-x-6"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Flexible Work Arrangement
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "flexibleWorkArrangement",
                                                            !formData.flexibleWorkArrangement
                                                        )
                                                    }
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.flexibleWorkArrangement
                                                            ? "bg-blue-600"
                                                            : "bg-gray-300"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.flexibleWorkArrangement
                                                                ? "translate-x-6"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Fully Flexible Schedule
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "fullyFlexibleSchedule",
                                                            !formData.fullyFlexibleSchedule
                                                        )
                                                    }
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.fullyFlexibleSchedule
                                                            ? "bg-blue-600"
                                                            : "bg-gray-300"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.fullyFlexibleSchedule
                                                                ? "translate-x-6"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Work Permit Scheduled Activity
                                                </label>
                                                <button
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "workPermitScheduledActivity",
                                                            !formData.workPermitScheduledActivity
                                                        )
                                                    }
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        formData.workPermitScheduledActivity
                                                            ? "bg-blue-600"
                                                            : "bg-gray-300"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            formData.workPermitScheduledActivity
                                                                ? "translate-x-6"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Related User
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                        <User className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        value={formData.relatedUser}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "relatedUser",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Departure Reason
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.departureReason}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "departureReason",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select an option</option>
                                                    </select>
                                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Information */}
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
                                        Additional Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Primary Language
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.primaryLanguage}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "primaryLanguage",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Additional Notes
                                                </label>
                                                <textarea
                                                    value={formData.additionalNotes}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "additionalNotes",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={1}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Notes
                                            </label>
                                            <textarea
                                                value={formData.notes}
                                                onChange={(e) =>
                                                    handleInputChange("notes", e.target.value)
                                                }
                                                rows={3}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance/Point of Sale */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Attendance/Point of Sale
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Badge ID
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <QrCode className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.badgeId}
                                                    onChange={(e) =>
                                                        handleInputChange("badgeId", e.target.value)
                                                    }
                                                    className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    <Upload className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                PIN
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.pin}
                                                onChange={(e) =>
                                                    handleInputChange("pin", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Form Actions */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                        Create
                    </button>
                    <button className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors">
                        Create & create another
                    </button>
                    <Link
                        href="/employees"
                        className="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </>
    );
}
