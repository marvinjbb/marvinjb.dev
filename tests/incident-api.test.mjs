import assert from "node:assert/strict";
import test from "node:test";

import {
  approveRemediation,
  createIncident,
  executeRemediation,
  getIncident,
  IncidentApiError,
  investigateIncident,
  proposeRemediation,
} from "../app/demo/incident-investigation/incidentApi.ts";

const activity = [{ event: "Incident created", occurred_at: "2026-09-14T12:00:00Z" }];
const incident = {
  incident_id: "11111111-1111-1111-1111-111111111111",
  scenario: "blocked_query",
  status: "active",
  started_at: "2026-09-14T12:00:00Z",
  ended_at: null,
  activity,
};
const evidence = {
  evidence_id: "ev_blocked",
  source: "postgresql",
  evidence_type: "blocked_session",
  timestamp: "2026-09-14T12:00:01Z",
  summary: "A controlled session is blocked.",
};
const investigation = {
  investigation_id: "22222222-2222-2222-2222-222222222222",
  incident_id: incident.incident_id,
  status: "completed",
  report: {
    executive_summary: "A controlled transaction holds a lock.",
    timeline: [{ timestamp: evidence.timestamp, event: "Blocking detected", evidence_ids: [evidence.evidence_id] }],
    primary_hypothesis: { cause: "Blocking transaction", confidence: "high", evidence_ids: [evidence.evidence_id], explanation: "The database reported the exact blocker relationship." },
    alternative_hypotheses: [],
    evidence: [evidence],
    recommended_actions: [{ action: "Terminate the controlled blocker", reason: "Release the lock.", approval_required: true, evidence_ids: [evidence.evidence_id] }],
    uncertainties: [],
    activity: [{ tool: "get_database_blocking", status: "completed", timestamp: evidence.timestamp, result_count: 1 }],
    model: "test-model",
    model_calls: 3,
    tool_calls: 3,
    duration_ms: 12000,
  },
};
const remediation = {
  proposal_id: "33333333-3333-3333-3333-333333333333",
  incident_id: incident.incident_id,
  action_type: "terminate_demo_blocker",
  status: "pending_approval",
  summary: "Terminate the controlled blocking session",
  expires_at: "2026-09-14T12:01:00Z",
  verification_result: null,
  activity,
};

test("uses the public API contract and preserves the HttpOnly session", async () => {
  process.env.NEXT_PUBLIC_INCIDENT_API_BASE_URL = "https://example.test/api/demo/";
  const calls = [];
  const responses = [
    incident,
    incident,
    investigation,
    remediation,
    { ...remediation, status: "approved" },
    { ...remediation, status: "succeeded", verification_result: { incident_resolved: true } },
  ];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json(responses.shift());
  };

  await createIncident("blocked_query");
  await getIncident(incident.incident_id);
  await investigateIncident(incident.incident_id);
  await proposeRemediation(investigation.investigation_id);
  await approveRemediation(remediation.proposal_id);
  await executeRemediation(remediation.proposal_id);

  assert.deepEqual(calls.map((call) => call.url), [
    "https://example.test/api/demo/incidents",
    `https://example.test/api/demo/incidents/${incident.incident_id}`,
    `https://example.test/api/demo/incidents/${incident.incident_id}/investigate`,
    `https://example.test/api/demo/investigations/${investigation.investigation_id}/remediation`,
    `https://example.test/api/demo/remediations/${remediation.proposal_id}/approve`,
    `https://example.test/api/demo/remediations/${remediation.proposal_id}/execute`,
  ]);
  assert.ok(calls.every((call) => call.options.credentials === "include"));
  assert.deepEqual(JSON.parse(calls[0].options.body), { scenario: "blocked_query" });
});

test("maps capacity, session, stale workflow, and provider failures safely", async () => {
  process.env.NEXT_PUBLIC_INCIDENT_API_BASE_URL = "https://example.test/api/demo";
  const cases = [
    [429, { code: "rate_limited" }, "12", "rate_limit"],
    [401, { code: "session_expired" }, null, "session"],
    [409, { code: "conflict" }, null, "conflict"],
    [410, { code: "conflict" }, null, "conflict"],
    [503, { code: "temporarily_unavailable" }, null, "unavailable"],
  ];
  for (const [status, body, retryAfter, kind] of cases) {
    globalThis.fetch = async () => Response.json(body, {
      status,
      headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
    });
    await assert.rejects(createIncident("blocked_query"), (error) =>
      error instanceof IncidentApiError && error.kind === kind &&
      (status !== 429 || error.retryAfter === 12));
  }
});

test("rejects malformed successful payloads and missing configuration", async () => {
  process.env.NEXT_PUBLIC_INCIDENT_API_BASE_URL = "https://example.test/api/demo";
  globalThis.fetch = async () => Response.json({ incident_id: "incomplete" });
  await assert.rejects(createIncident("bad_deployment"), (error) =>
    error instanceof IncidentApiError && error.kind === "unavailable");

  delete process.env.NEXT_PUBLIC_INCIDENT_API_BASE_URL;
  await assert.rejects(createIncident("blocked_query"), (error) =>
    error instanceof IncidentApiError && error.kind === "configuration");
});
