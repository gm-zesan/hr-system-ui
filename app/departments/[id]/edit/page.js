import React from "react";
import { redirect } from "next/navigation";
import { getDepartment } from "@/api/departments/getDepartment";
import { getDepartments } from "@/api/departments/getDepartments";
import { updateDepartment } from "@/api/departments/updateDepartment";
import EditDepartmentForm from "./EditDepartmentForm";

export default async function EditDepartmentPage({ params }) {
    const unwrappedParams = await params;
    const departmentId = unwrappedParams.id;

    // Fetch current department data and all departments for parent dropdown
    let department = null;
    let departments = [];

    try {
        [department, departments] = await Promise.all([
            getDepartment(departmentId),
            getDepartments(1, 100), // Get all departments for dropdown
        ]);
    } catch (error) {
        console.error("Error fetching department data:", error);
        redirect("/departments");
    }

    async function handleUpdateDepartment(formData) {
        "use server";

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

            await updateDepartment(departmentId, payload);
        } catch (error) {
            console.error("Error updating department:", error);
            throw error;
        }

        redirect(`/departments/${departmentId}?updated=true`);
    }

    if (!department) {
        redirect("/departments");
    }

    return (
        <EditDepartmentForm
            department={department}
            departments={departments.items || []}
            updateAction={handleUpdateDepartment}
            departmentId={departmentId}
        />
    );
}
