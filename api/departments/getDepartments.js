import axiosInstance from "../axios";

export async function getDepartments() {
  try {
    const response = await axiosInstance.get("/departments/");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}
