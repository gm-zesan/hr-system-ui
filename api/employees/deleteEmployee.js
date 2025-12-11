export async function deleteEmployee(id) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete employee");
        }

        return true;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
}
