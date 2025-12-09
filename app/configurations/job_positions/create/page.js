import React from "react";
import { getDepartments } from "@/api/departments/getDepartments";
import { createJobPosition } from "@/api/job-positions/createJobPosition";
import { redirect } from "next/navigation";
import CreateJobPositionForm from "./CreateJobPositionForm";

export default async function CreateJobPositionPage() {
  // Fetch departments for dropdown
  const departmentsData = await getDepartments(1, 100);
  const departments = departmentsData?.items || [];

  async function handleCreateJobPosition(formData) {
    "use server";
    
    const data = {
      title: formData.get("title"),
      code: formData.get("code"),
      description: formData.get("description") || null,
      department_id: formData.get("department_id") ? parseInt(formData.get("department_id")) : null,
      level: formData.get("level") || null,
      is_active: formData.get("is_active") === "true",
    };

    try {
      await createJobPosition(data);
      redirect("/configurations/job_positions?success=true");
    } catch (error) {
      console.error("Error creating job position:", error);
      throw error;
    }
  }

  return <CreateJobPositionForm departments={departments} onSubmit={handleCreateJobPosition} />;
}
