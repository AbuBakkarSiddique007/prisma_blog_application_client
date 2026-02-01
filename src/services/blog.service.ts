import { env } from "../../env"
import type { BlogApiResponse } from "@/types/blog.type"

const API_URL = env.API_URL

interface GetBlogsParams {
    isFeatured?: boolean,
    search?: string,
}

interface ServiceOptions {
    cache?: RequestCache,
    revalidate?: number,
}

export const blogService = {
    getAllBlogs: async (
        params?: GetBlogsParams,
        options?: ServiceOptions
    ) => {
        try {

            const url = new URL(`${API_URL}/posts`)
            // url.searchParams.append("key", "value")

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value))
                    }
                })
            }

            console.log(url.toString());


            const config: RequestInit = {}

            if (options?.cache) {
                config.cache = options.cache
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }


            const res = await fetch(url.toString(), config)

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
    },

    getBlogById: async (id: string) => {
        try {
            
            const res = await fetch(`${API_URL}/posts/${id}`, {})
            
            const data = await res.json()
            
            return {
                data: data.data,
                error: null
            }
            
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            return {
                data: null,
                error: message || "Failed to fetch blog by ID"
            }
        }
    },
}