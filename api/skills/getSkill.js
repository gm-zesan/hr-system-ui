import axiosInstance from "../axios";

export async function getSkill(id) {
    try {
        const response = await axiosInstance.get(`/skills/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching skill:", error);
        throw error;
    }
}
