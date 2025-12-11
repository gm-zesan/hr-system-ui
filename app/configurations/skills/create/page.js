import React from "react";
import { getSkillTypes } from "@/api/skill-types/getSkillTypes";
import { createSkill } from "@/api/skills/createSkill";
import { redirect } from "next/navigation";
import CreateSkillForm from "./CreateSkillForm";

export default async function CreateSkillPage() {
    // Fetch skill types for dropdown
    const skillTypesData = await getSkillTypes(1, 100);
    const skillTypes = skillTypesData?.items || [];

    async function handleCreateSkill(formData) {
        "use server";

        const data = {
            name: formData.get("name"),
            skill_type_id: formData.get("skill_type_id")
                ? parseInt(formData.get("skill_type_id"))
                : null,
            description: formData.get("description") || null,
            is_active: formData.get("is_active") === "true"
        };

        try {
            await createSkill(data);
            redirect("/configurations/skills?success=true");
        } catch (error) {
            console.error("Error creating skill:", error);
            throw error;
        }
    }

    return <CreateSkillForm skillTypes={skillTypes} onSubmit={handleCreateSkill} />;
}
