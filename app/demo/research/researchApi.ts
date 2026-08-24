export type ResearchDepth = "quick" | "deep";

export type ReportCitation = {
  evidence_id: string;
  source_id: string;
  evidence: string;
};

export type CitedReportClaim = {
  statement: string;
  claim_ids: string[];
  citations: ReportCitation[];
};

export type ReportConflict = {
  summary: string;
  positions: CitedReportClaim[];
};

export type ReportUncertainty = {
  statement: string;
  worker_ids: string[];
};

export type ReportRecommendation = {
  guidance: string;
  rationale: string;
  citations: ReportCitation[];
};

export type AggregatedEvidence = ReportCitation;

export type AggregatedClaim = {
  claim_id: string;
  statement: string;
  evidence: AggregatedEvidence[];
  worker_ids: string[];
};

export type SourceProvenance = {
  worker_id: string;
  worker_source_id: string;
};

export type AggregatedSource = {
  source_id: string;
  title: string;
  url: string;
  snippets: string[];
  validated_excerpts: string[];
  provenance: SourceProvenance[];
  publisher: string | null;
};

export type FailedWorkerSummary = {
  worker_id: string;
  code: string;
  message: string;
  assignment: {
    worker_id: string;
    focused_task: string;
    investigation_focus: string;
    evidence_to_find: string[];
  };
};

export type FinalResearchReport = {
  original_question: string;
  objective: string;
  strategy: string;
  executive_summary: CitedReportClaim[];
  key_findings: CitedReportClaim[];
  important_claims: CitedReportClaim[];
  conflicts: ReportConflict[];
  uncertainties: ReportUncertainty[];
  recommendations: ReportRecommendation[];
  evidence_claims: AggregatedClaim[];
  sources: AggregatedSource[];
  failed_workers: FailedWorkerSummary[];
};

export type ResearchErrorKind =
  | "configuration"
  | "validation"
  | "timeout"
  | "backend"
  | "network";

export class ResearchApiError extends Error {
  readonly kind: ResearchErrorKind;
  readonly status?: number;

  constructor(message: string, kind: ResearchErrorKind, status?: number) {
    super(message);
    this.name = "ResearchApiError";
    this.kind = kind;
    this.status = status;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value: unknown): value is string[] {
  return isStringArray(value) && value.length > 0 && value.every(isNonBlankString);
}

function isCitation(value: unknown): value is ReportCitation {
  return isObject(value) &&
    isNonBlankString(value.evidence_id) &&
    isNonBlankString(value.source_id) &&
    isNonBlankString(value.evidence);
}

function isCitedClaim(value: unknown): value is CitedReportClaim {
  return isObject(value) &&
    isNonBlankString(value.statement) &&
    isNonEmptyStringArray(value.claim_ids) &&
    Array.isArray(value.citations) && value.citations.length > 0 &&
    value.citations.every(isCitation);
}

function isProvenance(value: unknown): value is SourceProvenance {
  return isObject(value) && isNonBlankString(value.worker_id) &&
    isNonBlankString(value.worker_source_id);
}

function isAssignment(value: unknown): value is FailedWorkerSummary["assignment"] {
  return isObject(value) && isNonBlankString(value.worker_id) &&
    isNonBlankString(value.focused_task) &&
    isNonBlankString(value.investigation_focus) &&
    isNonEmptyStringArray(value.evidence_to_find);
}

function isFailedWorker(value: unknown): value is FailedWorkerSummary {
  return isObject(value) && isNonBlankString(value.worker_id) &&
    isNonBlankString(value.code) && isNonBlankString(value.message) &&
    isAssignment(value.assignment);
}

function isReport(value: unknown): value is FinalResearchReport {
  if (!isObject(value)) return false;
  const citedSections = ["executive_summary", "key_findings", "important_claims"];
  if (!citedSections.every((key) =>
    Array.isArray(value[key]) && value[key].length > 0 && value[key].every(isCitedClaim)
  )) return false;

  return (
    isNonBlankString(value.original_question) &&
    isNonBlankString(value.objective) &&
    isNonBlankString(value.strategy) &&
    Array.isArray(value.conflicts) && value.conflicts.every((conflict) =>
      isObject(conflict) && isNonBlankString(conflict.summary) &&
      Array.isArray(conflict.positions) && conflict.positions.length >= 2 &&
      conflict.positions.every(isCitedClaim)
    ) &&
    Array.isArray(value.uncertainties) && value.uncertainties.every((item) =>
      isObject(item) && isNonBlankString(item.statement) &&
      isNonEmptyStringArray(item.worker_ids)
    ) &&
    Array.isArray(value.recommendations) && value.recommendations.every((item) =>
      isObject(item) && isNonBlankString(item.guidance) &&
      isNonBlankString(item.rationale) && Array.isArray(item.citations) &&
      item.citations.length > 0 && item.citations.every(isCitation)
    ) &&
    Array.isArray(value.evidence_claims) && value.evidence_claims.length > 0 &&
    value.evidence_claims.every((claim) =>
      isObject(claim) && isNonBlankString(claim.claim_id) &&
      isNonBlankString(claim.statement) && isNonEmptyStringArray(claim.worker_ids) &&
      Array.isArray(claim.evidence) && claim.evidence.length > 0 &&
      claim.evidence.every(isCitation)
    ) &&
    Array.isArray(value.sources) && value.sources.length > 0 &&
    value.sources.every((source) =>
      isObject(source) && isNonBlankString(source.source_id) &&
      isNonBlankString(source.title) && isNonBlankString(source.url) &&
      isNonEmptyStringArray(source.snippets) &&
      isStringArray(source.validated_excerpts) &&
      Array.isArray(source.provenance) && source.provenance.length > 0 &&
      source.provenance.every(isProvenance) &&
      (source.publisher === null || isNonBlankString(source.publisher))
    ) &&
    Array.isArray(value.failed_workers) && value.failed_workers.every(isFailedWorker)
  );
}

function apiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_RESEARCH_API_BASE_URL?.replace(/\/$/, "");
  if (!value) {
    throw new ResearchApiError(
      "The Research Agent API URL is not configured.",
      "configuration",
    );
  }
  return value;
}

function backendDetail(body: unknown): string | null {
  if (!isObject(body)) return null;
  if (typeof body.detail === "string") return body.detail;
  if (isObject(body.detail) && typeof body.detail.message === "string") {
    return body.detail.message;
  }
  return null;
}

export async function research(
  question: string,
  depth: ResearchDepth,
): Promise<FinalResearchReport> {
  const normalizedQuestion = question.trim();
  if (!normalizedQuestion) {
    throw new ResearchApiError("Enter a research question.", "validation");
  }
  if (normalizedQuestion.length > 2_000) {
    throw new ResearchApiError(
      "Research questions must be 2,000 characters or fewer.",
      "validation",
    );
  }

  const baseUrl = apiBaseUrl();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180_000);
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/research`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: normalizedQuestion, depth }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ResearchApiError(
        "The research request timed out. Try Quick depth or a narrower question.",
        "timeout",
      );
    }
    throw new ResearchApiError(
      "Could not reach the Research Agent. Please try again.",
      "network",
    );
  } finally {
    clearTimeout(timeout);
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // The error below remains intentionally generic for non-JSON responses.
  }
  if (!response.ok) {
    const kind: ResearchErrorKind = response.status === 422
      ? "validation"
      : response.status === 504
        ? "timeout"
        : "backend";
    throw new ResearchApiError(
      backendDetail(body) ?? "The Research Agent could not complete this request.",
      kind,
      response.status,
    );
  }
  if (!isReport(body)) {
    throw new ResearchApiError(
      "The Research Agent returned an unexpected report.",
      "backend",
      response.status,
    );
  }
  return body;
}

export function safeSourceUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
