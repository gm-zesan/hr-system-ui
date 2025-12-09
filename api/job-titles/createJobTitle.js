import axiosInstance from "../axios";

export async function createJobTitle(data) {
  try {
    const response = await axiosInstance.post("/job_titles/", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating job title:", error);
    throw error;
  }
}
