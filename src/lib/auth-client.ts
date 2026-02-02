import { createAuthClient } from "better-auth/react"

const AUTH_BASE = (process.env.NEXT_PUBLIC_AUTH_URL as string) || "http://localhost:5000"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: AUTH_BASE,
})