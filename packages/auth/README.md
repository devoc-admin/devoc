# @dev-oc/auth

Authentification partagée (better-auth, email + mot de passe) pour les apps Next.js du monorepo.
Toutes les apps utilisent la même base (`DATABASE_URL`), donc les mêmes comptes.

## Sous-chemins exportés

- **`@dev-oc/auth/server`** : `createAuth({ allowedHosts, trustedOrigins?, databaseUrl? })`, types `Auth` et `Session`
- **`@dev-oc/auth/next`** : `createAuthHandler(auth)` pour `app/api/auth/[...all]/route.ts`
- **`@dev-oc/auth/proxy`** : `createAuthProxy({ loginPath, homePath })` pour `proxy.ts`
- **`@dev-oc/auth/client`** (`"use client"`) : `authClient`, `signIn`, `signOut`, `useSession` et les hooks sans UI `useEmailSignIn({ redirectTo })` et `useSignOut({ redirectTo })`
- **`@dev-oc/auth/scripts`** : `createUser({ email, password, name })` pour les scripts CLI

## Brancher une app

```ts
// lib/auth/auth.ts
export const auth = createAuth({ allowedHosts: ["localhost:3002", "mon-app.vercel.app"] });

// app/api/auth/[...all]/route.ts
export const { GET, POST } = createAuthHandler(auth);

// proxy.ts : le matcher doit rester littéral (analyse statique de Next)
export const proxy = createAuthProxy({ loginPath: "/login", homePath: "/" });
export const config = { matcher: ["/((?!api|_next/static|_next/image|icon.svg).*)"] };
```

Dans `next.config.ts`, ajouter `serverExternalPackages: ["pg"]`. Variables d'env : `DATABASE_URL`, `BETTER_AUTH_SECRET`.
