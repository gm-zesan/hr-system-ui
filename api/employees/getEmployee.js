import axiosInstance from "../axios";

export async function getEmployee(id) {
    try {
        const response = await axiosInstance.get(`/employees/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error(error.response?.data?.detail || "Failed to fetch employee");
    }
}
