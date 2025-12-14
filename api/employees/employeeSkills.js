import axiosInstance from "../axios";

export async function attachSkill(employeeId, skillId) {
    try {
        const response = await axiosInstance.post(`/employees/${employeeId}/skills/${skillId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error attaching skill:", error);
        throw new Error(error.response?.data?.detail || "Failed to attach skill");
    }
}

export async function removeSkill(employeeId, skillId) {
    try {
        const response = await axiosInstance.delete(`/employees/${employeeId}/skills/${skillId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error removing skill:", error);
        throw new Error(error.response?.data?.detail || "Failed to remove skill");
    }
}

export async function getAvailableSkills() {
    try {
        const response = await axiosInstance.get("/skill_types/");
        return response.data.data || [];
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw new Error(error.response?.data?.detail || "Failed to fetch skills");
    }
}
