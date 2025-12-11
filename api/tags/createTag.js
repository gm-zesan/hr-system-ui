import axiosInstance from "../axios";

export async function createTag(tagData) {
    try {
        const response = await axiosInstance.post("/tags/", tagData);
        return response.data;
    } catch (error) {
        console.error("Error creating tag:", error);
        throw error;
    }
}
