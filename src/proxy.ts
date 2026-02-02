import { NextRequest, NextResponse } from "next/server";
import Roles from "./constants/role";
import { env } from "../env";

// session endpoint is provided by the auth service
const API_URL = env.API_URL;
const AUTH_URL = env.AUTH_URL;


export async function proxy(req: NextRequest) {
    const pathName = req.nextUrl.pathname;
    console.log("Proxy hit:", pathName);

    // Get cookies directly from request (proxy-compatible)
    const cookieHeader = req.headers.get("cookie") ?? "";

    let isAuthenticated = false;
    let isAdmin = false;

    try {
        const res = await fetch(`${AUTH_URL}/get-session`, {
            headers: cookieHeader ? { cookie: cookieHeader } : {},
            cache: "no-store",
        });

        if (res.ok) {
            const data = await res.json();
            if (data?.user) {
                isAuthenticated = true;
                isAdmin = data.user.role === Roles.ADMIN;
            }
        } else {
            console.warn("Session fetch failed:", res.status, res.statusText);
        }
    } catch (error) {
        console.error("Session fetch error:", error);
    }

    console.log("isAuthenticated:", isAuthenticated, "isAdmin:", isAdmin);

    // User is not authenticated, redirect to login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // User is authenticated and role is admin
    // Admin cannot access user dashboard
    if (isAdmin && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/admin-dashboard', req.url));
    }

    // User is authenticated but not admin
    // User cannot access admin dashboard
    if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*"],
};