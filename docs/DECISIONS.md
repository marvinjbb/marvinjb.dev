# Architecture Decision Record Log

This is a living record of the platform's architectural decisions. Append future decisions instead of silently rewriting history. If an accepted decision changes, mark its ADR `SUPERSEDED`, link to the replacement ADR, and record the new context and tradeoffs in that replacement.

## ADR-001 — Use marvinjb.dev as the main portfolio

**Decision ID:** ADR-001  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** An established portfolio and domain already provide the public identity and presentation layer for this work.

**Decision:** Use `marvinjb.dev` as the main website for presenting the portfolio and its AI agent projects.

**Why:** It preserves one recognizable destination, builds on an existing asset, and avoids fragmenting the recruiter experience across unrelated domains.

**Tradeoffs:** The portfolio and demos share a public brand and navigation structure. Changes must fit the existing site, and a portfolio outage can affect access to every demo entry point.

**When we should reconsider it:** Reconsider if ownership changes, the domain no longer supports the portfolio's purpose, or a separate product develops a distinct audience and identity that cannot reasonably live under the portfolio.

---

## ADR-002 — Host the portfolio on Hostinger

**Decision ID:** ADR-002  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** The existing portfolio is deployed through the established production flow `GitHub → Hostinger → marvinjb.dev`.

**Decision:** Continue hosting the portfolio frontend on Hostinger and preserve GitHub as the upstream source used for deployment.

**Why:** The current hosting path already works and separates static/frontend delivery from the future agent backend infrastructure. Replatforming would add work without solving a current requirement.

**Tradeoffs:** The frontend and backend will be operated on different platforms, so configuration, CORS, deployments, and incident diagnosis cross a hosting boundary. Hostinger's platform limits may constrain future frontend requirements.

**When we should reconsider it:** Reconsider if Hostinger cannot support required build, routing, reliability, performance, or deployment automation needs, or if consolidating hosting has a demonstrated operational benefit.

---

## ADR-003 — Keep interactive demos inside the portfolio

**Decision ID:** ADR-003  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** Recruiters should be able to move from a case study to a live experience without leaving the existing portfolio for separately branded sites.

**Decision:** Place the demo interfaces at:

- `marvinjb.dev/demo/extraction`
- `marvinjb.dev/demo/research`
- `marvinjb.dev/demo/voice`

The portfolio hosts the presentation layer; backend processing remains outside the frontend.

**Why:** Dedicated routes create a cohesive experience, reuse the existing React application and domain, and keep each project easy to discover.

**Tradeoffs:** The portfolio frontend must carry demo-specific UI and routing. Its releases can affect all demos, and the interface must clearly handle backend availability independently.

**When we should reconsider it:** Reconsider if a demo requires a substantially different runtime, security boundary, user journey, or independent product identity that cannot be supported well inside the portfolio.

---

## ADR-004 — Use one shared backend API subdomain

**Decision ID:** ADR-004  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** Three independently functioning agents need a stable public backend entry point while sharing initial infrastructure.

**Decision:** Use `api.marvinjb.dev` as the shared API hostname and distinguish services by paths such as `/extraction/*`, `/research/*`, and `/voice/*`.

**Why:** One hostname simplifies DNS, HTTPS, frontend configuration, and initial operations while Nginx can route requests to isolated services behind it.

**Tradeoffs:** The API hostname and reverse proxy become shared infrastructure and a potential common failure point. Routing, CORS, rate limits, and observability must distinguish services reliably.

**When we should reconsider it:** Reconsider if a service needs independent scaling, ownership, security policy, availability, protocol support, or release isolation that path-based routing cannot provide cleanly.

---

## ADR-005 — Start with one VPS for all three agents

**Decision ID:** ADR-005  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** This is a portfolio/demo environment with modest expected traffic. Paying for and operating separate servers before resource demand is known would add avoidable complexity.

**Decision:** Initially run the Extraction, Research, and Voice services on one Ubuntu VPS while maintaining logical isolation between them.

**Why:** One VPS is economical, understandable, and sufficient for proving deployment and operations across three services at portfolio scale.

**Tradeoffs:** Services share CPU, memory, network capacity, maintenance windows, and a host-level failure domain. A resource-heavy agent can affect its neighbors unless limits and monitoring are applied.

**When we should reconsider it:** Reconsider when measured load, availability targets, security isolation, provider constraints, geographic needs, or operational risk justify separate hosts or a managed platform.

---

## ADR-006 — Use Docker to isolate backend services

**Decision ID:** ADR-006  
**Status:** ACCEPTED  
**Classification:** STANDARD

**Context:** The three agent backends will have independent codebases and dependencies but initially share one server.

**Decision:** Package and run each agent as its own Docker container/service when it reaches the deployment stage.

**Why:** Containers provide reproducible runtime environments, dependency isolation, explicit ports/configuration, and a consistent unit for local verification and VPS deployment.

**Tradeoffs:** Docker adds image builds, networking, volumes, configuration, security updates, and container debugging. Persistent data and secrets still require deliberate handling outside images.

**When we should reconsider it:** Reconsider if a target platform uses a different deployment unit, containers create a demonstrated constraint, or a service's runtime requirements are incompatible with the chosen container environment.

---

## ADR-007 — Use Nginx as the VPS reverse proxy

**Decision ID:** ADR-007  
**Status:** ACCEPTED  
**Classification:** STANDARD

**Context:** A single public API hostname must terminate/proxy HTTPS traffic and route requests to multiple internal services without exposing their container ports directly.

**Decision:** Place Nginx in front of the agent services on the VPS and route requests from `api.marvinjb.dev` to the appropriate backend.

**Why:** Nginx is a mature reverse proxy that can centralize TLS-related proxying, path routing, headers, body limits, timeouts, and proportionate rate limiting.

**Tradeoffs:** Nginx configuration becomes production-critical and introduces another layer to operate and diagnose. Incorrect shared configuration can affect every service.

**When we should reconsider it:** Reconsider if hosting moves to a platform with managed ingress, realtime requirements expose an unsuitable limitation, or another proxy provides a concrete operational advantage.

---

## ADR-008 — Prefer FastAPI for agent backends

**Decision ID:** ADR-008  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** The agents are Python-oriented AI systems that need typed HTTP APIs, request validation, async support, and clear generated API documentation.

**Decision:** Use Python with FastAPI as the default backend stack unless a specific agent develops a concrete reason to use something else.

**Why:** FastAPI aligns well with Python AI libraries, Pydantic schemas, asynchronous operations, testable API design, and a relatively small learning surface.

**Tradeoffs:** The team must operate Python dependencies and asynchronous behavior correctly. FastAPI does not itself solve job orchestration, persistence, realtime transport, scaling, or production security.

**When we should reconsider it:** Reconsider per service if measured performance, required protocols, library compatibility, team constraints, or a provider SDK make another runtime materially better.

---

## ADR-009 — Separate GitHub repositories for major agent projects

**Decision ID:** ADR-009  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** Each agent should be independently understandable by a recruiter or engineer and may have different dependencies, release timing, and documentation.

**Decision:** Use the planned repositories:

- `marvinjb.dev`
- `extraction-agent`
- `research-agent`
- `voice-agent`

Do not adopt a monorepo by default.

**Why:** Separate repositories create clear project boundaries, focused histories and READMEs, and independent build/deployment workflows.

**Tradeoffs:** Shared conventions and code may be duplicated or require coordinated updates. Cross-repository changes, local setup, and release tracking can be more cumbersome than in a monorepo.

**When we should reconsider it:** Reconsider if substantial shared code, atomic cross-project releases, unified tooling, or team workflow makes a monorepo demonstrably simpler than maintaining separation.

---

## ADR-010 — Add data and infrastructure services only when justified

**Decision ID:** ADR-010  
**Status:** ACCEPTED  
**Classification:** STANDARD

**Context:** PostgreSQL, Redis, vector databases, queues, and file storage solve different problems but also add operational and conceptual cost.

**Decision:** Do not automatically add PostgreSQL, Redis, a vector database, object storage, or other infrastructure. First identify the data, persistence need, access pattern, and simplest suitable technology.

**Why:** Requirement-driven infrastructure keeps the system understandable, lowers cost and failure surface, and prevents technologies from being included only for appearance.

**Tradeoffs:** Some capabilities may be introduced later and require migration or refactoring. The team must revisit requirements deliberately rather than relying on a prebuilt general-purpose stack.

**When we should reconsider it:** Reconsider each omitted component when a concrete persistence, retrieval, caching, queueing, session, rate-limit, or file-lifecycle requirement emerges and simpler alternatives are insufficient.

---

## ADR-011 — Build one agent at a time

**Decision ID:** ADR-011  
**Status:** ACCEPTED  
**Classification:** CUSTOM

**Context:** The platform includes three substantial projects, and the first deployment will establish reusable knowledge for later services.

**Decision:** Build in the order `Extraction → Research → Voice`, completing meaningful local, integration, and deployment milestones before starting the next agent.

**Why:** Sequential delivery keeps attention focused, produces a usable result sooner, and lets later projects reuse lessons from API design, Docker, VPS operations, routing, security, and observability.

**Tradeoffs:** Research and Voice work begins later, and some shared decisions may initially reflect Extraction Agent needs. Strict sequencing can delay independent work if applied without judgment.

**When we should reconsider it:** Reconsider if an external deadline, dependency, learning goal, or genuinely independent workstream makes a different order or limited overlap more valuable.

---

## ADR-012 — MVP before production complexity

**Decision ID:** ADR-012  
**Status:** ACCEPTED  
**Classification:** STANDARD

**Context:** Production tooling cannot compensate for an unclear problem, an unproven workflow, or a core system that does not work locally.

**Decision:** Define and prove the smallest useful local MVP before adding Docker, VPS deployment, broad observability, scaling infrastructure, or other production layers.

**Why:** This creates short feedback loops, separates product/agent problems from deployment problems, and makes each new layer easier to understand and verify.

**Tradeoffs:** The earliest MVP is not production-ready and may require intentional hardening or refactoring. Deferring infrastructure must not become an excuse to ignore known requirements before public launch.

**When we should reconsider it:** Reconsider the exact boundary when an early constraint—such as provider networking, realtime transport, compliance, or deployment-only behavior—must be validated to prove feasibility.

---

## ADR-013 — GitHub is the source of truth for deployable code

**Decision ID:** ADR-013  
**Status:** ACCEPTED  
**Classification:** STANDARD

**Context:** Reliable deployment and collaboration require a reviewable, reproducible version of the code rather than dependence on one machine's untracked state.

**Decision:** Production-ready changes must be intentionally committed and pushed to the appropriate GitHub repository. Deployments must not depend on untracked local files.

**Why:** Version control provides history, traceability, rollback points, reviewability, and a stable input for builds and deployment automation.

**Tradeoffs:** Changes require disciplined commits, secret exclusion, and synchronization with deployment workflows. GitHub availability and repository access become dependencies of the release process.

**When we should reconsider it:** Reconsider only if the organization adopts a different authoritative version-control platform or a formally managed artifact source, with migration and traceability preserved.

---

## ADR-014 — Configure the demo API boundary by environment

**Decision ID:** ADR-014

**Status:** ACCEPTED
**Classification:** STANDARD

**Context:** The same browser client must call a local FastAPI origin during development and, later, the production API without embedding either deployment choice or any backend secret in application logic.

**Decision:** Read the Extraction Agent base URL from `NEXT_PUBLIC_EXTRACTION_API_BASE_URL`, keep HTTP requests in a small frontend API module, and configure the backend with an explicit `FRONTEND_ORIGINS` allowlist.

**Why:** Environment-specific public routing stays separate from code, request/error behavior has one owner, and narrow CORS grants only the browser origins that need access. `OPENAI_API_KEY` remains backend-only.

**Tradeoffs:** Each environment must supply a correct public base URL and matching CORS origin. Misconfiguration appears as a browser configuration or network failure and must be diagnosed across two processes.

**When we should reconsider it:** Reconsider if the frontend gains a same-origin server proxy, the API contract needs generated clients, or production hosting requires runtime configuration rather than the current public build-time variable.

---

## ADR-015 — Query validated invoice JSON without retrieval infrastructure

**Decision ID:** ADR-015

**Status:** ACCEPTED

**Classification:** CUSTOM

**Context:** A successful extraction already leaves one small, structured, Pydantic-validated invoice in frontend memory. Users need factual questions about that object, not search across a document collection.

**Decision:** Send each question with the validated invoice to a dedicated backend endpoint. Keep questions stateless, do not resend the PDF or previous answers, and keep grounding instructions and provider access exclusively on the backend.

**Why:** The complete relevant context fits directly in one request. RAG, embeddings, persistent chat storage, and agent frameworks would add failure modes and operational cost without improving retrieval.

**Tradeoffs:** Follow-up questions cannot rely on conversational context, and accuracy still depends on the extracted invoice plus model adherence. The client resends the small invoice object for each question.

**When we should reconsider it:** Reconsider if queries span multiple or very large documents, require citations to source regions, need durable conversation state, or exceed practical model context limits.

---

## ADR-016 — Keep one demo contract across text and image invoices

**Decision ID:** ADR-016

**Status:** ACCEPTED

**Classification:** CUSTOM

**Context:** The Extraction demo now supports text PDFs, scanned PDFs, JPG/JPEG, and PNG files. Media-specific extraction belongs to the backend, while recruiters need one coherent upload, result, and question experience.

**Decision:** Keep the existing multipart `file` request and `Invoice` response contract for every supported format. Update only accepted-file validation and public copy in the portfolio; keep parsing, vision routing, provider access, and safety processing in `extraction-agent`.

**Why:** One contract prevents format-specific frontend logic, preserves Table/JSON and Ask This Invoice behavior, and keeps the page visually native to the portfolio while explaining capability in nontechnical language.

**Tradeoffs:** The frontend cannot explain which backend route was chosen, and every supported format shares the same 5 MiB client limit even though decoded-image and scanned-page limits differ server-side.

**When we should reconsider it:** Reconsider if formats require materially different user controls, asynchronous processing, format-specific results, or distinct public limits that cannot be communicated clearly through one upload experience.
