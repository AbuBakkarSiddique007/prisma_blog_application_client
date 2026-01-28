import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"


export const env = createEnv({
    server: {
            BACKEND_URL: z.string().url(),
            CLIENT_URL: z.string().url(),
        API_URL: z.url(),
        AUTH_URL: z.url(),
    },

    // example for client env variables
    client: {
        NEXT_PUBLIC_URL: z.string(),
    },

    runtimeEnv: {
            BACKEND_URL: process.env.BACKEND_URL,
            CLIENT_URL: process.env.CLIENT_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    },
})
