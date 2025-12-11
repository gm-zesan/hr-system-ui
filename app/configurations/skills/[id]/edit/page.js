import React from "react";
import { getSkill } from "@/api/skills/getSkill";
import { getSkillTypes } from "@/api/skill-types/getSkillTypes";
import { updateSkill } from "@/api/skills/updateSkill";
import { redirect } from "next/navigation";
import EditSkillForm from "./EditSkillForm";

export default async function EditSkillPage({ params }) {
    const { id } = await params;

    // Fetch skill and skill types in parallel
    const [skill, skillTypesData] = await Promise.all([getSkill(id), getSkillTypes(1, 100)]);

    const skillTypes = skillTypesData?.items || [];

    async function handleUpdateSkill(formData) {
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
            await updateSkill(id, data);
            redirect(`/configurations/skills/${id}?updated=true`);
        } catch (error) {
            console.error("Error updating skill:", error);
            throw error;
        }
    }

    return <EditSkillForm skill={skill} skillTypes={skillTypes} onSubmit={handleUpdateSkill} />;
}
