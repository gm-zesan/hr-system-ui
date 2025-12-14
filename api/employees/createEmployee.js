import axiosInstance from "../axios";

export async function createEmployee(employeeData) {
    try {
        const response = await axiosInstance.post("/employees/", employeeData);
        return response.data.data;
    } catch (error) {
        console.error("Error creating employee:", error);
        const errorMessage =
            typeof error.response?.data?.detail === "string"
                ? error.response.data.detail
                : JSON.stringify(
                      error.response?.data?.detail || error.response?.data?.message || error.message
                  );
        throw new Error(errorMessage);
    }
}
