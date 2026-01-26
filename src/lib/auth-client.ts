import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */

    // Its refers the server based URL :
    baseURL: "http://localhost:5000"
})