export async function updateEmployee(id, employeeData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: employeeData })
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage =
                typeof result.detail === "string"
                    ? result.detail
                    : JSON.stringify(result.detail || result.message || result);
            console.error("API Error Response:", result);
            throw new Error(errorMessage);
        }

        return result.data;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}
