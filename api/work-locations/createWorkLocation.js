import axiosInstance from "../axios";

export async function createWorkLocation(data) {
    try {
        const response = await axiosInstance.post("/work_locations/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating work location:", error);
        throw error;
    }
}
