import axiosInstance from "../axios";

export async function getEmployees() {
    try {
        const response = await axiosInstance.get("/employees/");
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}
