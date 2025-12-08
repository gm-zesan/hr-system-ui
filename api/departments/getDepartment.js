import axiosInstance from "../axios";

export async function getDepartment(id) {
  try {
    const response = await axiosInstance.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department ${id}:`, error);
    throw error;
  }
}
