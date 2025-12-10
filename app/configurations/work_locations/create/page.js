import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CreateWorkLocationForm from "./CreateWorkLocationForm";

export default function CreateWorkLocationPage() {
    return (
        <>
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
                <span className="text-gray-900 font-medium">Create</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Create Work Location</h1>
                <p className="text-gray-600 mt-1">Add a new work location to your organization</p>
            </div>

            {/* Form */}
            <CreateWorkLocationForm />
        </>
    );
}
