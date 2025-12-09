import axiosInstance from "../axios";

export async function getJobPosition(id) {
  try {
    const response = await axiosInstance.get(`/job_positions/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching job position ${id}:`, error);
    throw error;
  }
}
