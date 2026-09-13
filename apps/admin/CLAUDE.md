# Admin App Instructions

## Linting

This project uses **Biome** for linting and formatting, not ESLint. Never add eslint-disable comments - use biome-ignore instead when necessary.

Example:
```typescript
// biome-ignore lint/suspicious/noEmptyBlockStatements: exception
```

## Post-Implementation Linting

After implementing a feature or refactoring code, **always run `bun x ultracite fix`** and fix any errors it returns before finishing.

## Tailwind Class Organization

When an element has many Tailwind classes, split them into multiple strings using the `cn()` utility from `@/lib/utils`. Group classes logically by category:

1. **Positioning & z-index** (absolute, relative, z-10, inset-0)
2. **Display & layout** (flex, grid, items-center, justify-center)
3. **Sizing** (w-full, h-12, size-6)
4. **Spacing** (p-4, m-2, gap-4)
5. **Visual styling** (rounded-full, bg-zinc-800, border, shadow)
6. **Typography** (font-bold, text-lg, text-white)
7. **Transitions & animations** (transition-all, duration-200, hover:scale-110)
8. **States & focus** (focus:outline-none, focus-visible:ring-2)
9. **Responsive variants** (sm:flex, md:text-lg)

Example:
```tsx
className={cn(
  "absolute z-20",
  "flex items-center justify-center",
  "size-9 p-0",
  "rounded-full bg-zinc-800/70",
  "transition-all duration-200 hover:scale-110",
  "focus:outline-none focus-visible:ring-2"
)}
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
