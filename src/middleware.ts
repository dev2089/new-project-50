import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware runs in the Edge runtime; keep checks lightweight.
const ADMIN_COOKIE = "ni_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
