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

export type SourcePresentationCategory =
  | "official"
  | "independent"
  | "unknown"
  | "promotional";

export type PresentedSource = {
  source: AggregatedSource;
  index: number;
  count: number;
  category: SourcePresentationCategory;
};

function sourceUrl(source: AggregatedSource): URL | null {
  const safeUrl = safeSourceUrl(source.url);
  if (!safeUrl) return null;

  try {
    return new URL(safeUrl);
  } catch {
    return null;
  }
}

export function getSourceHostname(source: AggregatedSource): string | null {
  return sourceUrl(source)?.hostname.replace(/^www\./i, "").toLowerCase() ?? null;
}

export function classifySourceForPresentation(
  source: AggregatedSource,
): SourcePresentationCategory {
  const url = sourceUrl(source);
  if (!url) return "unknown";

  const hostname = getSourceHostname(source);
  const path = url.pathname.toLowerCase();
  if (/(?:^|\/)(?:sponsored|advertorial|pricing|solutions)(?:\/|$)/.test(path)) {
    return "promotional";
  }
  if (
    hostname?.endsWith(".gov") ||
    hostname === "docs.python.org" ||
    (hostname === "w3.org" && path.startsWith("/tr/")) ||
    (hostname === "rfc-editor.org" && path.startsWith("/rfc/"))
  ) {
    return "official";
  }
  if (hostname === "reuters.com" || hostname === "apnews.com") {
    return "independent";
  }
  return "unknown";
}

export function sourcePresentationLabel(category: SourcePresentationCategory): string | null {
  switch (category) {
    case "official": return "Official source";
    case "independent": return "Independent publication";
    case "promotional": return "Promotional source";
    case "unknown": return null;
  }
}

const categoryPriority: Record<SourcePresentationCategory, number> = {
  official: 0,
  independent: 1,
  unknown: 2,
  promotional: 3,
};

export function rankTopSources(report: FinalResearchReport): PresentedSource[] {
  const citationCounts = fullReportCitationCounts(report);
  const candidates = report.sources.map((source, index) => ({
    source,
    index,
    count: citationCounts.get(source.source_id) ?? 0,
    category: classifySourceForPresentation(source),
  }));
  const compare = (left: PresentedSource, right: PresentedSource) =>
    categoryPriority[left.category] - categoryPriority[right.category] ||
    right.count - left.count ||
    left.index - right.index;
  const cited = candidates.filter((item) => item.count > 0).sort(compare);
  const uncited = candidates.filter((item) => item.count === 0).sort(compare);
  const selected: PresentedSource[] = [];
  const hostnameCounts = new Map<string, number>();

  // Prefer distinct cited hosts; fill from deferred same-host sources before uncited ones.
  for (const group of [cited, uncited]) {
    const deferred: PresentedSource[] = [];
    for (const item of group) {
      if (selected.length === 5) break;
      const hostname = getSourceHostname(item.source);
      if (hostname && (hostnameCounts.get(hostname) ?? 0) >= 2) {
        deferred.push(item);
        continue;
      }
      selected.push(item);
      if (hostname) hostnameCounts.set(hostname, (hostnameCounts.get(hostname) ?? 0) + 1);
    }
    for (const item of deferred) {
      if (selected.length === 5) break;
      selected.push(item);
      const hostname = getSourceHostname(item.source);
      if (hostname) hostnameCounts.set(hostname, (hostnameCounts.get(hostname) ?? 0) + 1);
    }
    if (selected.length === 5) break;
  }

  return selected;
}

export function sourceDisplayLabel(source: AggregatedSource): string {
  const publisher = source.publisher?.trim();
  if (publisher) return publisher;
  return getSourceHostname(source) ?? "Web source";
}
