import axiosInstance from "../axios";

export async function deleteEmployee(id) {
    try {
        await axiosInstance.delete(`/employees/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error(error.response?.data?.detail || "Failed to delete employee");
    }
}
