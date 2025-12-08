import axiosInstance from "../axios";

export async function createDepartment(data) {
  try {
    const response = await axiosInstance.post("/departments/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
}
