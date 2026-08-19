# AI Agent Portfolio Platform Roadmap

This is the living progress tracker for the platform. Update it when meaningful milestones are completed, blocked, or resumed rather than relying on conversation history.

Status labels: `NOT STARTED`, `IN PROGRESS`, `COMPLETE`, `BLOCKED`.

## Current Focus

**Phase 0 — Shared architecture and project foundation**  
**Status:** `IN PROGRESS`

The current work is limited to understanding the existing portfolio, defining system boundaries, documenting the target architecture, planning repositories, and agreeing on the smallest useful Document Extraction Agent MVP. Agent implementation has not started.

---

## Phase 0 — Shared architecture and project foundation

**Status:** `IN PROGRESS`

**Goal:** Establish a shared, understandable foundation before writing agent code.

**Major deliverables:**

- Confirm the current portfolio, GitHub, and Hostinger setup.
- Document the current state, target architecture, request flow, and frontend/backend boundary.
- Define the separate repository strategy for the portfolio and three agents.
- Define the one-VPS, Nginx, Docker, FastAPI, and `api.marvinjb.dev` target without provisioning it yet.
- Agree on the Extraction Agent MVP and proposed repository structure.
- Record meaningful architectural decisions and tradeoffs.

**What I should understand before considering the phase complete:** How the portfolio, API, VPS, reverse proxy, containers, agent services, and optional data services fit together; which components exist today; and which are target state.

**Completion criteria:** Architecture and roadmap are reviewed; repository boundaries and responsibilities are agreed; the smallest useful Extraction Agent MVP and folder structure are approved; no unresolved foundation decision blocks Phase 1.

---

## Phase 1 — Document Extraction Agent MVP

**Status:** `NOT STARTED`

**Goal:** Build the smallest locally working backend that accepts a supported document and returns validated structured extraction data.

**Major deliverables:**

- Create the separate `extraction-agent` repository and local Python environment.
- Define one initial document type, extraction schema, and supported file constraints.
- Implement FastAPI upload, parsing, extraction, validation, and structured response paths.
- Add focused tests and a local verification workflow.

**What I should understand before considering the phase complete:** The differences among document parsing, OCR, LLM extraction, schemas, structured outputs, and validation; how a request moves through FastAPI; and why each MVP dependency exists.

**Completion criteria:** A supported local document can be submitted to the API and produces a schema-valid result; invalid inputs fail clearly; core behavior is tested and documented.

---

## Phase 2 — Extraction Agent demo UI

**Status:** `NOT STARTED`

**Goal:** Build the portfolio-facing React experience for the extraction demo.

**Major deliverables:**

- Add `/demo/extraction` to the portfolio.
- Implement file selection and drag-and-drop interaction.
- Add extraction controls, loading/progress states, errors, and responsive results views.
- Display table, JSON, and raw-result views where useful.

**What I should understand before considering the phase complete:** What belongs in the frontend, how UI state represents the request lifecycle, and why secrets and extraction logic stay on the backend.

**Completion criteria:** The demo page is responsive and usable with representative mocked results and handles idle, loading, success, and error states.

---

## Phase 3 — Frontend ↔ FastAPI local integration

**Status:** `NOT STARTED`

**Goal:** Connect the local extraction demo to the local Extraction Agent API.

**Major deliverables:**

- Define and document the frontend/backend API contract.
- Configure local API URLs and CORS safely.
- Submit real uploads from React to FastAPI and render responses.
- Handle network, validation, timeout, and server failures.

**What I should understand before considering the phase complete:** HTTPS/API boundaries, multipart requests, CORS, environment-specific configuration, response validation, and end-to-end error flow.

**Completion criteria:** A user can upload a supported document in the local React demo and see the real backend result; expected failures are visible and understandable.

---

## Phase 4 — Dockerize Extraction Agent

**Status:** `NOT STARTED`

**Goal:** Package the Extraction Agent as a reproducible container for deployment.

**Major deliverables:**

- Create and explain the Dockerfile and ignore rules.
- Configure runtime environment variables, ports, and non-secret defaults.
- Add Docker Compose only where it improves local or deployment workflows.
- Build and test the image locally.

**What I should understand before considering the phase complete:** Dockerfiles, images, containers, build context, ports, volumes, networks, environment variables, and the reason containerization improves deployment consistency.

**Completion criteria:** The image builds cleanly; the container starts with documented commands; its API behaves like the non-containerized service; no secrets are embedded.

---

## Phase 5 — VPS setup

**Status:** `NOT STARTED`

**Goal:** Prepare one Ubuntu VPS to host all three isolated agent services progressively.

**Major deliverables:**

- Provision and secure the Ubuntu VPS.
- Install and configure required Docker and Nginx foundations.
- Establish deployment directories, environment handling, firewall rules, and access practices.
- Define backup and recovery expectations for any persistent state.

**What I should understand before considering the phase complete:** Server access, least privilege, ports, firewalls, processes versus containers, persistent data, and the operational responsibilities introduced by a VPS.

**Completion criteria:** The VPS is reachable through secured administrative access, exposes only required ports, can run a test container, and has a documented reproducible baseline.

---

## Phase 6 — Deploy Extraction Agent

**Status:** `NOT STARTED`

**Goal:** Run the Extraction Agent reliably as the first isolated service on the VPS.

**Major deliverables:**

- Transfer or pull a versioned build and configure production environment values.
- Start the Extraction Agent container on its internal service port/network.
- Configure restart behavior and persistent storage only if required.
- Validate the service from within the VPS.

**What I should understand before considering the phase complete:** How source becomes a running production container, how configuration reaches it, how container networking works, and how to inspect startup/runtime failures.

**Completion criteria:** The versioned Extraction Agent container runs after restart, passes its internal health check, and can process a representative request from the VPS.

---

## Phase 7 — Configure api.marvinjb.dev

**Status:** `NOT STARTED`

**Goal:** Establish the shared public API hostname and route extraction traffic securely to its container.

**Major deliverables:**

- Configure DNS/Cloudflare for `api.marvinjb.dev`.
- Configure HTTPS certificates and Nginx reverse proxying.
- Route `/extraction/*` to the Extraction Agent.
- Forward required headers and document timeout/body-size behavior.

**What I should understand before considering the phase complete:** DNS resolution, TLS/HTTPS, reverse proxies, public versus internal ports, path routing, proxy headers, and where Cloudflare and Nginx responsibilities differ.

**Completion criteria:** `https://api.marvinjb.dev/extraction/...` reaches the correct service over valid HTTPS; unrelated paths are not accidentally exposed; routing survives restart.

---

## Phase 8 — Connect portfolio live demo to production API

**Status:** `NOT STARTED`

**Goal:** Make the public extraction demo use the production Extraction Agent API.

**Major deliverables:**

- Configure the production frontend API base URL.
- Allow only the required portfolio origin through CORS.
- Deploy the updated portfolio through GitHub and Hostinger.
- Run end-to-end checks from the public demo page.

**What I should understand before considering the phase complete:** Build-time/runtime frontend configuration, browser origin rules, the full public request path, deployment propagation, and how to isolate frontend, DNS, proxy, and backend failures.

**Completion criteria:** A recruiter can use `marvinjb.dev/demo/extraction` successfully against the production API, with clear loading and failure behavior and no client-side secrets.

---

## Phase 9 — Production basics: logging, health checks, error handling, security, rate limiting where appropriate

**Status:** `NOT STARTED`

**Goal:** Make the public Extraction Agent demo safe and diagnosable enough for portfolio traffic.

**Major deliverables:**

- Add structured logs, health/readiness behavior, and consistent error responses.
- Enforce appropriate upload type/size limits and timeouts.
- Review secret handling, CORS, prompt injection exposure, and tool permissions.
- Add cost/abuse controls and rate limiting where justified.
- Document operational checks and common failure recovery.

**What I should understand before considering the phase complete:** Logs versus health signals; validation versus security; layered failure handling; public AI abuse/cost risks; and why each control is proportionate to this demo.

**Completion criteria:** Expected failures are safe and observable; secrets are not exposed; public inputs are bounded; health and logs support diagnosis; justified rate/cost controls are verified.

---

## Phase 10 — Research Agent

**Status:** `NOT STARTED`

**Goal:** Build and locally integrate an independently understandable multi-step Research Agent and its portfolio demo.

**Major deliverables:**

- Create the separate `research-agent` repository and define its MVP/API contract.
- Implement planning, search, retrieval, evidence comparison, synthesis, and citations.
- Add async behavior, retries, timeouts, structured state/output, and focused evaluations.
- Add `/demo/research` with progress, findings, sources, citations, and report output.
- Use RAG only if the selected research workflow genuinely requires it.

**What I should understand before considering the phase complete:** Orchestration, tool calling, search APIs, retrieval versus RAG, grounded citations, agent state, async work, retries, timeouts, and evaluation limitations.

**Completion criteria:** The local demo completes representative research tasks, grounds claims in inspectable sources, communicates progress/failures, and passes defined tests/evaluations.

---

## Phase 11 — Deploy Research Agent as second VPS service/container

**Status:** `NOT STARTED`

**Goal:** Deploy the Research Agent as a second isolated service on the existing VPS.

**Major deliverables:**

- Containerize and deploy the Research Agent independently.
- Route `/research/*` through Nginx without disrupting extraction traffic.
- Configure production secrets, resource limits, health checks, and justified persistence.
- Connect and verify the public research demo.

**What I should understand before considering the phase complete:** Multi-service container isolation, shared-host resource tradeoffs, independent configuration/deployment, and safe Nginx routing changes.

**Completion criteria:** Both agents run concurrently, route correctly, survive restart, expose useful health/telemetry, and their public demos complete representative requests.

---

## Phase 12 — Voice Agent

**Status:** `NOT STARTED`

**Goal:** Select and build a real-time conversational Voice Agent and its portfolio demo.

**Major deliverables:**

- Compare realistic providers/transports for complexity, latency, cost, reliability, control, and portfolio value.
- Define the voice MVP, safety boundaries, tools, and API/session contract.
- Create the separate `voice-agent` repository and implement the chosen realtime pipeline.
- Add `/demo/voice` with conversation controls, transcripts, status, tool activity, and errors.
- Add tests for non-realtime logic and practical end-to-end validation.

**What I should understand before considering the phase complete:** Realtime model/provider choices, WebRTC versus WebSocket tradeoffs, audio/session flow, latency sources, interruption handling, tool permissions, and voice-specific failure/cost risks.

**Completion criteria:** A local user can hold a representative conversation with acceptable latency; transcripts and permitted tool activity are visible; session failures are handled; the provider decision is documented.

---

## Phase 13 — Deploy Voice Agent as third VPS service/container

**Status:** `NOT STARTED`

**Goal:** Deploy the Voice Agent as the third isolated service on the shared VPS.

**Major deliverables:**

- Containerize and deploy the Voice Agent with appropriate realtime networking.
- Route `/voice/*` through Nginx and configure HTTPS/session requirements.
- Add health signals, resource/cost controls, secret handling, and justified storage.
- Connect and verify the public voice demo alongside the other two agents.

**What I should understand before considering the phase complete:** Realtime proxying, persistent connections, timeout/upgrade headers, shared VPS resource pressure, and how to diagnose client-to-provider latency and disconnects.

**Completion criteria:** All three services operate concurrently and independently; the public voice demo completes representative conversations; routing, restart, health, and resource behavior are verified.

---

## Phase 14 — CI/CD, observability, documentation, testing, security and final portfolio polish

**Status:** `NOT STARTED`

**Goal:** Consolidate the three projects into a credible, maintainable, production-minded portfolio system.

**Major deliverables:**

- Add proportionate automated tests, CI checks, and documented deployment/CD workflows.
- Improve structured logs, metrics, traces, dashboards/alerts, and health monitoring where useful.
- Complete security reviews, dependency/update practices, backups, recovery checks, and cost controls.
- Finish each repository README, architecture/decision records, API documentation, screenshots, and demo guidance.
- Polish accessibility, responsiveness, performance, recruiter-facing case studies, and failure states.
- Document scaling paths separately from the actual one-VPS portfolio architecture.

**What I should understand before considering the phase complete:** The complete development-to-production lifecycle; CI versus CD; logs, metrics, and traces; testing/evaluation layers; operational/security tradeoffs; and how this architecture would evolve for larger traffic and teams.

**Completion criteria:** Automated checks protect key behavior; deployments and recovery are documented and repeatable; all public demos are reliable and observable; documentation supports technical review and interview explanation; final security/accessibility/performance checks pass.
