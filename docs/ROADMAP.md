# Portfolio Roadmap

This roadmap records the current portfolio state and the next bounded priorities. Detailed implementation and deployment histories remain in each backend repository.

Status labels: `COMPLETE`, `IN PROGRESS`, `PLANNED`.

## Current state

### Portfolio platform and shared architecture

**Status:** `COMPLETE`

- `marvinjb.dev` is the public presentation layer.
- Three independently deployed FastAPI services remain in separate repositories.
- Browser-to-backend routing is configured with public environment variables.
- Backend provider credentials remain outside the frontend.
- Production APIs are exposed through HTTPS and service-specific routes on `api.marvinjb.dev`.

### Extraction Agent

**Status:** `COMPLETE`

The live demo accepts supported invoice PDFs and images, uses backend-owned text-first or vision routing, renders validated structured results, and supports bounded invoice questions. The deployed backend and its GitHub repository are released independently; this frontend does not claim that the newest backend revision is deployed.

- [Live demo](https://marvinjb.dev/demo/extraction)
- [Backend repository](https://github.com/marvinjbb/extraction-agent)

### Research Agent

**Status:** `COMPLETE`

The live demo submits one question and depth to a bounded research workflow. The backend plans two to five assignments, runs workers concurrently, grounds findings in application-owned evidence, aggregates deterministically, and validates final citations.

- [Live demo](https://marvinjb.dev/demo/research)
- [Backend repository](https://github.com/marvinjbb/research-agent)

### Incident Investigation Agent

**Status:** `COMPLETE`

The flagship live demo creates only controlled synthetic incidents. The backend collects evidence through restricted diagnostics, produces an evidence-backed investigation, requires explicit human approval, executes only allowlisted demo remediation, and verifies recovery.

- [Live demo](https://marvinjb.dev/demo/incident-investigation)
- [Backend repository](https://github.com/marvinjbb/incident-investigation-agent)

### Portfolio packaging and release quality

**Status:** `IN PROGRESS`

Current work keeps repository documentation, link coverage, security guidance, CI validation, and deployment notes aligned with the implemented system. It does not change the approved visual design or backend behavior.

## Planned work

### Voice Agent

**Status:** `PLANNED`

Before implementation, compare realistic realtime providers and transports for latency, reliability, cost, control, tool safety, and portfolio value. Define a bounded MVP and security model before adding a repository, demo, or deployment.

### Ongoing maintenance

**Status:** `PLANNED`

- Keep public claims synchronized with deployed behavior.
- Maintain responsive and accessible demo experiences.
- Preserve validation, cost controls, safe failure states, and backend-only secrets.
- Update dependencies and CI checks proportionately.
- Document scaling paths separately from the actual one-VPS portfolio architecture.

The current architecture is intentionally portfolio-scale: one frontend, one API hostname, and isolated services on shared infrastructure. It should not be described as horizontally scaled or enterprise infrastructure.
