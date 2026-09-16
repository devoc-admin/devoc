import { createAuthProxy } from "@dev-oc/auth/proxy";

export const proxy = createAuthProxy({
  homePath: "/",
  loginPath: "/login",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg).*)"],
};
