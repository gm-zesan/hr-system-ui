import React from "react";
import { getSkillType } from "@/api/skill-types/getSkillType";
import { updateSkillType } from "@/api/skill-types/updateSkillType";
import { redirect } from "next/navigation";
import EditSkillTypeForm from "./EditSkillTypeForm";

export default async function EditSkillTypePage({ params }) {
    const { id } = await params;
    const skillType = await getSkillType(id);

    async function handleUpdateSkillType(formData) {
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
            await updateSkillType(id, data);
            redirect(`/configurations/skill_types/${id}?updated=true`);
        } catch (error) {
            console.error("Error updating skill type:", error);
            throw error;
        }
    }

    return <EditSkillTypeForm skillType={skillType} onSubmit={handleUpdateSkillType} />;
}
