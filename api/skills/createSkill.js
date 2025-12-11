import axiosInstance from "../axios";

export async function createSkill(skillData) {
    try {
        const response = await axiosInstance.post("/skills/", skillData);
        return response.data;
    } catch (error) {
        console.error("Error creating skill:", error);
        throw error;
    }
}
