# Setup

This template is intentionally small. It runs as a TanStack Start app with
TypeScript, minimal shadcn-style UI primitives, and optional Clerk and Convex
provider boundaries.

## Install

```bash
pnpm install
```

## Run locally

```bash
pnpm dev
```

The default route opens a local demo mode for the Atlas Desk workspace. Use the
demo sign-in button to enter the app, create request records, and switch the
record list between populated, loading, empty, and error previews. All demo data
is in browser memory and resets on refresh.

## Environment

Create `.env.local` when you are ready to connect real services:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_replace_me
VITE_CONVEX_URL=https://replace-me.convex.cloud
```

Without these values, the app still runs and shows the authenticated-data
boundary as unconfigured. Clerk authentication and Convex data access do not
work until real project keys are supplied.

## Integration seams

- Replace the home route's local demo sign-in state with Clerk session state.
- Replace the local request records array and create handler with Convex queries
  and mutations.
- Keep the preview states until the real data path has equivalent loading,
  empty, success, and error handling.

## Verification

```bash
npm run typecheck
npm run build
```

Payments, PostHog, email, storage, deployment, and monitoring are intentionally
deferred until a product needs them.
