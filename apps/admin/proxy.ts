import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  //🔑✅ If logged, redirect to prospects table
  if (sessionCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/prospects", request.url));
  }

  //🔑🔴 If not logged, redirect to login page
  if (!sessionCookie && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg).*)"],
};
