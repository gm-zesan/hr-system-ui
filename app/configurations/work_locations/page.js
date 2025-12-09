import React from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { getWorkLocations } from "@/api/work-locations/getWorkLocations";
import WorkLocationsClient from "./WorkLocationsClient";

export default async function WorkLocationsPage({ searchParams }) {
  const params = await searchParams;
  const showSuccess = params?.success === 'true';
  const showDeleted = params?.deleted === 'true';
  const page = parseInt(params?.page || '1');
  const limit = parseInt(params?.limit || '10');
  const search = params?.search || '';
  
  let workLocationsData = null;
  let apiError = null;

  try {
    workLocationsData = await getWorkLocations(page, limit, search);
  } catch (error) {
    console.error("Failed to fetch work locations from API:", error.message);
    apiError = error.message;
  }

  return (
    <>
      {/* API Error Warning */}
      {apiError && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-yellow-600">⚠️</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                API Connection Error
              </h3>
              <p className="text-sm text-yellow-700">
                Unable to fetch work locations from the API. Using fallback data for display purposes.
              </p>
              <p className="text-xs text-yellow-600 mt-2 font-mono bg-yellow-100 p-2 rounded">
                {apiError}
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
        <span className="text-gray-900 font-medium">Work Locations</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Locations</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize work locations
          </p>
        </div>
        <Link
          href="/configurations/work_locations/create"
          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Work Location
        </Link>
      </div>

      {/* Work Locations Client Component */}
      {workLocationsData && (
        <WorkLocationsClient
          workLocations={workLocationsData.items || []}
          total={workLocationsData.total || 0}
          currentPage={workLocationsData.page || 1}
          totalPages={workLocationsData.pages || 1}
          limit={workLocationsData.limit || 10}
          showSuccessToast={showSuccess}
          showDeletedToast={showDeleted}
          initialSearch={search}
        />
      )}
    </>
  );
}
