import axiosInstance from "../axios";

export async function updateWorkLocation(id, data) {
    try {
        const response = await axiosInstance.put(`/work_locations/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating work location:", error);
        throw error;
    }
}
