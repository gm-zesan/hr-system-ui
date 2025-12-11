import React from "react";
import { getSkill } from "@/api/skills/getSkill";
import { deleteSkill } from "@/api/skills/deleteSkill";
import { redirect } from "next/navigation";
import SkillDetailsClient from "./SkillDetailsClient";

export default async function SkillDetailsPage({ params }) {
    const { id } = await params;
    const skill = await getSkill(id);

    async function handleDeleteSkill() {
        "use server";

        try {
            await deleteSkill(id);
            redirect("/configurations/skills?deleted=true");
        } catch (error) {
            console.error("Error deleting skill:", error);
            throw error;
        }
    }

    return <SkillDetailsClient skill={skill} onDelete={handleDeleteSkill} />;
}
