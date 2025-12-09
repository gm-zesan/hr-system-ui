import axiosInstance from "../axios";

export async function getJobPositions(page = 1, limit = 10, search = "") {
  try {
    const params = { page, limit };
    if (search) {
      params.search = search;
    }
    const response = await axiosInstance.get("/job_positions/", { params });
    
    // Check if response is an array or an object with items
    const data = response.data.data;
    
    // If data is an array, wrap it in the expected format
    // if (Array.isArray(data)) {
    //   return {
    //     items: data,
    //     total: data.length,
    //     page: page,
    //     limit: limit,
    //     pages: Math.ceil(data.length / limit)
    //   };
    // }
    
    return data;
  } catch (error) {
    console.error("Error fetching job positions:", error);
    throw error;
  }
}
