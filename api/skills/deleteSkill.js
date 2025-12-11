import axiosInstance from "../axios";

export async function deleteSkill(id) {
    try {
        const response = await axiosInstance.delete(`/skills/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting skill:", error);
        throw error;
    }
}
