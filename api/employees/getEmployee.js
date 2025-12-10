import axiosInstance from "../axios";

export async function getEmployee(id) {
    try {
        const response = await axiosInstance.get(`/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee ${id}:`, error);
        throw error;
    }
}
