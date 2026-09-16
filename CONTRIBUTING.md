# Contributing

This is a personal portfolio, so changes should remain focused, truthful, and easy to review.

## Development

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Use `cp` instead of `copy` on macOS or Linux. Local environment files must contain only development configuration and must not be committed.

## Before submitting a change

```bash
npm run lint
npm test
npm run build
git diff --check
```

Please:

- Keep changes scoped to the requested page or component.
- Preserve keyboard access, responsive behavior, and safe external links.
- Add or update tests for meaningful behavior and public claims.
- Do not add fake users, customers, metrics, benchmarks, employers, credentials, or deployment claims.
- Do not copy backend provider logic or credentials into this repository.
- Do not commit generated build output, caches, uploaded documents, or secrets.
- Keep agent-specific implementation and deployment changes in the appropriate backend repository.
