import axiosInstance from "../axios";

export async function updateJobPosition(id, data) {
  try {
    const response = await axiosInstance.put(`/job_positions/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating job position ${id}:`, error);
    throw error;
  }
}
