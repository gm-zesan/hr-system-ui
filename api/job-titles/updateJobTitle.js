import axiosInstance from "../axios";

export async function updateJobTitle(id, data) {
    try {
        const response = await axiosInstance.put(`/job_titles/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating job title:", error);
        throw error;
    }
}
