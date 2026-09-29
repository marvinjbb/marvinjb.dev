# Marvin Joseph B. — AI Engineering Portfolio

Production database engineer transitioning into applied AI engineering, building production-deployed AI systems with Python, FastAPI, LLMs, agent workflows, structured outputs, evaluation, Docker, and real deployment infrastructure.

## Portfolio

[Visit marvinjb.dev](https://marvinjb.dev)

[GitHub profile](https://github.com/marvinjbb)

The portfolio is the presentation layer for three independently implemented AI systems. Each demo has its own frontend experience here and communicates over HTTPS with a separate backend service.

## Featured AI Systems

### Incident Investigation Agent

The demo puts the product first: choose one of three controlled incidents, follow the investigation and evidence, then decide whether to approve the bounded remediation. The backend creates the synthetic failure, restricts diagnostic access, validates evidence, enforces approval, executes only the allowlisted action, and verifies recovery.

- [Live demo](https://marvinjb.dev/demo/incident-investigation)
- [Backend repository](https://github.com/marvinjbb/incident-investigation-agent)

### Research Agent

Turns one question into a cited report through bounded planning, two to five concurrent research assignments, Tavily search, application-owned evidence, deterministic aggregation, and validated synthesis. The result experience leads with the answer and practical findings, while evidence, complete sources, citations, and worker provenance remain available in Research Details.

- [Live demo](https://marvinjb.dev/demo/research)
- [Backend repository](https://github.com/marvinjbb/research-agent)

### Extraction Agent

Lets a visitor upload a PDF or image before reading the deeper case study. The backend selects text or vision processing, requests OpenAI Structured Outputs, and validates an application-owned Pydantic `Invoice`; the frontend presents Table and JSON views, warnings, responsive line items, and bounded invoice Q&A.

- [Live demo](https://marvinjb.dev/demo/extraction)
- [Backend repository](https://github.com/marvinjbb/extraction-agent)

The public demo uses the deployed Extraction service. This repository does not claim that the latest backend repository revision is the currently deployed revision.

## Portfolio Architecture

```mermaid
flowchart TB
    B[Browser] --> F[marvinjb.dev<br/>React + TypeScript<br/>Vinext / Vite]
    F --> IUI[Incident UI]
    F --> RUI[Research UI]
    F --> EUI[Extraction UI]
    IUI --> H[HTTPS]
    RUI --> H
    EUI --> H
    H --> A[api.marvinjb.dev]
    A --> N[Nginx]
    N --> IA[Incident FastAPI]
    N --> RA[Research FastAPI]
    N --> EA[Extraction FastAPI]
    IA --> IP[(PostgreSQL)]
    IA --> IO[OpenAI]
    RA --> RT[Tavily]
    RA --> RO[OpenAI]
    EA --> EO[OpenAI Structured Outputs]
```

The browser contains no provider credentials or backend agent logic. It owns presentation, demo interaction, browser-side validation, request/response guards, progress and error states, responsive behavior, navigation, and result rendering. The separate backend repositories own orchestration, provider calls, core AI logic, backend schemas, persistence where needed, safety controls, credentials, and backend deployment. See [Architecture](docs/ARCHITECTURE.md) for the service and security boundaries.

## Technology

**Frontend**

- React 19, TypeScript, CSS
- Vinext and Vite
- Node.js 22

**AI and backend systems**

- Python, FastAPI, Pydantic
- OpenAI APIs and Structured Outputs
- Tavily search
- PostgreSQL

**Infrastructure and delivery**

- Docker, Nginx, Ubuntu VPS, HTTPS
- Hostinger frontend hosting
- Vinext/Vite with Cloudflare-compatible local build tooling
- GitHub Actions for frontend validation

Backend implementation details live in the three backend repositories rather than this frontend repository.

## Local Development

### Prerequisites

- Node.js `>=22.13.0`
- npm
- Optional: locally running agent APIs for interactive demo calls

### Install and run

```bash
npm ci
copy .env.example .env.local
npm run dev
```

On macOS or Linux, use `cp .env.example .env.local` instead of `copy`.

`.env.example` contains local API URL placeholders only. Provider keys belong in the backend repositories and must never be added to this frontend.

### Verify

```bash
npm run lint
npm test
npm run build
```

`npm test` performs a production build before running the Node test suite. The test suite exercises API response guards, demo behavior, rendered routes, public links, and key content invariants.

The current suite contains **58 offline tests**. Manual responsive QA uses `1440`, `1280`, `1024`, `768`, `430`, and `375` pixel widths as its primary matrix; this is a project verification set, not a claim of universal device or browser compatibility.

## Deployment

The Vinext frontend is built from this repository and served by the established Hostinger workflow. Public `NEXT_PUBLIC_*` variables select the three HTTPS API boundaries. The independently deployed FastAPI services run in Docker on an Ubuntu VPS behind Nginx and `api.marvinjb.dev`.

See [Deployment](docs/DEPLOYMENT.md) for frontend commands, configuration names, verification, and rollback principles. Backend deployment procedures remain in their respective repositories.

## Repository Structure

```text
app/                 Homepage, shared navigation, and three demo routes
app/demo/            Extraction, Research, and Incident demo interfaces
docs/                Architecture, deployment, decisions, and roadmap
public/              Public images, credential artwork, and résumé PDF
tests/               Node tests for APIs, rendered HTML, and demo UX
worker/              Vinext/Cloudflare-compatible worker entry point
.github/workflows/   Validation-only CI
```

## Engineering Principles

- Prefer evidence over unsupported model claims.
- Validate provider output and frontend response shapes explicitly.
- Keep tools, concurrency, and public actions bounded.
- Require human approval before a demo performs controlled remediation.
- Fail closed when configuration, validation, or provider behavior is unsafe.
- Keep secrets in backend runtime environments, never in browser code.
- Test the same build path used for production delivery.

## Articles

- [We're Giving AI Agents Tools, Memory, and Permissions. What Could Go Wrong?](https://medium.com/@jbmarvin21/were-giving-ai-agents-tools-memory-and-permissions-what-could-go-wrong-630294132412?sharedUserId=jbmarvin21)
- [The AI Study Loop I Used to Pass the Claude Certified Associate Exam](https://medium.com/@jbmarvin21/the-ai-study-loop-i-used-to-pass-the-claude-certified-associate-exam-7d7ad25361a9)

## Contact

- [Portfolio](https://marvinjb.dev)
- [GitHub](https://github.com/marvinjbb)
- [LinkedIn](https://www.linkedin.com/in/marvin-jbb)
- [Email](mailto:jbmarvin21@gmail.com)

## Additional Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Security](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Project roadmap](docs/ROADMAP.md)
