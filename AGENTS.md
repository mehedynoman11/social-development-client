<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# social-development-client

Frontend for "Socially", an events/social app. Next.js 16.4 App Router, React 19, Tailwind CSS 4, Better Auth with MongoDB. Uses npm (`package-lock.json`).

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000. React Compiler is enabled (`reactCompiler: true` in `next.config.ts`).
- `npm run build` / `npm start`
- `npm run lint` — Biome (`biome check`), not ESLint. Apply fixes with `npx biome check --write`; formatting alone is `npm run format`. On Windows, Biome may exit silently with `-1073741515` (missing DLL); that's an environment failure, not lint findings.
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script.
- No test runner, test files, or CI workflows exist. Don't invent test commands.

## Structure

- `src/app` — App Router pages: `/`, `/signin`, `/signup`.
- `src/app/api/auth/[...all]/route.ts` — Better Auth catch-all handler (`toNextJsHandler`); keep this path.
- `src/components` — app components (currently `Navbar.tsx`); `src/components/ui` — shadcn/ui registry components (style `base-nova`).
- `src/lib` — `auth.ts` (server), `auth-client.ts` (browser), `utils.ts`, `highlighter.tsx`.
- `@/*` maps to `src/*` (`tsconfig.json`).

## Auth and data

- Required runtime env (`.env`, git-ignored): `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
- `src/lib/auth.ts` hardcodes the MongoDB database name `Social-Development-client` and enables email/password, the JWT plugin, and a JWT cookie cache (`maxAge: 7 * 25 * 60 * 60`). A reachable MongoDB is needed at runtime; the app still compiles without one.
- Client code should use `authClient` from `src/lib/auth-client.ts`. The same file also exports `signIn`, `signUp`, `useSession` from a second bare `createAuthClient()` that lacks the JWT plugin and `baseURL`; don't copy that pattern.
- `authClient`'s `baseURL` is hardcoded to `http://localhost:3000`; run the dev server on port 3000 or update it.

## Styling and conventions

- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens live in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`); `next.config.ts` wires the `@tailwindcss/turbopack` CSS loader.
- `cn` comes from the `cn` package (re-exported in `src/lib/utils.ts`), not `clsx`/`tailwind-merge`.
- UI primitives are built on `@base-ui/react`, not Radix. They use the `render` prop where shadcn examples use `asChild`.
- Add primitives with `npx shadcn add <name>` (the `shadcn` CLI is a project dependency); existing generated files are committed and may be locally modified, so inspect before overwriting.
- Code blocks use the custom lazy Shiki core in `src/lib/highlighter.tsx`; register new languages in its `languages` map.
- Biome: 2-space indent, recommended rules, import organization; `vcs.useIgnoreFile` respects `.gitignore`.
- React Compiler is enabled, so keep components within the Rules of React (no render-time mutation or ref reads).
