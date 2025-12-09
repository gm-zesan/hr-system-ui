import React from "react";
import { getJobPositions } from "@/api/job-positions/getJobPositions";
import { createJobTitle } from "@/api/job-titles/createJobTitle";
import { redirect } from "next/navigation";
import CreateJobTitleForm from "./CreateJobTitleForm";

export default async function CreateJobTitlePage() {
  // Fetch job positions for dropdown
  const jobPositionsData = await getJobPositions(1, 100);
  const jobPositions = jobPositionsData?.items || [];

  async function handleCreateJobTitle(formData) {
    "use server";
    
    const data = {
      name: formData.get("name"),
      code: formData.get("code"),
      description: formData.get("description") || null,
      job_position_id: formData.get("job_position_id") ? parseInt(formData.get("job_position_id")) : null,
      is_active: formData.get("is_active") === "true",
    };

    try {
      await createJobTitle(data);
      redirect("/configurations/job_titles?success=true");
    } catch (error) {
      console.error("Error creating job title:", error);
      throw error;
    }
  }

  return <CreateJobTitleForm jobPositions={jobPositions} onSubmit={handleCreateJobTitle} />;
}
