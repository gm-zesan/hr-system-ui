import axiosInstance from "../axios";

export async function getSkillTypes(page = 1, limit = 10, search = "") {
    try {
        const params = { page, limit };
        if (search) {
            params.search = search;
        }
        const response = await axiosInstance.get("/skill_types/", { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching skill types:", error);
        throw error;
    }
}
