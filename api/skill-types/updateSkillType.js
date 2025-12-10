import axiosInstance from "../axios";

export async function updateSkillType(id, skillTypeData) {
    try {
        const response = await axiosInstance.put(`/skill_types/${id}`, skillTypeData);
        return response.data;
    } catch (error) {
        console.error("Error updating skill type:", error);
        throw error;
    }
}
