"use client";
import React, { useState } from "react";
import { ChevronRight, Mail, Phone, DollarSign, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Mock employee data - in a real app, this would come from an API
const EMPLOYEE_DATA = {
    employee_code: "EMP001",
    first_name: "Aarav",
    last_name: "Mehta",
    email: "aarav.mehta@email.com",
    phone: "+91-9876543201",
    date_of_birth: "1990-05-15",
    gender: "male",
    marital_status: "single",
    nationality: "Indian",
    national_id: "ABCD1234567",
    passport_number: "P12345678",
    department_name: "Engineering",
    job_position_name: "Software Engineer",
    job_title_name: "Senior Developer",
    work_location_name: "Dhaka Office",
    manager_name: "John Smith",
    employment_type: "full-time",
    date_of_joining: "2020-01-15",
    probation_end_date: "2020-07-15",
    salary: "75000",
    work_shift_name: "Morning Shift (9 AM - 5 PM)",
    tags: ["Senior", "Remote", "Full-stack"],
    is_active: true,
    profile_picture: "",
    street: "123 Main Street",
    city: "Dhaka",
    state: "Dhaka Division",
    country: "Bangladesh",
    postal_code: "1200",
    emergency_contact_name: "Jane Mehta",
    emergency_contact_relationship: "Spouse",
    emergency_contact_phone: "+91-9876543202",
};

export default function EmployeeDetailsPage({ params }) {
    const unwrappedParams = use(params);
    const [activeTab, setActiveTab] = useState("work");

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                    {EMPLOYEE_DATA.first_name} {EMPLOYEE_DATA.last_name}
                </h1>
            </div>

            <div className="space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Profile Photo */}
                            <div className="flex justify-center lg:justify-start">
                                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                    {EMPLOYEE_DATA.profile_picture ? (
                                        <img
                                            src={EMPLOYEE_DATA.profile_picture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-4xl font-bold text-blue-600">
                                            {EMPLOYEE_DATA.first_name[0]}
                                            {EMPLOYEE_DATA.last_name[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Employee Code
                                </label>
                                <p className="text-base text-gray-900 font-medium">
                                    {EMPLOYEE_DATA.employee_code}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        First Name
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {EMPLOYEE_DATA.first_name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Last Name
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {EMPLOYEE_DATA.last_name}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Email
                                </label>
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{EMPLOYEE_DATA.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Phone
                                </label>
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{EMPLOYEE_DATA.phone}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Date of Birth
                                </label>
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{EMPLOYEE_DATA.date_of_birth}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Gender
                                    </label>
                                    <p className="text-base text-gray-900 capitalize">
                                        {EMPLOYEE_DATA.gender}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Marital Status
                                    </label>
                                    <p className="text-base text-gray-900 capitalize">
                                        {EMPLOYEE_DATA.marital_status}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nationality
                                </label>
                                <p className="text-base text-gray-900">
                                    {EMPLOYEE_DATA.nationality}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        National ID
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {EMPLOYEE_DATA.national_id}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Passport Number
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {EMPLOYEE_DATA.passport_number}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Information & Employment Details with Tabs */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* Tab Navigation */}
                    <div className="border-gray-200">
                        <nav className="p-2 flex items-center gap-6 border-b border-gray-200">
                            <button
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
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Department
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.department_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Job Position
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.job_position_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Job Title
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.job_title_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Work Location
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.work_location_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Manager
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.manager_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-8 mb-6">
                                        Emergency Contact
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Contact Name
                                                </label>
                                                <p className="text-base text-gray-900">
                                                    {EMPLOYEE_DATA.emergency_contact_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Relationship
                                                </label>
                                                <p className="text-base text-gray-900">
                                                    {EMPLOYEE_DATA.emergency_contact_relationship}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Contact Phone
                                                </label>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <p className="text-base">
                                                        {EMPLOYEE_DATA.emergency_contact_phone}
                                                    </p>
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
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Employment Type
                                        </label>
                                        <p className="text-base text-gray-900 capitalize">
                                            {EMPLOYEE_DATA.employment_type.replace("-", " ")}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Date of Joining
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">
                                                {EMPLOYEE_DATA.date_of_joining}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Probation End Date
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">
                                                {EMPLOYEE_DATA.probation_end_date}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Salary
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">{EMPLOYEE_DATA.salary}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Work Shift
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {EMPLOYEE_DATA.work_shift_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Tags
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {EMPLOYEE_DATA.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Status
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {EMPLOYEE_DATA.is_active ? (
                                                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-8 mb-6">
                                        Address
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Street Address
                                                </label>
                                                <p className="text-base text-gray-900">
                                                    {EMPLOYEE_DATA.street}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        City
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {EMPLOYEE_DATA.city}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        State
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {EMPLOYEE_DATA.state}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        Country
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {EMPLOYEE_DATA.country}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        Postal Code
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {EMPLOYEE_DATA.postal_code}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
