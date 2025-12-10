import axiosInstance from "../axios";

export async function getDepartments(page = 1, limit = 10, search = "") {
    try {
        const params = { page, limit };
        if (search) {
            params.search = search;
        }

        const response = await axiosInstance.get("/departments/", { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
}
