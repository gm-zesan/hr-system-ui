import axiosInstance from "../axios";

export async function getJobTitles(page = 1, limit = 10, search = "") {
  try {
    const params = { page, limit };
    if (search) {
      params.search = search;
    }
    const response = await axiosInstance.get("/job_titles/", { params });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job titles:", error);
    throw error;
  }
}
