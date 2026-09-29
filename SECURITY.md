# Security Policy

## Frontend boundary

This repository is a public portfolio frontend. It contains no OpenAI, Tavily, database, or infrastructure credentials. Browser code receives public API base URLs only through `NEXT_PUBLIC_*` environment variables.

Provider integrations, tool permissions, rate limits, secret management, and backend deployment controls are maintained in the separate agent repositories.

The frontend performs browser-side input checks and validates important successful response shapes before rendering them. Those guards reduce accidental misuse and unsafe presentation, but they are not a substitute for backend validation or authorization.

## Demo data

- Use synthetic or non-sensitive invoices in the Extraction demo.
- Do not submit confidential business, personal, financial, or regulated documents.
- Research questions are sent to the Research backend and its configured providers.
- Incident scenarios operate only on the controlled synthetic lab exposed by the Incident backend.

The demo interfaces can request actions only through their documented API contracts. The backends remain authoritative for file limits, research grounding, incident ownership, tool allowlists, approval enforcement, time-of-check revalidation, rate limits, and any state-changing operation. Frontend controls must never be treated as the security boundary for those guarantees.

## Repository hygiene

- `.env.local` and other unapproved environment files are ignored.
- Never commit API keys, passwords, access tokens, cookies, private certificates, production logs, or uploaded documents.
- Treat every `NEXT_PUBLIC_*` value as publicly visible.
- Keep external links protocol-restricted and use `noopener noreferrer` for new tabs.
- Validate user-visible claims against implemented and deployed behavior.

## Reporting a vulnerability

Do not open a public issue containing sensitive details. Report the problem through the public contact address listed on [marvinjb.dev](https://marvinjb.dev), with enough reproduction information to investigate but without including secrets or confidential data.

This document describes project practices, not a guarantee or security certification.
