import axiosInstance from "../axios";

export async function createSkillType(skillTypeData) {
    try {
        const response = await axiosInstance.post("/skill_types/", skillTypeData);
        return response.data;
    } catch (error) {
        console.error("Error creating skill type:", error);
        throw error;
    }
}
