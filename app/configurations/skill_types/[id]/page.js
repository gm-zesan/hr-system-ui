import React from "react";
import { getSkillType } from "@/api/skill-types/getSkillType";
import { deleteSkillType } from "@/api/skill-types/deleteSkillType";
import { redirect } from "next/navigation";
import SkillTypeDetailsClient from "./SkillTypeDetailsClient";

export default async function SkillTypeDetailsPage({ params }) {
    const { id } = await params;
    const skillType = await getSkillType(id);

    async function handleDeleteSkillType() {
        "use server";

        try {
            await deleteSkillType(id);
            redirect("/configurations/skill_types?deleted=true");
        } catch (error) {
            console.error("Error deleting skill type:", error);
            throw error;
        }
    }

    return <SkillTypeDetailsClient skillType={skillType} onDelete={handleDeleteSkillType} />;
}
