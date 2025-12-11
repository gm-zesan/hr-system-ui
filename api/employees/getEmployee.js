export async function getEmployee(id) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/${id}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch employee");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error;
    }
}
