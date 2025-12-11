import axiosInstance from "../axios";

export async function updateTag(id, tagData) {
    try {
        const response = await axiosInstance.put(`/tags/${id}`, tagData);
        return response.data;
    } catch (error) {
        console.error("Error updating tag:", error);
        throw error;
    }
}
