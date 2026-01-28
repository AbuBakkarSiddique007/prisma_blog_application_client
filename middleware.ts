import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/constants/role";
import { env } from "./env";

const API_URL = env.API_URL;
const LOGIN_PATH = "/login";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("middleware hit:", pathname);

  // Only enforce auth for dashboard routes; let everything else through quickly.
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
  const cookieHeader = req.headers.get("cookie") ?? "";

  let isAuthenticated = false;
  let isAdmin = false;

  try {
    const res = await fetch(`${API_URL}/get-session`, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.user) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.ADMIN;
      }
    } else {
      console.warn("middleware session fetch failed", res.status, res.statusText);
    }
  } catch (error) {
    console.error("middleware session fetch error", error);
  }

  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdmin:", isAdmin);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
