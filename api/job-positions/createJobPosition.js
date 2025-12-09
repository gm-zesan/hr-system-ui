import axiosInstance from "../axios";

export async function createJobPosition(data) {
  try {
    const response = await axiosInstance.post("/job_positions/", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating job position:", error);
    throw error;
  }
}
