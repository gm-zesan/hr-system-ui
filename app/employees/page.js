import React from "react";
import { ChevronRight, Plus } from "lucide-react";
import { getEmployees } from "@/api/employees/getEmployees";
import EmployeesClient from "./EmployeesClient";
import Link from "next/link";

export default async function EmployeesPage({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const search = params?.search || "";

    const { items: employees, total, pages: totalPages } = await getEmployees(page, limit, search);

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span>Employees</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">List</span>
                </div>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                        <p className="text-gray-600 mt-1">
                            Manage your organization{"'s"} workforce
                        </p>
                    </div>
                    <Link
                        href="/employees/create"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        New Employee
                    </Link>
                </div>

                {/* Client Component */}
                <EmployeesClient
                    employees={employees}
                    total={total}
                    currentPage={page}
                    totalPages={totalPages}
                    limit={limit}
                    showSuccessToast={params?.success === "true"}
                    showDeletedToast={params?.deleted === "true"}
                    initialSearch={search}
                />
            </div>
        </div>
    );
}
