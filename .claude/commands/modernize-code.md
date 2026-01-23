# Modernize Code

Identify old or deprecated patterns and replace them with modern alternatives for this codebase.

## Stack Reference

This project uses:
- **Next.js 16** with App Router & Turbopack
- **React 19** with Server Components
- **TypeScript 5.9** (strict mode, types over interfaces)
- **Tailwind CSS 4** (new CSS-first config)
- **Bun** as package manager
- **Drizzle ORM** with PostgreSQL/Neon
- **Motion v12** (formerly Framer Motion)
- **Radix UI** primitives
- **TanStack** (React Query, Form, Table)
- **Zod v4** for validation
- **better-auth** for authentication
- **Biome** for linting (not ESLint)

## Patterns to Modernize

### React 19

| Deprecated | Modern |
|------------|--------|
| `useEffect` for data fetching | Server Components or React Query |
| `forwardRef` wrapper | Direct `ref` prop on components |
| `useContext` | `use(Context)` hook |
| `React.FC` / `React.FunctionComponent` | Plain function with typed props |
| Client-side `fetch` in components | Server Actions or Route Handlers |
| `useMemo`/`useCallback` for perf | React Compiler handles optimization |

### Next.js 16

| Deprecated | Modern |
|------------|--------|
| `getServerSideProps` / `getStaticProps` | Server Components + `fetch` |
| `pages/` directory | `app/` directory |
| `next/head` | `metadata` export or `generateMetadata` |
| `next/router` (pages) | `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`) |
| API routes in `pages/api` | Route Handlers in `app/api/*/route.ts` |
| `Image` with `layout` prop | `Image` with `fill` or explicit dimensions |
| `getLayout` pattern | Nested layouts in `app/` |
| Client-side redirects | `redirect()` in Server Components |

### TypeScript

| Deprecated | Modern |
|------------|--------|
| `interface Foo {}` | `type Foo = {}` |
| `React.FC<Props>` | `function Component(props: Props)` |
| `any` type | `unknown` + type guards |
| Non-null assertions `!` | Proper null checks or optional chaining |
| Type assertions `as` | Type guards or `satisfies` |

### Motion v12 (Framer Motion)

| Deprecated | Modern |
|------------|--------|
| `import { motion } from "framer-motion"` | `import { motion } from "motion/react"` |
| `AnimatePresence exitBeforeEnter` | `AnimatePresence mode="wait"` |
| `useAnimation` for simple cases | CSS variables or `animate` prop |
| Inline motion props | Custom animation wrapper components (per CLAUDE.md) |

### Tailwind CSS 4

| Deprecated | Modern |
|------------|--------|
| `tailwind.config.js` | CSS-first `@theme` in CSS file |
| `@apply` in CSS | Direct utility classes or CSS variables |
| `dark:` variant overuse | CSS `color-scheme` + `@media (prefers-color-scheme)` |
| Custom colors in config | `@theme { --color-* }` in CSS |

### TanStack

| Deprecated | Modern |
|------------|--------|
| `useQuery` with inline functions | `queryOptions()` helper |
| Manual cache invalidation | `useMutation` with `onSuccess` invalidation |
| Custom form state | `@tanstack/react-form` with Zod adapter |

### Zod v4

| Deprecated | Modern |
|------------|--------|
| `z.object().strict()` | Default is strict in Zod 4 |
| `.refine()` for transforms | `.transform()` |
| Manual error formatting | `z.prettifyError()` |

### Database (Drizzle)

| Deprecated | Modern |
|------------|--------|
| Raw SQL strings | Drizzle query builder |
| Manual transactions | `db.transaction()` |
| `findFirst` without `limit` | `db.query.*.findFirst()` |

### General JavaScript

| Deprecated | Modern |
|------------|--------|
| `var` | `const` / `let` |
| `.then()` chains | `async/await` |
| `lodash` utilities | Native array methods |
| `moment.js` | Native `Date` or `Temporal` |
| `for...in` for arrays | `for...of` or array methods |
| Nested ternaries | Early returns or variables |

## Instructions

1. **Scan** the file or directory for deprecated patterns above
2. **Prioritize** changes that improve type safety and runtime performance
3. **Preserve** existing functionality and tests
4. **Follow** CLAUDE.md conventions (types over interfaces, motion wrappers, etc.)
5. **Run** `bun x ultracite fix` after changes
6. **Skip** patterns that would require major refactoring without explicit approval

## Usage

```
/modernize-code [file or directory path]
```

If no path provided, analyze the current file or ask which area to modernize.
