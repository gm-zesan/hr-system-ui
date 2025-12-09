import React from "react";
import { getJobTitle } from "@/api/job-titles/getJobTitle";
import { deleteJobTitle } from "@/api/job-titles/deleteJobTitle";
import { redirect } from "next/navigation";
import JobTitleDetailsClient from "./JobTitleDetailsClient";

export default async function JobTitleDetailsPage({ params }) {
  const { id } = await params;
  const jobTitle = await getJobTitle(id);

  async function handleDeleteJobTitle() {
    "use server";
    
    try {
      await deleteJobTitle(id);
      redirect("/configurations/job_titles?deleted=true");
    } catch (error) {
      console.error("Error deleting job title:", error);
      throw error;
    }
  }

  return (
    <JobTitleDetailsClient 
      jobTitle={jobTitle} 
      onDelete={handleDeleteJobTitle}
    />
  );
}
