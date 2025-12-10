import React from "react";
import { getJobPosition } from "@/api/job-positions/getJobPosition";
import { getDepartments } from "@/api/departments/getDepartments";
import { updateJobPosition } from "@/api/job-positions/updateJobPosition";
import { redirect } from "next/navigation";
import EditJobPositionForm from "./EditJobPositionForm";

export default async function EditJobPositionPage({ params }) {
    const unwrappedParams = await params;

    const [jobPosition, departmentsData] = await Promise.all([
        getJobPosition(unwrappedParams.id),
        getDepartments(1, 100),
    ]);

    const departments = departmentsData?.items || [];

    async function handleUpdateJobPosition(formData) {
        "use server";

        const data = {
            title: formData.get("title"),
            code: formData.get("code"),
            description: formData.get("description") || null,
            department_id: formData.get("department_id")
                ? parseInt(formData.get("department_id"))
                : null,
            level: formData.get("level") || null,
            is_active: formData.get("is_active") === "true",
        };

        try {
            await updateJobPosition(unwrappedParams.id, data);
            redirect(`/configurations/job_positions/${unwrappedParams.id}?updated=true`);
        } catch (error) {
            console.error("Error updating job position:", error);
            throw error;
        }
    }

    return (
        <EditJobPositionForm
            jobPosition={jobPosition}
            departments={departments}
            onSubmit={handleUpdateJobPosition}
        />
    );
}
