import axiosInstance from "../axios";

export async function createEmployee(data) {
    try {
        const response = await axiosInstance.post("/employees/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
}
