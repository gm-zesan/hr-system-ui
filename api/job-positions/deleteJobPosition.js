import axiosInstance from "../axios";

export async function deleteJobPosition(id) {
    try {
        const response = await axiosInstance.delete(`/job_positions/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting job position ${id}:`, error);
        throw error;
    }
}
