import axiosInstance from "../axios";

export async function createDepartment(data) {
  try {
    const response = await axiosInstance.post("/departments/", data);
    // API returns { success: true, data: { id, name, code, ... } }
    return response.data.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
}
