import axiosInstance from "../axios";

export async function getWorkLocation(id) {
  try {
    const response = await axiosInstance.get(`/work_locations/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching work location:", error);
    throw error;
  }
}
