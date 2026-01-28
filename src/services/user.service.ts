import { cookies } from "next/headers";
import { env } from "../../env";

const AUTH_URL = env.AUTH_URL;


export const userService = {

    getSession: async () => {
        try {
            const cookieStore = await cookies()
            // console.log(cookieStore);

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    cookie: cookieStore.toString()
                },
                cache: "no-store"
            })

            const sessionData = await res.json()
            // console.log("Session Data : ", sessionData);

            if (sessionData === null) {
                return {
                    data: null,
                    error: "No active session"
                }
            }

            return {
                data: sessionData,
                error: null

            }

        } catch (error) {
            console.error("Error fetching session data:", error);
            return {
                data: null,
                error: "Failed to fetch session data"
            }

        }
    }

}