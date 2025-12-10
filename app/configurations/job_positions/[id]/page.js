import React from "react";
import { getJobPosition } from "@/api/job-positions/getJobPosition";
import { deleteJobPosition } from "@/api/job-positions/deleteJobPosition";
import JobPositionDetailsClient from "./JobPositionDetailsClient";
import { redirect } from "next/navigation";

export default async function JobPositionDetailsPage({ params, searchParams }) {
    const unwrappedParams = await params;
    const unwrappedSearchParams = await searchParams;
    const showUpdated = unwrappedSearchParams?.updated === "true";

    let jobPosition = null;

    try {
        jobPosition = await getJobPosition(unwrappedParams.id);
    } catch (error) {
        console.error("Failed to fetch job position from API:", error.message);
    }

    if (!jobPosition) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Job position not found</p>
            </div>
        );
    }

    async function handleDeleteJobPosition() {
        "use server";
        try {
            await deleteJobPosition(unwrappedParams.id);
            redirect("/configurations/job_positions?deleted=true");
        } catch (error) {
            console.error("Error deleting job position:", error);
            throw error;
        }
    }

    return (
        <JobPositionDetailsClient
            jobPosition={jobPosition}
            showUpdatedToast={showUpdated}
            onDelete={handleDeleteJobPosition}
        />
    );
}
