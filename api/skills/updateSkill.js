import axiosInstance from "../axios";

export async function updateSkill(id, skillData) {
    try {
        const response = await axiosInstance.put(`/skills/${id}`, skillData);
        return response.data;
    } catch (error) {
        console.error("Error updating skill:", error);
        throw error;
    }
}
