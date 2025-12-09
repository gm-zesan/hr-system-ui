import React from "react";
import Link from "next/link";
import { ChevronRight, Edit2, Trash2, MapPin } from "lucide-react";
import { getWorkLocation } from "@/api/work-locations/getWorkLocation";
import { redirect } from "next/navigation";

export default async function WorkLocationPage({ params }) {
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

  const handleDelete = async () => {
    "use server";
    const { deleteWorkLocation } = await import("@/api/work-locations/deleteWorkLocation");
    try {
      await deleteWorkLocation(id);
      redirect("/configurations/work_locations?deleted=true");
    } catch (error) {
      console.error("Error deleting work location:", error);
    }
  };

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
        <span className="text-gray-900 font-medium">{workLocation?.name || "Details"}</span>
      </div>

      {workLocation && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{workLocation.name}</h1>
                <p className="text-gray-600 mt-1">{workLocation.code || "No code"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/configurations/work_locations/${id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
              <form action={handleDelete}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </form>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Street Address</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.address || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">City</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.city || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">State/Province</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.state || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Postal Code</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.postal_code || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Country</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.country || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.email || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Coordinates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Latitude</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.latitude || "0.0"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Longitude</p>
                    <p className="text-sm font-medium text-gray-900">{workLocation.longitude || "0.0"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
                <div>
                  {workLocation.is_active ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
