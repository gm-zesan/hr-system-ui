import React from "react";
import { createTag } from "@/api/tags/createTag";
import { redirect } from "next/navigation";
import CreateTagForm from "./CreateTagForm";

export default async function CreateTagPage() {
    async function handleCreateTag(formData) {
        "use server";

        const data = {
            name: formData.get("name"),
            code: formData.get("code") || null,
            description: formData.get("description") || null,
            is_active: formData.get("is_active") === "true"
        };

        try {
            await createTag(data);
            redirect("/configurations/tags?success=true");
        } catch (error) {
            console.error("Error creating tag:", error);
            throw error;
        }
    }

    return <CreateTagForm onSubmit={handleCreateTag} />;
}
