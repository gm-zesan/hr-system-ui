import axiosInstance from "../axios";

export async function deleteSkillType(id) {
    try {
        const response = await axiosInstance.delete(`/skill_types/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting skill type:", error);
        throw error;
    }
}
