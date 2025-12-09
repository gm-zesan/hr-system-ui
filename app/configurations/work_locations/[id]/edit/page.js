import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getWorkLocation } from "@/api/work-locations/getWorkLocation";
import { updateWorkLocation } from "@/api/work-locations/updateWorkLocation";
import EditWorkLocationForm from "./EditWorkLocationForm";
import { redirect } from "next/navigation";

export default async function EditWorkLocationPage({ params }) {
  const { id } = await params;
  
  let workLocation = null;
  let error = null;

  try {
    workLocation = await getWorkLocation(id);
  } catch (err) {
    console.error("Error fetching work location:", err);
    error = err.message;
  }

  if (!workLocation && !error) {
    redirect("/configurations/work_locations");
  }

  async function handleUpdate(formData) {
    "use server";
    
    const data = {
      name: formData.get("name"),
      code: formData.get("code") || "",
      address: formData.get("address") || "",
      city: formData.get("city") || "",
      state: formData.get("state") || "",
      country: formData.get("country") || "",
      postal_code: formData.get("postal_code") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      latitude: formData.get("latitude") ? parseFloat(formData.get("latitude")) : 0.0,
      longitude: formData.get("longitude") ? parseFloat(formData.get("longitude")) : 0.0,
      is_active: formData.get("is_active") === "on",
    };

    try {
      await updateWorkLocation(id, data);
      redirect(`/configurations/work_locations/${id}?updated=true`);
    } catch (error) {
      console.error("Error updating work location:", error);
      throw error;
    }
  }

  return (
    <>
      {/* API Error Warning */}
      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-yellow-600">⚠️</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                API Connection Error
              </h3>
              <p className="text-sm text-yellow-700">
                Unable to fetch work location from the API.
              </p>
              <p className="text-xs text-yellow-600 mt-2 font-mono bg-yellow-100 p-2 rounded">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/configurations" className="hover:text-gray-900">
          Configurations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/configurations/work_locations" className="hover:text-gray-900">
          Work Locations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/configurations/work_locations/${id}`} className="hover:text-gray-900">
          {workLocation?.name || "Details"}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Edit</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Work Location</h1>
        <p className="text-gray-600 mt-1">
          Update work location information
        </p>
      </div>

      {/* Form */}
      {workLocation && <EditWorkLocationForm workLocation={workLocation} onSubmit={handleUpdate} />}
    </>
  );
}
