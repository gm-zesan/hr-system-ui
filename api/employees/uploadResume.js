import axiosInstance from "../axios";

export async function uploadResume(employeeId, file, title, type) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("type", type);

        console.log(employeeId, file, title, type);

        const response = await axiosInstance.post(
            `/employees/${employeeId}/upload-resume`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data.data;
    } catch (error) {
        console.error("Error uploading resume:", error);
        const errorMessage =
            typeof error.response?.data?.detail === "string"
                ? error.response.data.detail
                : JSON.stringify(
                      error.response?.data?.detail || error.response?.data?.message || error.message
                  );
        throw new Error(errorMessage);
    }
}

export async function getEmployeeResumes(employeeId) {
    try {
        const response = await axiosInstance.get(`/employees/${employeeId}/resumes`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching resumes:", error);
        throw new Error(error.response?.data?.detail || "Failed to fetch resumes");
    }
}

export async function deleteResume(employeeId, resumeId) {
    try {
        await axiosInstance.delete(`/employees/${employeeId}/resumes/${resumeId}`);
        return true;
    } catch (error) {
        console.error("Error deleting resume:", error);
        throw new Error(error.response?.data?.detail || "Failed to delete resume");
    }
}
