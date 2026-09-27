import type {
  AggregatedSource,
  CitedReportClaim,
  FinalResearchReport,
} from "./researchApi.ts";
import { safeSourceUrl } from "./researchApi.ts";

export function normalizeClaimStatement(statement: string): string {
  return statement.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export function excludeDisplayedClaims(
  claims: CitedReportClaim[],
  alreadyDisplayed: CitedReportClaim[],
): CitedReportClaim[] {
  const displayedStatements = new Set(
    alreadyDisplayed.map((claim) => normalizeClaimStatement(claim.statement)),
  );
  return claims.filter(
    (claim) => !displayedStatements.has(normalizeClaimStatement(claim.statement)),
  );
}

export function fullReportCitationCounts(
  report: FinalResearchReport,
): Map<string, number> {
  const counts = new Map<string, number>();
  const citedClaims = [
    ...report.executive_summary,
    ...report.key_findings,
    ...report.important_claims,
    ...report.conflicts.flatMap((conflict) => conflict.positions),
  ];
  const citations = [
    ...citedClaims.flatMap((claim) => claim.citations),
    ...report.recommendations.flatMap((recommendation) => recommendation.citations),
  ];
  for (const citation of citations) {
    counts.set(citation.source_id, (counts.get(citation.source_id) ?? 0) + 1);
  }
  return counts;
}

export function sourceDisplayLabel(source: AggregatedSource): string {
  const publisher = source.publisher?.trim();
  if (publisher) return publisher;

  const safeUrl = safeSourceUrl(source.url);
  if (!safeUrl) return "Web source";

  try {
    return new URL(safeUrl).hostname.replace(/^www\./i, "") || "Web source";
  } catch {
    return "Web source";
  }
}
