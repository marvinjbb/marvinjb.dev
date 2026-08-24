"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  CitedReportClaim,
  FinalResearchReport,
  ReportCitation,
  research,
  ResearchApiError,
  ResearchDepth,
  safeSourceUrl,
} from "./researchApi";

const PROGRESS_STAGES = [
  "Analyzing research question",
  "Creating research plan",
  "Research workers launched",
  "Searching and evaluating sources",
  "Grounding evidence",
  "Synthesizing findings",
  "Final report ready",
];

type DemoState = "idle" | "researching" | "success" | "error";

function CitationLinks({
  citations,
  sourceNumbers,
}: {
  citations: ReportCitation[];
  sourceNumbers: Map<string, number>;
}) {
  return (
    <span className="citation-links" aria-label="Citations">
      {citations.map((citation) => (
        <a
          key={`${citation.evidence_id}-${citation.source_id}`}
          href={`#source-${citation.source_id}`}
          title={`View source ${sourceNumbers.get(citation.source_id) ?? ""}`}
        >
          [{sourceNumbers.get(citation.source_id) ?? "?"}]
        </a>
      ))}
    </span>
  );
}

function ClaimList({
  claims,
  sourceNumbers,
}: {
  claims: CitedReportClaim[];
  sourceNumbers: Map<string, number>;
}) {
  return (
    <div className="report-claims">
      {claims.map((claim) => (
        <article key={`${claim.claim_ids.join("-")}-${claim.statement}`}>
          <p>{claim.statement}</p>
          <CitationLinks citations={claim.citations} sourceNumbers={sourceNumbers} />
        </article>
      ))}
    </div>
  );
}

function ResearchReport({ report }: { report: FinalResearchReport }) {
  const sourceNumbers = useMemo(
    () => new Map(report.sources.map((source, index) => [source.source_id, index + 1])),
    [report.sources],
  );

  return (
    <section className="research-report" id="report" aria-labelledby="report-title">
      <header className="report-header">
        <div>
          <p className="overline">VALIDATED · CITED REPORT</p>
          <h2 id="report-title">Research complete.</h2>
        </div>
        <div className="report-stats" aria-label="Report totals">
          <span><strong>{report.evidence_claims.length}</strong> grounded claims</span>
          <span><strong>{report.sources.length}</strong> sources</span>
        </div>
      </header>

      <div className="report-question">
        <span>ORIGINAL QUESTION</span>
        <h3>{report.original_question}</h3>
        <p><strong>Objective:</strong> {report.objective}</p>
        <p><strong>Strategy:</strong> {report.strategy}</p>
      </div>

      <section className="report-section report-summary">
        <p className="overline">01 · EXECUTIVE SUMMARY</p>
        <ClaimList claims={report.executive_summary} sourceNumbers={sourceNumbers} />
      </section>

      <section className="report-section">
        <p className="overline">02 · KEY FINDINGS</p>
        <ClaimList claims={report.key_findings} sourceNumbers={sourceNumbers} />
      </section>

      <section className="report-section">
        <p className="overline">03 · IMPORTANT EVIDENCE</p>
        <ClaimList claims={report.important_claims} sourceNumbers={sourceNumbers} />
      </section>

      {report.conflicts.length > 0 && (
        <section className="report-section">
          <p className="overline">04 · CONFLICTING EVIDENCE</p>
          <div className="conflict-list">
            {report.conflicts.map((conflict) => (
              <article key={conflict.summary}>
                <h3>{conflict.summary}</h3>
                <ClaimList claims={conflict.positions} sourceNumbers={sourceNumbers} />
              </article>
            ))}
          </div>
        </section>
      )}

      {report.recommendations.length > 0 && (
        <section className="report-section">
          <p className="overline">05 · DECISION GUIDANCE</p>
          <div className="recommendation-list">
            {report.recommendations.map((recommendation) => (
              <article key={recommendation.guidance}>
                <h3>{recommendation.guidance}</h3>
                <p>{recommendation.rationale}</p>
                <CitationLinks
                  citations={recommendation.citations}
                  sourceNumbers={sourceNumbers}
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {report.uncertainties.length > 0 && (
        <section className="report-section">
          <p className="overline">06 · UNCERTAINTIES + LIMITATIONS</p>
          <ul className="uncertainty-list">
            {report.uncertainties.map((uncertainty) => (
              <li key={`${uncertainty.worker_ids.join("-")}-${uncertainty.statement}`}>
                <span>{uncertainty.worker_ids.join(", ")}</span>
                <p>{uncertainty.statement}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {report.failed_workers.length > 0 && (
        <section className="report-section partial-failures" role="note">
          <p className="overline">PARTIAL WORKER FAILURES</p>
          {report.failed_workers.map((failure) => (
            <article key={failure.worker_id}>
              <strong>{failure.worker_id} · {failure.code}</strong>
              <p>{failure.assignment.focused_task}</p>
              <span>{failure.message}</span>
            </article>
          ))}
        </section>
      )}

      <section className="report-section evidence-catalog">
        <p className="overline">07 · GROUNDED EVIDENCE CATALOG</p>
        <p className="catalog-intro">
          Every factual report statement resolves to these application-owned claims and
          exact evidence records.
        </p>
        <div>
          {report.evidence_claims.map((claim) => (
            <details key={claim.claim_id}>
              <summary>
                <span>{claim.claim_id}</span>
                <strong>{claim.statement}</strong>
                <small>{claim.evidence.length} evidence record{claim.evidence.length === 1 ? "" : "s"}</small>
              </summary>
              <div className="evidence-records">
                {claim.evidence.map((evidence) => (
                  <article key={evidence.evidence_id}>
                    <p>{evidence.evidence}</p>
                    <a href={`#source-${evidence.source_id}`}>
                      Source [{sourceNumbers.get(evidence.source_id) ?? "?"}]
                    </a>
                  </article>
                ))}
                <small>Validated by {claim.worker_ids.join(", ")}</small>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="report-section source-catalog">
        <p className="overline">08 · SOURCES + CITATIONS</p>
        <div>
          {report.sources.map((source, index) => {
            const url = safeSourceUrl(source.url);
            return (
              <article id={`source-${source.source_id}`} key={source.source_id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{source.title}</h3>
                  <p>
                    {source.publisher ?? "Web source"} · Referenced by {source.provenance.length}
                    {source.provenance.length === 1 ? " worker" : " workers"}
                  </p>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Visit source ↗
                    </a>
                  ) : <em>Source URL unavailable</em>}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export function ResearchDemo() {
  const [question, setQuestion] = useState("");
  const [depth, setDepth] = useState<ResearchDepth>("quick");
  const [state, setState] = useState<DemoState>("idle");
  const [report, setReport] = useState<FinalResearchReport | null>(null);
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (state !== "researching") return;
    const timer = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, PROGRESS_STAGES.length - 2));
    }, 4_500);
    return () => window.clearInterval(timer);
  }, [state]);

  async function startResearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "researching") return;
    setError("");
    setReport(null);
    setStage(0);
    setState("researching");
    try {
      const result = await research(question, depth);
      setStage(PROGRESS_STAGES.length - 1);
      setReport(result);
      setState("success");
      window.setTimeout(() => {
        document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (caught) {
      setState("error");
      setError(
        caught instanceof ResearchApiError
          ? caught.message
          : "The research request could not be completed. Please try again.",
      );
    }
  }

  return (
    <div className="research-demo">
      <form className="research-form" onSubmit={startResearch}>
        <label htmlFor="research-question">Research question</label>
        <textarea
          id="research-question"
          value={question}
          maxLength={2_000}
          rows={5}
          placeholder="What should the research team investigate?"
          disabled={state === "researching"}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <div className="research-controls">
          <fieldset disabled={state === "researching"}>
            <legend>Research depth</legend>
            {(["quick", "deep"] as const).map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="depth"
                  value={option}
                  checked={depth === option}
                  onChange={() => setDepth(option)}
                />
                <span>{option === "quick" ? "Quick" : "Deep"}</span>
                <small>
                  {option === "quick"
                    ? "Focused plan, usually fewer workers"
                    : "Broader plan, usually more workers"}
                </small>
              </label>
            ))}
          </fieldset>
          <button
            className="primary-button"
            type="submit"
            disabled={state === "researching" || !question.trim()}
          >
            {state === "researching" ? "Research in progress…" : "Start Research"}
          </button>
        </div>
        <div className="question-limit">
          <span>One question per request</span>
          <span>{question.length.toLocaleString()} / 2,000</span>
        </div>
      </form>

      {state === "researching" && (
        <section className="research-progress" role="status" aria-live="polite">
          <div className="progress-heading">
            <div><span className="status-pulse" aria-hidden="true" /><strong>Research request running</strong></div>
            <small>Estimated phase · the API returns one completed report, not live events</small>
          </div>
          <ol>
            {PROGRESS_STAGES.map((label, index) => (
              <li
                key={label}
                className={index < stage ? "is-complete" : index === stage ? "is-current" : ""}
                aria-current={index === stage ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
              </li>
            ))}
          </ol>
        </section>
      )}

      {state === "error" && (
        <div className="demo-error research-error" role="alert">
          <span>RESEARCH ERROR</span>
          <strong>{error}</strong>
          <button type="button" onClick={() => setState("idle")}>Edit question</button>
        </div>
      )}

      {state === "idle" && !report && (
        <div className="research-empty">
          <span>READY</span>
          <p>Your completed, source-grounded report will appear here.</p>
        </div>
      )}

      {state === "success" && report && <ResearchReport report={report} />}
    </div>
  );
}
