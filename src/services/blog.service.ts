import { env } from "../../env"

const API_URL = env.API_URL


export const blogService = {
    getAllBlogs: async () => {
        try {
            const res = await fetch(`${API_URL}/posts`)
            const data = await res.json()

            return {
                data: data,
                error: null
            }

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);

            return {
                data: null,
                error: message || "Failed to fetch blogs"
            }
        }
    }
}