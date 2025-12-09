import axiosInstance from "../axios";

export async function deleteJobTitle(id) {
  try {
    const response = await axiosInstance.delete(`/job_titles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job title:", error);
    throw error;
  }
}
