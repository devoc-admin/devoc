import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export type AuthProxyOptions = {
  loginPath: string;
  homePath: string;
};

export function createAuthProxy({ loginPath, homePath }: AuthProxyOptions) {
  return function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    //🔑✅ If logged, leave the login page
    if (sessionCookie && pathname === loginPath) {
      return NextResponse.redirect(new URL(homePath, request.url));
    }

    //🔑🔴 If not logged, redirect to login page
    if (!sessionCookie && pathname !== loginPath) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    return NextResponse.next();
  };
}
