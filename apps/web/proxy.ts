import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  //🔒 ADMIN REDIRECTIONS
  //🔑✅ If logged, redirect to prospects table
  if (sessionCookie && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/prospects", request.url));
  }

  //🔑🔴 If not logged, redirect to login page
  if (
    !sessionCookie &&
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
