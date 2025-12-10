"use client";
import React, { useState } from "react";
import { ChevronRight, Mail, Phone, DollarSign, Tag, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreateEmployeePage() {
    const [activeTab, setActiveTab] = useState("work");
    const [formData, setFormData] = useState({
        employee_code: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        nationality: "",
        national_id: "",
        passport_number: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        emergency_contact_name: "",
        emergency_contact_relationship: "",
        emergency_contact_phone: "",
        department_id: "",
        job_position_id: "",
        job_title_id: "",
        work_location_id: "",
        manager_id: "",
        employment_type: "",
        date_of_joining: "",
        probation_end_date: "",
        salary: "",
        work_shift_id: "",
        tag_ids: [],
        is_active: true,
        profile_picture: "",
    });

    const availableTags = [
        { id: "1", label: "Senior" },
        { id: "2", label: "Junior" },
        { id: "3", label: "Remote" },
        { id: "4", label: "On-site" },
        { id: "5", label: "Full-stack" },
        { id: "6", label: "Backend" },
        { id: "7", label: "Frontend" },
        { id: "8", label: "Team Lead" },
    ];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTagToggle = (tagId) => {
        setFormData((prev) => ({
            ...prev,
            tag_ids: prev.tag_ids.includes(tagId)
                ? prev.tag_ids.filter((id) => id !== tagId)
                : [...prev.tag_ids, tagId],
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, profile_picture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/employees" className="hover:text-gray-700 cursor-pointer">
                    Employees
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create Employee</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {/* Profile Photo */}
                                <div className="flex justify-center lg:justify-start">
                                    <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-4 hover:border-blue-500 transition-colors cursor-pointer relative overflow-hidden">
                                        {formData.profile_picture ? (
                                            <img
                                                src={formData.profile_picture}
                                                alt="Profile"
                                                className="absolute inset-0 object-cover rounded-full w-full h-full"
                                            />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-xs text-gray-600">
                                                    Upload Photo
                                                </p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Basic Information */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Employee Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.employee_code}
                                        onChange={(e) =>
                                            handleInputChange("employee_code", e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="EMP001"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.first_name}
                                            onChange={(e) =>
                                                handleInputChange("first_name", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.last_name}
                                            onChange={(e) =>
                                                handleInputChange("last_name", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange("email", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="john.doe@company.com"
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                handleInputChange("phone", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="+880-1234567890"
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Date of Birth
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.date_of_birth}
                                            onChange={(e) =>
                                                handleInputChange("date_of_birth", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Gender
                                        </label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) =>
                                                handleInputChange("gender", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Marital Status
                                        </label>
                                        <select
                                            value={formData.marital_status}
                                            onChange={(e) =>
                                                handleInputChange("marital_status", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Nationality
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(e) =>
                                            handleInputChange("nationality", e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Bangladeshi"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            National ID
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.national_id}
                                            onChange={(e) =>
                                                handleInputChange("national_id", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Passport Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.passport_number}
                                            onChange={(e) =>
                                                handleInputChange("passport_number", e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        {/* Tab Navigation */}
                        <div className="border-gray-200">
                            <nav className="p-2 flex items-center gap-6 border-b border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("work")}
                                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === "work"
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Work Information
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("employment")}
                                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === "employment"
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Employment Details
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {/* Work Information Tab */}
                            {activeTab === "work" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Department <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.department_id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "department_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Department</option>
                                                <option value="1">Engineering</option>
                                                <option value="2">Marketing</option>
                                                <option value="3">Sales</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Job Position
                                            </label>
                                            <select
                                                value={formData.job_position_id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "job_position_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Position</option>
                                                <option value="1">Software Engineer</option>
                                                <option value="2">Senior Engineer</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Job Title
                                            </label>
                                            <select
                                                value={formData.job_title_id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "job_title_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Title</option>
                                                <option value="1">Developer</option>
                                                <option value="2">Team Lead</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Work Location
                                            </label>
                                            <select
                                                value={formData.work_location_id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "work_location_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Location</option>
                                                <option value="1">Dhaka Office</option>
                                                <option value="2">Chittagong Office</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Manager
                                            </label>
                                            <select
                                                value={formData.manager_id}
                                                onChange={(e) =>
                                                    handleInputChange("manager_id", e.target.value)
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Manager</option>
                                                <option value="1">John Smith</option>
                                                <option value="2">Jane Doe</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        {/* Emergency Contact Section */}
                                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-8 mb-6">
                                            Emergency Contact
                                        </h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Contact Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.emergency_contact_name}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "emergency_contact_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Relationship
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            formData.emergency_contact_relationship
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "emergency_contact_relationship",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Spouse, Parent, Sibling"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Contact Phone
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            value={formData.emergency_contact_phone}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "emergency_contact_phone",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Employment Details Tab */}
                            {activeTab === "employment" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Employment Type
                                            </label>
                                            <select
                                                value={formData.employment_type}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "employment_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="full-time">Full Time</option>
                                                <option value="part-time">Part Time</option>
                                                <option value="contract">Contract</option>
                                                <option value="intern">Intern</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Date of Joining
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={formData.date_of_joining}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "date_of_joining",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Probation End Date
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={formData.probation_end_date}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "probation_end_date",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Salary
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={formData.salary}
                                                    onChange={(e) =>
                                                        handleInputChange("salary", e.target.value)
                                                    }
                                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="50000"
                                                />
                                                <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Work Shift
                                            </label>
                                            <select
                                                value={formData.work_shift_id}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "work_shift_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Shift</option>
                                                <option value="1">
                                                    Morning Shift (9 AM - 5 PM)
                                                </option>
                                                <option value="2">
                                                    Evening Shift (2 PM - 10 PM)
                                                </option>
                                                <option value="3">
                                                    Night Shift (10 PM - 6 AM)
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Tags
                                            </label>
                                            <div className="relative">
                                                <div className="w-full min-h-[44px] px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white flex flex-wrap gap-2 items-center">
                                                    {formData.tag_ids.map((tagId) => {
                                                        const tag = availableTags.find(
                                                            (t) => t.id === tagId
                                                        );
                                                        return tag ? (
                                                            <span
                                                                key={tagId}
                                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                                            >
                                                                {tag.label}
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleTagToggle(tagId)
                                                                    }
                                                                    className="hover:text-blue-900"
                                                                >
                                                                    <X className="w-3.5 h-3.5" />
                                                                </button>
                                                            </span>
                                                        ) : null;
                                                    })}
                                                    <select
                                                        value=""
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.value &&
                                                                !formData.tag_ids.includes(
                                                                    e.target.value
                                                                )
                                                            ) {
                                                                handleTagToggle(e.target.value);
                                                            }
                                                        }}
                                                        className="flex-1 min-w-[120px] border-none outline-none bg-transparent text-gray-500"
                                                    >
                                                        <option value="">Select tags...</option>
                                                        {availableTags
                                                            .filter(
                                                                (tag) =>
                                                                    !formData.tag_ids.includes(
                                                                        tag.id
                                                                    )
                                                            )
                                                            .map((tag) => (
                                                                <option key={tag.id} value={tag.id}>
                                                                    {tag.label}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 pointer-events-none"
                                                >
                                                    <Tag className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_active}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "is_active",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-900">
                                                    Active Employee
                                                </span>
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1 ml-8">
                                                Inactive employees will not appear in active lists
                                            </p>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        {/* Address Section */}
                                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-8 mb-6">
                                            Address
                                        </h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Street Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.street}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "street",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="123 Main Street"
                                                    />
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
                                                                handleInputChange(
                                                                    "city",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                                            State
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.state}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "state",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.country}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "country",
                                                                    e.target.value
                                                                )
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
                                                            value={formData.postal_code}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "postal_code",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
                        <Link href="/employees">
                            <button
                                type="button"
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                            Create Employee
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
