import { headers } from "next/headers";
import { env } from "../../env";

const API_URL = env.API_URL;

export const userService = {
    getSession: async () => {
        try {
            const headersList = await headers();
            const cookieHeader = headersList.get("cookie") ?? "";

            const res = await fetch(`${API_URL}/get-session`, {
                headers: cookieHeader ? { cookie: cookieHeader } : undefined,
                cache: "no-store",
                credentials: "include",
            });

            if (!res.ok) {
                const body = await res.text().catch(() => "");
                throw new Error(`fetch failed ${res.status} ${res.statusText} ${body}`.trim());
            }

            const sessionData = await res.json();

            if (!sessionData) {
                return { data: null, error: "No active session" };
            }

            return {
                data: sessionData,
                error: null
            };
        } catch (error) {
            console.error("Error fetching session data:", error);
            return {
                data: null,
                error: error instanceof Error ? error.message : "Failed to fetch session data",
            };
        }
    },
};