import React from "react";
import { getEmployee } from "@/api/employees/getEmployee";
import { deleteEmployee } from "@/api/employees/deleteEmployee";
import { redirect } from "next/navigation";
import EmployeeDetailsClient from "./EmployeeDetailsClient";

export default async function EmployeeDetailsPage({ params }) {
    const { id } = await params;
    const employee = await getEmployee(id);

    async function handleDeleteEmployee() {
        "use server";

        try {
            await deleteEmployee(id);
            redirect("/employees?deleted=true");
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }

    return <EmployeeDetailsClient employee={employee} onDelete={handleDeleteEmployee} />;
}
