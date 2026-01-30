import { env } from "../../env"
import type { BlogPost, BlogApiResponse } from "@/types/blog.type"

const API_URL = env.API_URL

export const blogService = {
    getAllBlogs: async (): Promise<{ data: BlogPost[] | null; error: string | null }> => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                next: { revalidate: 10 },
            })
            const json = (await res.json()) as BlogApiResponse

            return {
                data: json.data.data,
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