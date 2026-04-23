import axiosInstance from "@/api/axiosInstance"

export const searchQueryService = async (query: string, categories: string[], collections: string[]) => {
    try {
        const response = await axiosInstance.get("/api/products/search", {
            params: {
                query: query || undefined,
                categories: categories.length >= 1 ? categories.toString() : undefined,
                collections: collections.length >= 1 ? collections.toString() : undefined
            },
        });
        return response.data
    } catch (error) {
        console.error(error)
        return [];
    }
}