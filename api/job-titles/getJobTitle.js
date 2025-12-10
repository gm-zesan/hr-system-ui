import axiosInstance from "../axios";

export async function getJobTitle(id) {
    try {
        const response = await axiosInstance.get(`/job_titles/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching job title:", error);
        throw error;
    }
}
