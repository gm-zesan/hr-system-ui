import axiosInstance from "../axios";

export async function updateEmployee(id, data) {
  try {
    const response = await axiosInstance.put(`/employees/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    throw error;
  }
}
