import axiosInstance from "../axios";

export async function updateDepartment(id, data) {
  try {
    const response = await axiosInstance.put(`/departments/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating department ${id}:`, error);
    throw error;
  }
}
