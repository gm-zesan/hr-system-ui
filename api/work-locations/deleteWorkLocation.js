import axiosInstance from "../axios";

export async function deleteWorkLocation(id) {
  try {
    const response = await axiosInstance.delete(`/work_locations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting work location:", error);
    throw error;
  }
}
