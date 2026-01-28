import { Roles } from "@/constants/role";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    
    // console.log("Hello From Proxy:", req.url);

    const pathName = req.nextUrl.pathname;
    console.log("Path Name : ",pathName);

    let isAuthenticated = false;
    let isAdmin = false;

    const {data} = await userService.getSession()

    if (data && data.user) {
        isAuthenticated = true;

        if (data.user.role === Roles.ADMIN) {
            isAdmin = data.user.role === Roles.ADMIN;
        }
    }

    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdmin:", isAdmin);

    if (!isAuthenticated) {
        
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"]
};