import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createDepartment } from "@/api/departments/createDepartment";
import { getDepartments } from "@/api/departments/getDepartments";
import CreateDepartmentForm from "./CreateDepartmentForm";

export default async function CreateDepartmentPage() {
    // Fetch existing departments for parent dropdown
    let departments = [];
    try {
        const departmentsData = await getDepartments(1, 100); // Get more departments for dropdown
        departments = departmentsData.items || [];
    } catch (error) {
        console.error("Error fetching departments:", error);
    }

    async function handleCreateDepartment(formData) {
        "use server";

        const action = formData.get("action");

        try {
            const payload = {
                name: formData.get("name"),
                code: formData.get("code"),
                description: formData.get("description") || null,
                parent_department_id: formData.get("parent_department_id")
                    ? parseInt(formData.get("parent_department_id"))
                    : null,
                manager_id: formData.get("manager_id")
                    ? parseInt(formData.get("manager_id"))
                    : null,
                is_active: formData.get("is_active") === "true",
            };

            await createDepartment(payload);
        } catch (error) {
            console.error("Error creating department:", error);
            throw error;
        }

        // Only redirect if action is "save", not "saveAndCreateAnother"
        if (action === "save") {
            redirect("/departments?success=true");
        }
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/departments" className="hover:text-gray-700 cursor-pointer">
                    Departments
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create Department</h1>
            </div>

            {/* Form Component */}
            <CreateDepartmentForm createAction={handleCreateDepartment} departments={departments} />
        </>
    );
}
