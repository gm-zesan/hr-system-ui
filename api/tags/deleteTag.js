import axiosInstance from "../axios";

export async function deleteTag(id) {
    try {
        const response = await axiosInstance.delete(`/tags/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting tag:", error);
        throw error;
    }
}
