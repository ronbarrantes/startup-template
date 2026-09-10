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

## Planned foundation

The technology choices will be added incrementally and recorded with reasons:

- application framework
- TypeScript and validation
- database and migrations
- authentication and authorization
- component primitives and styling
- forms and error handling
- email and notifications
- payments, when needed
- testing and quality checks
- deployment and environment configuration
- observability and basic analytics

## Branches

- `main` is the stable template baseline.
- `startup-template` is the initial working branch for assembling the foundation.

## Operating rule

Every addition should answer: “Will this help the next small product reach a real user faster?” If not, leave it out for now.
