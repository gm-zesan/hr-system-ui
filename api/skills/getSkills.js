import axiosInstance from "../axios";

export async function getSkills(page = 1, limit = 10, search = "") {
    try {
        const params = { page, limit };
        if (search) {
            params.search = search;
        }
        const response = await axiosInstance.get("/skills/", { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error;
    }
}
