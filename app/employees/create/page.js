import React from "react";
import { createEmployee } from "@/api/employees/createEmployee";
import { redirect } from "next/navigation";
import CreateEmployeeForm from "./CreateEmployeeForm";

export default async function CreateEmployeePage() {
    async function handleCreateEmployee(formData) {
        "use server";

        // Parse address
        const address = {
            street: formData.get("street") || null,
            city: formData.get("city") || null,
            state: formData.get("state") || null,
            country: formData.get("country") || null,
            postal_code: formData.get("postal_code") || null
        };

        // Parse emergency contact
        const emergency_contact = {
            name: formData.get("emergency_contact_name") || null,
            relationship: formData.get("emergency_contact_relationship") || null,
            phone: formData.get("emergency_contact_phone") || null
        };

        // Parse tag_ids
        const tagIdsString = formData.get("tag_ids");
        const tag_ids = tagIdsString ? JSON.parse(tagIdsString) : [];

        const data = {
            employee_code: formData.get("employee_code"),
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name") || null,
            email: formData.get("email"),
            phone: formData.get("phone"),
            date_of_birth: formData.get("date_of_birth") || null,
            gender: formData.get("gender") || null,
            marital_status: formData.get("marital_status") || null,
            nationality: formData.get("nationality") || null,
            national_id: formData.get("national_id") || null,
            passport_number: formData.get("passport_number") || null,
            address: address,
            emergency_contact: emergency_contact,
            department_id: formData.get("department_id")
                ? parseInt(formData.get("department_id"))
                : null,
            job_position_id: formData.get("job_position_id")
                ? parseInt(formData.get("job_position_id"))
                : null,
            job_title_id: formData.get("job_title_id")
                ? parseInt(formData.get("job_title_id"))
                : null,
            work_location_id: formData.get("work_location_id")
                ? parseInt(formData.get("work_location_id"))
                : null,
            manager_id: formData.get("manager_id") ? parseInt(formData.get("manager_id")) : null,
            employment_type: formData.get("employment_type") || null,
            date_of_joining: formData.get("date_of_joining") || null,
            probation_end_date: formData.get("probation_end_date") || null,
            salary: formData.get("salary") ? parseFloat(formData.get("salary")) : null,
            work_shift_id: formData.get("work_shift") || null,
            tag_ids: tag_ids,
            is_active: formData.get("is_active") === "true",
            profile_picture: formData.get("profile_picture") || null
        };

        console.log("Creating employee with data:", JSON.stringify(data, null, 2));

        try {
            const result = await createEmployee(data);
            console.log("Employee created successfully:", result);
            redirect("/employees?success=true");
        } catch (error) {
            console.error("Error creating employee:", error);
            throw error;
        }
    }

    return <CreateEmployeeForm onSubmit={handleCreateEmployee} />;
}
