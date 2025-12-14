import React from "react";
import { uploadResume } from "@/api/employees/uploadResume";
import { redirect } from "next/navigation";
import { getEmployee } from "@/api/employees/getEmployee";
import UploadResumeClient from "./UploadResumeClient";

export default async function UploadResumePage({ params }) {
    const { id } = params;

    // Fetch employee data
    const employee = await getEmployee(id);

    async function handleUploadResume(formData) {
        "use server";

        const file = formData.get("file");

        if (!file) {
            throw new Error("No file provided");
        }

        try {
            await uploadResume(id, file);
            redirect(`/employees/${id}?upload=success`);
        } catch (error) {
            console.error("Error uploading resume:", error);
            throw error;
        }
    }

    return <UploadResumeClient employee={employee} onSubmit={handleUploadResume} />;
}
