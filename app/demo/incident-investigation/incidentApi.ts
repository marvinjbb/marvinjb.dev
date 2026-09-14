export type IncidentScenario =
  | "blocked_query"
  | "connection_exhaustion"
  | "bad_deployment";

export type IncidentStatus =
  | "starting"
  | "active"
  | "recovering"
  | "resolved"
  | "failed";

export type PublicActivity = {
  event: string;
  occurred_at: string;
};

export type PublicIncident = {
  incident_id: string;
  scenario: IncidentScenario;
  status: IncidentStatus;
  started_at: string;
  ended_at: string | null;
  activity: PublicActivity[];
};

export type Evidence = {
  evidence_id: string;
  source: string;
  evidence_type: string;
  timestamp: string | null;
  summary: string;
};

export type TimelineEntry = {
  timestamp: string;
  event: string;
  evidence_ids: string[];
};

export type ToolActivity = {
  tool: string;
  status: string;
  timestamp: string;
  result_count: number;
};

export type Hypothesis = {
  cause: string;
  confidence: "low" | "medium" | "high";
  evidence_ids: string[];
  explanation: string;
};

export type AlternativeHypothesis = {
  cause: string;
  evidence_for: string[];
  evidence_against: string[];
};

export type RecommendedAction = {
  action: string;
  reason: string;
  approval_required: boolean;
  evidence_ids: string[];
};

export type InvestigationReport = {
  executive_summary: string;
  timeline: TimelineEntry[];
  primary_hypothesis: Hypothesis;
  alternative_hypotheses: AlternativeHypothesis[];
  evidence: Evidence[];
  recommended_actions: RecommendedAction[];
  uncertainties: string[];
  activity: ToolActivity[];
  model: string;
  model_calls: number;
  tool_calls: number;
  duration_ms: number;
};

export type PublicInvestigation = {
  investigation_id: string;
  incident_id: string;
  status: string;
  report: InvestigationReport | null;
};

export type RemediationStatus =
  | "pending_approval"
  | "approved"
  | "executing"
  | "succeeded"
  | "failed"
  | "rejected"
  | "expired";

export type PublicRemediation = {
  proposal_id: string;
  incident_id: string;
  action_type:
    | "terminate_demo_blocker"
    | "release_demo_pool_pressure"
    | "rollback_demo_deployment";
  status: RemediationStatus;
  summary: string;
  expires_at: string;
  verification_result: Record<string, boolean> | null;
  activity: PublicActivity[];
};

export type IncidentErrorKind =
  | "configuration"
  | "validation"
  | "session"
  | "conflict"
  | "rate_limit"
  | "unavailable"
  | "network";

export class IncidentApiError extends Error {
  readonly kind: IncidentErrorKind;
  readonly status?: number;
  readonly retryAfter?: number;

  constructor(
    message: string,
    kind: IncidentErrorKind,
    status?: number,
    retryAfter?: number,
  ) {
    super(message);
    this.name = "IncidentApiError";
    this.kind = kind;
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isActivity(value: unknown): value is PublicActivity {
  return isObject(value) && isString(value.event) && isString(value.occurred_at);
}

function isIncident(value: unknown): value is PublicIncident {
  return isObject(value) &&
    isString(value.incident_id) &&
    ["blocked_query", "connection_exhaustion", "bad_deployment"].includes(
      String(value.scenario),
    ) &&
    ["starting", "active", "recovering", "resolved", "failed"].includes(
      String(value.status),
    ) &&
    isString(value.started_at) &&
    (value.ended_at === null || isString(value.ended_at)) &&
    Array.isArray(value.activity) && value.activity.every(isActivity);
}

function isEvidence(value: unknown): value is Evidence {
  return isObject(value) &&
    isString(value.evidence_id) &&
    isString(value.source) &&
    isString(value.evidence_type) &&
    (value.timestamp === null || isString(value.timestamp)) &&
    isString(value.summary);
}

function isTimelineEntry(value: unknown): value is TimelineEntry {
  return isObject(value) && isString(value.timestamp) && isString(value.event) &&
    isStringArray(value.evidence_ids);
}

function isToolActivity(value: unknown): value is ToolActivity {
  return isObject(value) && isString(value.tool) && isString(value.status) &&
    isString(value.timestamp) && typeof value.result_count === "number";
}

function isRecommendedAction(value: unknown): value is RecommendedAction {
  return isObject(value) && isString(value.action) && isString(value.reason) &&
    typeof value.approval_required === "boolean" &&
    isStringArray(value.evidence_ids);
}

function isReport(value: unknown): value is InvestigationReport {
  if (!isObject(value) || !isObject(value.primary_hypothesis)) return false;
  const hypothesis = value.primary_hypothesis;
  return isString(value.executive_summary) &&
    isString(hypothesis.cause) &&
    ["low", "medium", "high"].includes(String(hypothesis.confidence)) &&
    isStringArray(hypothesis.evidence_ids) &&
    isString(hypothesis.explanation) &&
    Array.isArray(value.timeline) && value.timeline.every(isTimelineEntry) &&
    Array.isArray(value.alternative_hypotheses) &&
    Array.isArray(value.evidence) && value.evidence.every(isEvidence) &&
    Array.isArray(value.recommended_actions) &&
    value.recommended_actions.every(isRecommendedAction) &&
    Array.isArray(value.uncertainties) && value.uncertainties.every(isString) &&
    Array.isArray(value.activity) && value.activity.every(isToolActivity) &&
    isString(value.model) && typeof value.model_calls === "number" &&
    typeof value.tool_calls === "number" && typeof value.duration_ms === "number";
}

function isInvestigation(value: unknown): value is PublicInvestigation {
  return isObject(value) && isString(value.investigation_id) &&
    isString(value.incident_id) && isString(value.status) &&
    (value.report === null || isReport(value.report));
}

function isRemediation(value: unknown): value is PublicRemediation {
  return isObject(value) && isString(value.proposal_id) &&
    isString(value.incident_id) &&
    [
      "terminate_demo_blocker",
      "release_demo_pool_pressure",
      "rollback_demo_deployment",
    ].includes(String(value.action_type)) &&
    [
      "pending_approval",
      "approved",
      "executing",
      "succeeded",
      "failed",
      "rejected",
      "expired",
    ].includes(String(value.status)) &&
    isString(value.summary) && isString(value.expires_at) &&
    (value.verification_result === null || isObject(value.verification_result)) &&
    Array.isArray(value.activity) && value.activity.every(isActivity);
}

function apiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_INCIDENT_API_BASE_URL?.replace(/\/$/, "");
  if (!value) {
    throw new IncidentApiError(
      "The Incident Agent API URL is not configured.",
      "configuration",
    );
  }
  return value;
}

async function request(
  path: string,
  options: RequestInit,
  timeoutMs = 15_000,
): Promise<unknown> {
  const baseUrl = apiBaseUrl();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...options,
      credentials: "include",
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new IncidentApiError(
        "The operation timed out. The synthetic incident may recover automatically.",
        "unavailable",
      );
    }
    throw new IncidentApiError(
      "Could not reach the Incident Investigation Agent.",
      "network",
    );
  } finally {
    clearTimeout(timeout);
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Keep non-JSON failures generic; never surface proxy/provider response bodies.
  }
  if (!response.ok) {
    const retryAfter = Number.parseInt(response.headers.get("Retry-After") ?? "", 10);
    const code = isObject(body) && typeof body.code === "string" ? body.code : null;
    if (response.status === 429) {
      throw new IncidentApiError(
        "The public demo is temporarily at capacity. Try again shortly.",
        "rate_limit",
        response.status,
        Number.isFinite(retryAfter) ? retryAfter : undefined,
      );
    }
    if (response.status === 401 || code === "session_expired") {
      throw new IncidentApiError(
        "Your demo session expired. Start a new incident to continue.",
        "session",
        response.status,
      );
    }
    if (response.status === 409 || response.status === 410) {
      throw new IncidentApiError(
        response.status === 410
          ? "The remediation proposal expired. The incident may have recovered automatically."
          : "This workflow step is no longer available. The incident may already be resolved.",
        "conflict",
        response.status,
      );
    }
    throw new IncidentApiError(
      response.status === 422
        ? "The Incident Agent rejected an invalid request."
        : "The Incident Agent could not complete this operation.",
      response.status === 422 ? "validation" : "unavailable",
      response.status,
    );
  }
  return body;
}

function post(path: string, body?: unknown, timeoutMs?: number) {
  return request(
    path,
    {
      method: "POST",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    },
    timeoutMs,
  );
}

export async function createIncident(
  scenario: IncidentScenario,
): Promise<PublicIncident> {
  const body = await post("/incidents", { scenario });
  if (!isIncident(body)) {
    throw new IncidentApiError("The Incident Agent returned an invalid incident.", "unavailable");
  }
  return body;
}

export async function getIncident(incidentId: string): Promise<PublicIncident> {
  const body = await request(`/incidents/${incidentId}`, { method: "GET" });
  if (!isIncident(body)) {
    throw new IncidentApiError("The Incident Agent returned an invalid incident.", "unavailable");
  }
  return body;
}

export async function investigateIncident(
  incidentId: string,
): Promise<PublicInvestigation> {
  const body = await post(`/incidents/${incidentId}/investigate`, undefined, 60_000);
  if (!isInvestigation(body) || body.report === null) {
    throw new IncidentApiError("The Incident Agent returned an invalid investigation.", "unavailable");
  }
  return body;
}

export async function proposeRemediation(
  investigationId: string,
): Promise<PublicRemediation> {
  const body = await post(`/investigations/${investigationId}/remediation`);
  if (!isRemediation(body)) {
    throw new IncidentApiError("The Incident Agent returned an invalid proposal.", "unavailable");
  }
  return body;
}

export async function approveRemediation(
  proposalId: string,
): Promise<PublicRemediation> {
  const body = await post(`/remediations/${proposalId}/approve`);
  if (!isRemediation(body)) {
    throw new IncidentApiError("The Incident Agent returned an invalid approval.", "unavailable");
  }
  return body;
}

export async function executeRemediation(
  proposalId: string,
): Promise<PublicRemediation> {
  const body = await post(`/remediations/${proposalId}/execute`, undefined, 30_000);
  if (!isRemediation(body)) {
    throw new IncidentApiError("The Incident Agent returned an invalid remediation.", "unavailable");
  }
  return body;
}
