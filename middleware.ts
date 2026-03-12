import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

const SESSION_COOKIE = "kumbil_session";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        if (!session || session.role !== "admin") {
            const url = new URL("/admin/login", request.url);
            url.searchParams.set("from", pathname);
            return NextResponse.redirect(url);
        }
    }

    // Protect customer dashboard
    if (pathname.startsWith("/account")) {
        if (!session || session.role !== "customer") {
            const url = new URL("/login", request.url);
            url.searchParams.set("from", pathname);
            return NextResponse.redirect(url);
        }
    }

    // Redirect /login to /account if already logged in as customer
    if (pathname === "/login" && session?.role === "customer") {
        return NextResponse.redirect(new URL("/account", request.url));
    }

    // Redirect /admin/login to /admin if already logged in as admin
    if (pathname === "/admin/login" && session?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/account/:path*", "/login", "/admin/login"],
};
