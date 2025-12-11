import React from "react";
import { ChevronRight } from "lucide-react";
import { getTags } from "@/api/tags/getTags";
import TagsClient from "./TagsClient";

export default async function TagsPage({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const search = params?.search || "";

    const { items: tags, total, pages: totalPages } = await getTags(page, limit, search);

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span>Configurations</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Tags</span>
                </div>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
                        <p className="text-gray-600 mt-1">
                            Manage tags for categorization and organization
                        </p>
                    </div>
                    <a
                        href="/configurations/tags/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        Create Tag
                    </a>
                </div>

                {/* Client Component */}
                <TagsClient
                    tags={tags}
                    total={total}
                    currentPage={page}
                    totalPages={totalPages}
                    limit={limit}
                    showSuccessToast={params?.success === "true"}
                    showDeletedToast={params?.deleted === "true"}
                    initialSearch={search}
                />
            </div>
        </div>
    );
}
