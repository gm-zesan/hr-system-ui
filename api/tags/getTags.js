import axiosInstance from "../axios";

export async function getTags(page = 1, limit = 10, search = "") {
    try {
        const params = { page, limit };
        if (search) {
            params.search = search;
        }
        const response = await axiosInstance.get("/tags/", { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
}
