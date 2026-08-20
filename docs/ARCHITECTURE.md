# AI Agent Portfolio Platform Architecture

## Scope

This document describes the platform boundary and the target production architecture for three portfolio demos. It distinguishes confirmed infrastructure from components that will be built progressively.

## Current State

- `marvinjb.dev` is the existing portfolio website.
- The portfolio source is maintained in GitHub.
- The portfolio is deployed from GitHub to Hostinger.
- `/demo/extraction` is a responsive React demo connected to the local `extraction-agent` FastAPI service through an environment-configured API base URL.

The Extraction Agent backend MVP is complete in the separate `extraction-agent` repository. In local development, the demo sends a multipart `file` upload to `POST /extractions/invoice`, then displays the validated invoice in Table or JSON form. Provider credentials, PDF parsing, schema validation, and LLM logic remain exclusively in the backend repository.

Local request failures are mapped into configuration, validation, backend/provider, and network categories so the UI can preserve the selected file and offer retry or reset. The public production API is not connected yet.

The local demo also supports one-shot questions about a successful result:

```text
Question + validated Invoice JSON
        ↓
POST /extractions/invoice/query
        ↓
Grounded backend provider request
        ↓
Concise answer
```

Each question is independent. The frontend does not resend the PDF, previous questions, prompts, provider settings, or credentials. RAG is intentionally absent because the complete context is already small, structured, validated, and available in memory.

Phase 3.6 broadens the same upload boundary to PDF, scanned PDF, JPG/JPEG, and PNG invoices. The frontend still sends one multipart `file` and receives the same `Invoice` JSON. Media routing is entirely backend-owned: readable PDFs use embedded text, while scanned PDFs and images use a bounded vision path. The Table, JSON, and Ask This Invoice states therefore do not branch by source format.

The production agent services and their infrastructure are target-state components. This document does not assume that `api.marvinjb.dev`, the Ubuntu VPS, Nginx, Docker, databases, or any agent backend has already been provisioned or deployed.

## Target Architecture

The existing portfolio remains the public presentation layer. Its React frontend will expose three dedicated demo pages:

- `marvinjb.dev/demo/extraction`
- `marvinjb.dev/demo/research`
- `marvinjb.dev/demo/voice`

Each page will call the shared HTTPS API entry point, `api.marvinjb.dev`. DNS, with Cloudflare where configured, will direct that hostname to one Ubuntu VPS. Nginx will terminate/proxy HTTPS traffic and route each API path to the appropriate isolated Docker service:

- `/extraction/*` -> Extraction Agent
- `/research/*` -> Research Agent
- `/voice/*` -> Voice Agent

Each agent will have its own Python/FastAPI backend and remain logically isolated even while sharing the VPS. Agent implementations may use LLMs, external APIs, tools, MCP integrations, or retrieval-augmented generation (RAG) only when the use case justifies them.

```text
Recruiter / User
       |
       v
marvinjb.dev (Hostinger)
React portfolio and demo pages
  /demo/extraction  /demo/research  /demo/voice
       |
       | HTTPS request
       v
api.marvinjb.dev
       |
       v
DNS / Cloudflare
       |
       v
One Ubuntu VPS
       |
       v
Nginx (TLS reverse proxy and path router)
       |
       +--------------------+--------------------+
       |                    |                    |
       v                    v                    v
Docker: Extraction   Docker: Research     Docker: Voice
Agent / FastAPI      Agent / FastAPI      Agent / FastAPI
       |                    |                    |
       +--------------------+--------------------+
                            |
                            v
              LLMs / tools / MCP / APIs / RAG
                    (only where appropriate)
                            |
                            v
        PostgreSQL / Redis / vector DB / file storage
                    (only where justified)
                            |
                            v
            Logs / metrics / traces / health checks
                            |
                            v
                  JSON or streamed response
                            |
                            v
             React demo renders result or error
```

## Request and Response Flow

1. A recruiter opens `marvinjb.dev`, served by Hostinger, and selects a demo.
2. The React demo page validates and submits user input over HTTPS to the appropriate route on `api.marvinjb.dev`.
3. DNS/Cloudflare resolves the API hostname to the Ubuntu VPS.
4. Nginx accepts the request and routes it to the matching Dockerized FastAPI service.
5. The agent validates the request, runs its workflow, and invokes only the LLMs, tools, APIs, MCP servers, retrieval, and storage required for that workflow.
6. The service records appropriate telemetry and returns structured JSON or a streamed response through Nginx.
7. The React demo displays progress, results, or a useful error to the recruiter.

## Service and Data Boundaries

The three agent backends are independently understandable and deployable services. Shared physical infrastructure does not imply shared application logic or unrestricted data access.

Persistence is selected from demonstrated requirements:

- PostgreSQL for durable relational application data.
- Redis for caching, queues, sessions, or rate limiting.
- A vector database only for genuine semantic retrieval.
- Object or file storage only when uploaded or generated files must persist.

Every production backend should expose a health endpoint and produce useful structured logs. Metrics and traces should be added at the level needed to diagnose reliability, volume, latency, and request flow without introducing an oversized observability stack.

## Source Control and Deployment

The portfolio remains in its existing GitHub repository and continues to deploy to Hostinger. Each agent is expected to live in a separate GitHub repository so it can be developed, tested, documented, containerized, and reviewed independently.

The target deployment flow for an agent is:

```text
Local development -> GitHub -> build/test -> Docker image -> Ubuntu VPS
                                                       -> health check
                                                       -> routed by Nginx
```

Deployment automation may evolve into CI/CD, but it should be introduced only when its workflow and operational value are clear.
