import React from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { getJobTitles } from "@/api/job-titles/getJobTitles";
import JobTitlesClient from "./JobTitlesClient";

export default async function JobTitlesPage({ searchParams }) {
  const params = await searchParams;
  const showSuccess = params?.success === 'true';
  const showDeleted = params?.deleted === 'true';
  const page = parseInt(params?.page || '1');
  const limit = parseInt(params?.limit || '10');
  const search = params?.search || '';
  
  let jobTitlesData = null;
  let apiError = null;

  try {
    jobTitlesData = await getJobTitles(page, limit, search);
  } catch (error) {
    console.error("Failed to fetch job titles from API:", error.message);
    apiError = error.message;
  }

  return (
    <>
      {/* API Error Warning */}
      {apiError && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">API Connection Failed</h3>
              <p className="text-sm text-yellow-700 mt-1">
                {apiError}. Showing empty data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="hover:text-gray-700 cursor-pointer">Job Titles</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">List</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Job Titles</h1>
        <Link href="/configurations/job_titles/create" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          New Job Title
        </Link>
      </div>

      {/* Client Component with Interactive Features */}
      <JobTitlesClient 
        jobTitles={jobTitlesData?.items || []} 
        total={jobTitlesData?.total || 0}
        currentPage={jobTitlesData?.page || 1}
        totalPages={jobTitlesData?.pages || 1}
        limit={jobTitlesData?.limit || 10}
        showSuccessToast={showSuccess}
        showDeletedToast={showDeleted}
        initialSearch={search}
      />
    </>
  );
}
