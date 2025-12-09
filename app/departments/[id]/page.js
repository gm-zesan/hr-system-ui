import React from "react";
import Link from "next/link";
import { ChevronRight, Building2, Code, User, FileText, Calendar, CheckCircle, XCircle } from "lucide-react";
import { getDepartment } from "@/api/departments/getDepartment";
import { deleteDepartment } from "@/api/departments/deleteDepartment";
import DepartmentDetailsClient from "./DepartmentDetailsClient";
import { redirect } from "next/navigation";

export default async function DepartmentViewPage({ params, searchParams }) {
  const unwrappedParams = await params;
  const unwrappedSearchParams = await searchParams;
  const showUpdated = unwrappedSearchParams?.updated === 'true';
  
  let department = null;
  let apiError = null;

  try {
    department = await getDepartment(unwrappedParams.id);
  } catch (error) {
    console.error("Failed to fetch department from API:", error.message);
    apiError = error.message;
  }

  if (!department) {
    return (
      <>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/departments" className="hover:text-gray-700 cursor-pointer">Departments</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Not Found</span>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Department not found</p>
        </div>
      </>
    );
  }

  async function handleDeleteDepartment() {
    "use server";
    try {
      await deleteDepartment(unwrappedParams.id);
      redirect("/departments?deleted=true");
    } catch (error) {
      console.error("Error deleting department:", error);
      throw error;
    }
  }

  return (
    <DepartmentDetailsClient 
      department={department} 
      showUpdatedToast={showUpdated}
      onDelete={handleDeleteDepartment}
    />
  );
}
