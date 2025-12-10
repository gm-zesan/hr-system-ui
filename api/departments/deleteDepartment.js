import axiosInstance from "../axios";

export async function deleteDepartment(id) {
    try {
        const response = await axiosInstance.delete(`/departments/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting department ${id}:`, error);
        throw error;
    }
}
