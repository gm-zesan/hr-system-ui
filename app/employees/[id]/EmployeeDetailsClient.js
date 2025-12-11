"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Mail, Phone, DollarSign, Tag, Calendar, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function EmployeeDetailsClient({ employee, onDelete }) {
    const [activeTab, setActiveTab] = useState("work");
    const [deleteModal, setDeleteModal] = useState({ show: false });
    const [isModalAnimating, setIsModalAnimating] = useState(false);
    const searchParams = useSearchParams();
    const showUpdated = searchParams.get("updated") === "true";
    const toastShown = useRef(false);

    useEffect(() => {
        if (showUpdated && !toastShown.current) {
            toastShown.current = true;
            const url = new URL(window.location.href);
            url.searchParams.delete("updated");
            window.history.replaceState({}, "", url.toString());
            toast.success("Employee updated successfully!");
        }
    }, [showUpdated]);

    const handleDeleteClick = () => {
        setDeleteModal({ show: true });
        setTimeout(() => {
            setIsModalAnimating(true);
        }, 10);
    };

    const handleDeleteCancel = () => {
        setIsModalAnimating(false);
        setTimeout(() => {
            setDeleteModal({ show: false });
        }, 300);
    };

    const handleDeleteConfirm = async () => {
        try {
            await onDelete();
        } catch (error) {
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to delete employee");
        }
    };

    const fullName = `${employee.first_name} ${employee.last_name}`;

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/employees" className="hover:text-gray-700 cursor-pointer">
                    Employees
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Details</span>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/employees/${employee.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit
                    </Link>
                    <button
                        onClick={handleDeleteClick}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Profile Photo */}
                            <div className="flex justify-center lg:justify-start">
                                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                    {employee.profile_picture ? (
                                        <img
                                            src={employee.profile_picture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-4xl font-bold text-blue-600">
                                            {employee.first_name[0]}
                                            {employee.last_name[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Employee Code
                                </label>
                                <p className="text-base text-gray-900 font-medium">
                                    {employee.employee_code}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        First Name
                                    </label>
                                    <p className="text-base text-gray-900">{employee.first_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Last Name
                                    </label>
                                    <p className="text-base text-gray-900">{employee.last_name}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Email
                                </label>
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{employee.email}</p>
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
                                    <p className="text-base">{employee.phone}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Date of Birth
                                </label>
                                <div className="flex items-center gap-2 text-gray-900">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{employee.date_of_birth}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Gender
                                    </label>
                                    <p className="text-base text-gray-900 capitalize">
                                        {employee.gender}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Marital Status
                                    </label>
                                    <p className="text-base text-gray-900 capitalize">
                                        {employee.marital_status}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nationality
                                </label>
                                <p className="text-base text-gray-900">{employee.nationality}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        National ID
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {employee.national_id}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Passport Number
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {employee.passport_number}
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
                                            {employee.department_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Job Position
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {employee.job_position_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Job Title
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {employee.job_title_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Work Location
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {employee.work_location_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Manager
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {employee.manager_name}
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
                                                    {employee.emergency_contact?.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                                    Relationship
                                                </label>
                                                <p className="text-base text-gray-900">
                                                    {employee.emergency_contact?.relationship}
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
                                                        {employee.emergency_contact?.phone}
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
                                            {employee.employment_type.replace("-", " ")}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Date of Joining
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">{employee.date_of_joining}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Probation End Date
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">
                                                {employee.probation_end_date}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Salary
                                        </label>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <p className="text-base">{employee.salary}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Work Shift
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {employee.work_shift_name}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Tags
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {employee.tags.map((tag, index) => (
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
                                            {employee.is_active ? (
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
                                                    {employee.address?.street}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        City
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {employee.address?.city}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        State
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {employee.address?.state}
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
                                                        {employee.address?.country}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                                        Postal Code
                                                    </label>
                                                    <p className="text-base text-gray-900">
                                                        {employee.address?.postal_code}
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
                                Delete Employee
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">{fullName}</span>? This action
                                cannot be undone.
                            </p>
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
        </>
    );
}
