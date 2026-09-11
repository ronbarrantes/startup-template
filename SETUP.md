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

## Environment

Create `.env.local` when you are ready to connect real services:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_replace_me
VITE_CONVEX_URL=https://replace-me.convex.cloud
```

Without these values, the app still runs and shows the authenticated-data
boundary as unconfigured. Clerk authentication and Convex data access do not
work until real project keys are supplied.

## Verification

```bash
pnpm typecheck
pnpm build
```

Payments, PostHog, email, storage, deployment, and monitoring are intentionally
deferred until a product needs them.
