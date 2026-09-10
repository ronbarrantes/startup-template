# Startup Template

A deliberately plain foundation for launching small products quickly.

The goal is not to build a giant boilerplate. It is to keep a small set of boring, reusable defaults so new experiments can start quickly without reinventing authentication, data access, forms, billing, email, testing, deployment, or basic UI states.

## Principles

- Keep the foundation small and understandable.
- Prefer boring technologies with good defaults.
- Make optional pieces easy to remove.
- Separate shared infrastructure from product-specific logic.
- Start with a working vertical slice before adding abstractions.
- Keep experiments cheap enough to abandon.

## MVP foundation

The current default stack is documented in [`STACK.md`](STACK.md):

- TanStack, using TanStack Start as the application direction
- TypeScript
- shadcn/ui for basic components and styling
- Convex for the first data and backend layer
- Clerk for authentication
- Payments intentionally deferred
- PostHog planned for product analytics when the first MVP needs it

This is a default, not a prison. A project can replace a piece when the product has a concrete reason.

## Still intentionally undecided

- Payment provider
- Email provider
- File storage provider
- Deployment defaults
- Error monitoring and additional infrastructure

These should be added only when an MVP needs them. Avoid paying the complexity cost before the product has earned it.

## Branches

- `main` is the stable template baseline.
- `startup-template` is the working branch for assembling the foundation.

## Operating rule

Every addition should answer: “Will this help the next small product reach a real user faster?” If not, leave it out for now.
