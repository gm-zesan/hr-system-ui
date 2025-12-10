import axiosInstance from "../axios";

export async function getSkillType(id) {
    try {
        const response = await axiosInstance.get(`/skill_types/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching skill type:", error);
        throw error;
    }
}
