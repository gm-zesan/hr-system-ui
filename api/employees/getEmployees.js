export async function getEmployees(page = 1, limit = 10, search = "") {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });

        if (search) {
            params.append("search", search);
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees?${params.toString()}`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}
