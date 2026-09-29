# Frontend Deployment

## Scope

This document covers the `marvinjb.dev` frontend only. Extraction, Research, and Incident backends have independent deployment procedures in their own repositories.

## Runtime and build contract

- Node.js: `>=22.13.0`
- Package manager: npm
- Reproducible install: `npm ci`
- Production build: `npm run build`
- Production start: `npm start`
- Start entry point: `node server.js`

`server.js` imports the Vinext standalone server generated under `dist/standalone`. The hosting environment supplies `PORT`; the application must not hard-code a public listening port.

The Vite configuration includes Vinext, the site build plugin, and Cloudflare-compatible local tooling inherited from the project template. The deployed frontend contract is the Hostinger Node runtime and its Vinext standalone output. This repository does not use that local Cloudflare compatibility layer as proof that Cloudflare hosts the production application or owns every public DNS/TLS concern.

## Public environment variables

The build uses three public API-routing variables:

```dotenv
NEXT_PUBLIC_EXTRACTION_API_BASE_URL=https://api.example.com/extraction
NEXT_PUBLIC_RESEARCH_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_INCIDENT_API_BASE_URL=https://api.example.com/api/demo
```

These example values illustrate shape only. Use the reviewed production routes configured by the hosting environment.

`NEXT_PUBLIC_*` values are visible in the browser bundle. They may contain public base URLs, but never provider keys, database passwords, session secrets, or other credentials.

The application consumes these variables only as browser-visible routing configuration. Provider credentials and backend runtime settings stay in the three backend repositories and deployment environments.

## Local production verification

```bash
npm ci
npm run lint
npm test
npm run build
npm start
```

Before release, verify:

- `/`
- `/demo/extraction`
- `/demo/research`
- `/demo/incident-investigation`
- résumé download and credential artwork
- project, article, GitHub, LinkedIn, and Credly links
- desktop and mobile navigation
- absence of document-level horizontal overflow

The frontend checks do not need to trigger paid provider workflows. API connectivity and initial demo states can be verified without submitting Extraction or Research requests. Incident mutation requires a separately approved controlled workflow.

The API modules use mocked browser responses during the offline suite; running the normal quality commands does not call OpenAI, Tavily, or the deployed demo services. The README records the currently verified test count.

## Production delivery

The established deployment path builds this Git repository for the Hostinger frontend runtime. Vinext produces the server bundle, while the three agent services remain Dockerized behind Nginx on the VPS.

A frontend release should:

1. Start from a reviewed commit on `main`.
2. Install exactly from `package-lock.json` with `npm ci`.
3. pass lint, tests, and the production build.
4. Configure the three public API base URLs in the hosting environment.
5. Deploy the generated Vinext application.
6. Verify the homepage and three demo routes over HTTPS.

GitHub Actions runs Node.js `22.13.0`, installs locked dependencies, lints, builds, and executes the offline test suite. CI validates releases but does not deploy them automatically.

Pushing this repository changes only the frontend release candidate. It does not build, restart, migrate, or redeploy any FastAPI service on the VPS. Backend release and rollback procedures live in the corresponding backend repositories.

## Rollback principle

Keep the previously verified frontend commit available. If a deployment fails route, asset, or demo-shell verification, redeploy that known-good commit through the established hosting workflow. Backend services and data must not be changed merely to roll back a frontend release.

Do not place VPS addresses, SSH key locations, `.env` contents, API keys, or hosting credentials in this repository.
