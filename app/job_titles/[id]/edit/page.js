import React from "react";
import { getJobTitle } from "@/api/job-titles/getJobTitle";
import { getJobPositions } from "@/api/job-positions/getJobPositions";
import { updateJobTitle } from "@/api/job-titles/updateJobTitle";
import { redirect } from "next/navigation";
import EditJobTitleForm from "./EditJobTitleForm";

export default async function EditJobTitlePage({ params }) {
  const { id } = await params;
  
  // Fetch job title and job positions in parallel
  const [jobTitle, jobPositionsData] = await Promise.all([
    getJobTitle(id),
    getJobPositions(1, 100)
  ]);
  
  const jobPositions = jobPositionsData?.items || [];

  async function handleUpdateJobTitle(formData) {
    "use server";
    
    const data = {
      name: formData.get("name"),
      code: formData.get("code"),
      description: formData.get("description") || null,
      job_position_id: formData.get("job_position_id") ? parseInt(formData.get("job_position_id")) : null,
      is_active: formData.get("is_active") === "true",
    };

    try {
      await updateJobTitle(id, data);
      redirect(`/job_titles/${id}?updated=true`);
    } catch (error) {
      console.error("Error updating job title:", error);
      throw error;
    }
  }

  return (
    <EditJobTitleForm 
      jobTitle={jobTitle} 
      jobPositions={jobPositions}
      onSubmit={handleUpdateJobTitle}
    />
  );
}
