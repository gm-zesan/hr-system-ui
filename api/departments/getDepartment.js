import axiosInstance from "../axios";

export async function getDepartment(id) {
  try {
    const response = await axiosInstance.get(`/departments/${id}`);
    // API returns { success: true, data: { id, name, code, ... } }
    // We need to extract the data object
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching department ${id}:`, error);
    throw error;
  }
}
