import React from "react";
import { createSkillType } from "@/api/skill-types/createSkillType";
import { redirect } from "next/navigation";
import CreateSkillTypeForm from "./CreateSkillTypeForm";

export default async function CreateSkillTypePage() {
    async function handleCreateSkillType(formData) {
        "use server";

        const data = {
            name: formData.get("name"),
            code: formData.get("code"),
            description: formData.get("description") || null,
            color: formData.get("color") || "#000000",
            sequence: formData.get("sequence") ? parseInt(formData.get("sequence")) : 0,
            is_active: formData.get("is_active") === "true"
        };

        try {
            await createSkillType(data);
            redirect("/configurations/skill_types?success=true");
        } catch (error) {
            console.error("Error creating skill type:", error);
            throw error;
        }
    }

    return <CreateSkillTypeForm onSubmit={handleCreateSkillType} />;
}
