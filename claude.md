# ServiceNest

A two-sided mobile detailing SaaS platform. Think Booksy meets Uber's routing logic, built specifically for the mobile detailing industry. Customers self-book through a provider's public page, and the provider wakes up to an optimized route ready to go.

## Tech Stack

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS v4
- ESLint (eslint-config-next)

### Backend

- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)

### Deployment

- Vercel

---

## Project Structure

- `client/` — Next.js frontend
- `server/` — Node.js + Express backend

## Node Version

- **v24.1.0** — defined in `.nvmrc`, run `nvm use` before running anything

## Common Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint (frontend)
- `vercel --prod` — human-only, never Claude

---

## Working Style

- Answer simple questions directly, no tool use unless asked
- Make small, incremental changes — ask before touching multiple files
- If a fix doesn't work after 2 attempts, stop and explain instead of continuing
- No automated tests in this project — do not scaffold or suggest test runners unless asked

---

## Tooling

### Prettier

Installed. Config in `.prettierrc` at root. Run `npm run format` to fix, `npm run format:check` to verify.

- Never disable or override Prettier config without explicit approval
- `format:check` must pass before any commit (enforced by lint-staged)

### ESLint

- Frontend: `eslint-config-next` + `@typescript-eslint` + `prettier`
- Backend: `@typescript-eslint/recommended` + type-checking rules + `prettier`
- `no-explicit-any` is an error on both sides — fix the type, don't suppress the rule
- Never use `// eslint-disable` without explicit human approval

### Commitlint + Husky

Installed. Enforces Conventional Commits on every commit via Git hook.
Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `ci`, `revert`
If a commit is rejected, fix the message — do not bypass with `--no-verify`

### lint-staged

Runs ESLint + Prettier only on changed files on every commit. Do not remove or bypass.

### TypeScript

- Strict mode stays on — never set `"strict": false`
- Never use `any` — ever
- Fix type errors properly, never cast with `as` to silence them

---

## Git Workflow

### Branch Naming

```
<type>/<brief-description>
```

Examples:

- `feat/parent-reward-creation`
- `fix/bloom-animation-ios`
- `chore/upgrade-supabase-client`
- `docs/update-readme`

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `ci`, `revert`

Rules:

- Lowercase, hyphens only, no spaces
- Descriptive — `fix/login` is too vague, `fix/parent-login-null-session` is right
- Always branch off `main` — only when `main` is in a known working state

### Commit Message Standard — Conventional Commits

```
<type>(optional scope): <short description>
```

Rules:

- Imperative mood: "add feature" not "added feature"
- Max 72 characters
- No trailing period
- Breaking changes use `feat!:` or `BREAKING CHANGE:` in footer

Valid:

```
feat(rewards): add parent reward creation flow
fix(garden): correct bloom animation on iOS
chore: bump supabase-js to v2.39
```

Invalid — reject these:

```
fixed bug
update stuff
WIP
feat: Added new screen.
```

### Merge & Deployment Rules

- **`main` is always production-ready** — never commit broken code to main
- **Claude will NEVER push to `main` or run `vercel --prod`**
- Workflow: `feature branch → commit → lint check → human reviews → human merges`
- Claude may prepare a PR summary but the merge is always a human decision
- Use SSH remote

---

## Supabase Security Standards

### Authentication

- Use Supabase Auth for all sessions — never roll custom auth
- Parent accounts are the root auth entity — children are sub-profiles under a parent
- **Never expose the service role key client-side** — it bypasses RLS entirely
- Only the anon key goes client-side — service role key is server-side only

### Row Level Security (RLS)

- **RLS must be enabled on every table — no exceptions**
- No table goes to production without a reviewed RLS policy
- Default stance: deny all, grant explicitly
- Parents may only read/write their own data — never another parent's
- Children's profiles are only accessible to their linked parent

### Environment Variables

- **NEVER commit `.env` files — no exceptions**
- All `.env*` variants must be in `.gitignore`
- Run `git diff --cached --name-only | grep '\.env'` before every commit

Required env vars (names only, never values):

```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY    # server-side only, never client
```

### General Rules

- Never query Supabase without RLS or a server-side auth check
- Never log or expose user data in client-side error messages
- All schema changes go through Supabase migrations — no raw SQL patches in production

---

## Data & Privacy (COPPA)

This app collects **children's first name and age only** — nothing else.

- **Never add analytics, tracking, or third-party SDKs** without explicit human approval
- Never collect last names, emails, photos, location, or any PII from children
- Parent auth is handled by Supabase Auth — Claude does not touch auth internals
- If a feature requires collecting more child data than first name + age — **stop and flag it, do not implement**

---

## Rewards System

- **Rewards are created by parents only** — children have zero write access to rewards
- Never modify reward creation, assignment, or trigger logic without explicit human confirmation
- RLS must enforce parent-only writes on the rewards table — never relax this
- If a change could let a child create or alter a reward — reject it outright

---

## Important Notes

- This app is used by young children — keep UI simple, forgiving, and joyful
- When in doubt on security, be more restrictive — ask first
- Backend is mid-migration to Supabase — do not assume MongoDB/Mongoose is still in use, confirm before touching backend deps
- Add gotchas here as the project grows
