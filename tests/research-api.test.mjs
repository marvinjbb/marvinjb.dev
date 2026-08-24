import assert from "node:assert/strict";
import test from "node:test";

import {
  research,
  ResearchApiError,
  safeSourceUrl,
} from "../app/demo/research/researchApi.ts";

const citation = {
  evidence_id: "evidence-1",
  source_id: "source-1",
  evidence: "Validated evidence.",
};
const claim = {
  statement: "A grounded finding.",
  claim_ids: ["claim-1"],
  citations: [citation],
};
const report = {
  original_question: "Is this grounded?",
  objective: "Assess grounding.",
  strategy: "Compare evidence.",
  executive_summary: [claim],
  key_findings: [claim],
  important_claims: [claim],
  conflicts: [],
  uncertainties: [{ statement: "Coverage is limited.", worker_ids: ["worker-1"] }],
  recommendations: [{ guidance: "Proceed carefully.", rationale: "Evidence is limited.", citations: [citation] }],
  evidence_claims: [{ claim_id: "claim-1", statement: "A grounded finding.", evidence: [citation], worker_ids: ["worker-1"] }],
  sources: [{ source_id: "source-1", title: "Report", url: "https://example.com/report", snippets: ["Validated evidence."], validated_excerpts: ["Validated evidence."], provenance: [{ worker_id: "worker-1", worker_source_id: "source-1" }], publisher: null }],
  failed_workers: [],
};

test("posts one question and depth to the complete research endpoint", async () => {
  process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL = "http://example.test/";
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return Response.json(report);
  };

  const result = await research("  Is this grounded?  ", "deep");

  assert.deepEqual(result, report);
  assert.equal(request.url, "http://example.test/research");
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), {
    question: "Is this grounded?",
    depth: "deep",
  });
  assert.equal("worker_count" in JSON.parse(request.options.body), false);
});

test("rejects empty and oversized questions before fetch", async () => {
  process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL = "http://example.test";
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; return Response.json(report); };

  await assert.rejects(research("  ", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "validation");
  await assert.rejects(research("x".repeat(2_001), "deep"), (error) =>
    error instanceof ResearchApiError && error.kind === "validation");
  assert.equal(calls, 0);
});

test("reports missing public API configuration before fetch", async () => {
  delete process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL;
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; return Response.json(report); };

  await assert.rejects(research("Question?", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "configuration");
  assert.equal(calls, 0);
});

test("maps validation, timeout, backend, and network failures", async () => {
  process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json({ detail: "Question is invalid." }, { status: 422 });
  await assert.rejects(research("Question?", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "validation" && error.status === 422);

  globalThis.fetch = async () => Response.json({ detail: "Synthesis timed out." }, { status: 504 });
  await assert.rejects(research("Question?", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "timeout");

  globalThis.fetch = async () => Response.json({ detail: { message: "All workers failed." } }, { status: 424 });
  await assert.rejects(research("Question?", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "backend" && error.message === "All workers failed.");

  globalThis.fetch = async () => { throw new TypeError("connection refused"); };
  await assert.rejects(research("Question?", "quick"), (error) =>
    error instanceof ResearchApiError && error.kind === "network");
});

test("rejects malformed successful reports", async () => {
  process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL = "http://example.test";
  const malformedReports = [
    { original_question: "Incomplete" },
    { ...report, executive_summary: [] },
    { ...report, sources: [{ ...report.sources[0], provenance: [{}] }] },
    { ...report, failed_workers: [{ worker_id: "worker-2", code: "timeout", message: "Failed" }] },
  ];

  for (const malformed of malformedReports) {
    globalThis.fetch = async () => Response.json(malformed);
    await assert.rejects(research("Question?", "quick"), (error) =>
      error instanceof ResearchApiError && error.kind === "backend");
  }
});

test("allows only HTTP and HTTPS source links", () => {
  assert.equal(safeSourceUrl("javascript:alert(1)"), null);
  assert.equal(safeSourceUrl("not a URL"), null);
  assert.equal(safeSourceUrl("https://example.com/report"), "https://example.com/report");
});
