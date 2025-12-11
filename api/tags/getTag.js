import axiosInstance from "../axios";

export async function getTag(id) {
    try {
        const response = await axiosInstance.get(`/tags/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching tag:", error);
        throw error;
    }
}
