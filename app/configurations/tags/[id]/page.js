import React from "react";
import { getTag } from "@/api/tags/getTag";
import { deleteTag } from "@/api/tags/deleteTag";
import { redirect } from "next/navigation";
import TagDetailsClient from "./TagDetailsClient";

export default async function TagDetailsPage({ params }) {
    const { id } = await params;
    const tag = await getTag(id);

    async function handleDeleteTag() {
        "use server";

        try {
            await deleteTag(id);
            redirect("/configurations/tags?deleted=true");
        } catch (error) {
            console.error("Error deleting tag:", error);
            throw error;
        }
    }

    return <TagDetailsClient tag={tag} onDelete={handleDeleteTag} />;
}
