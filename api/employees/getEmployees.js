import axiosInstance from "../axios";

export async function getEmployees(page = 1, limit = 10, search = "") {
    try {
        const params = {
            page: page.toString(),
            limit: limit.toString()
        };

        if (search) {
            params.search = search;
        }

        const response = await axiosInstance.get("/employees", { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error(error.response?.data?.detail || "Failed to fetch employees");
    }
}
