import React from "react";
import { getTag } from "@/api/tags/getTag";
import { updateTag } from "@/api/tags/updateTag";
import { redirect } from "next/navigation";
import EditTagForm from "./EditTagForm";

export default async function EditTagPage({ params }) {
    const { id } = await params;
    const tag = await getTag(id);

    async function handleUpdateTag(formData) {
        "use server";

        const data = {
            name: formData.get("name"),
            code: formData.get("code") || null,
            description: formData.get("description") || null,
            is_active: formData.get("is_active") === "true"
        };

        try {
            await updateTag(id, data);
            redirect(`/configurations/tags/${id}?updated=true`);
        } catch (error) {
            console.error("Error updating tag:", error);
            throw error;
        }
    }

    return <EditTagForm tag={tag} onSubmit={handleUpdateTag} />;
}
