# MVP stack decisions

Captured: 2026-09-10
Status: working defaults for fast experiments

## Chosen defaults

| Area | Default | Decision |
| --- | --- | --- |
| Application | TanStack Start | Use the TanStack ecosystem instead of Next.js for the application foundation. |
| Language | TypeScript | Keep the codebase typed from the beginning. |
| UI | shadcn/ui | Use accessible, editable component primitives rather than a heavy design system. |
| Data and backend | Convex | Use Convex for the first database and backend layer. |
| Authentication | Clerk | Use Clerk for the initial authentication and user-management path. |
| Payments | Undecided | Do not add a provider until an MVP has a real payment requirement. |
| Analytics | PostHog, later | Add when product behavior or activation needs measurement. |

## Why this is a good MVP boundary

The selected pieces cover the core path from interface to authenticated data without forcing a payment decision or a large infrastructure surface. The stack should let a small product reach a usable vertical slice quickly:

`landing page → sign-up → authenticated workspace → create/read/update data → basic feedback`

## Deferred decisions

- Payments: choose based on the first product’s pricing and marketplace needs.
- Email: add only when transactional messages are required.
- File storage: add only when the product accepts uploads.
- Error monitoring: choose when there is a deployed surface worth monitoring.
- Background jobs: add only when a real asynchronous workflow appears.
- Deployment: choose the simplest platform that supports the TanStack application and Convex backend.

## Template discipline

Do not install every possible integration into the base template. Prefer a small optional recipe or example for each deferred concern. The template should make the common path fast while keeping the uncommon path removable.

## First vertical slice to build

1. Render a plain shell with shadcn/ui.
2. Add Clerk sign-up and sign-in.
3. Add a Convex-backed authenticated record.
4. Add loading, empty, error, and success states.
5. Add a minimal account or workspace boundary.
6. Run the app locally and deploy a minimal preview.
7. Add PostHog only after there is a user action worth measuring.
