import axiosInstance from "../axios";

export async function deleteEmployee(id) {
  try {
    const response = await axiosInstance.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    throw error;
  }
}
