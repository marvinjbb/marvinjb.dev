"use client";

import { useEffect, useMemo, useState } from "react";

import {
  approveRemediation,
  createIncident,
  executeRemediation,
  getIncident,
  IncidentApiError,
  IncidentScenario,
  investigateIncident,
  proposeRemediation,
  PublicIncident,
  PublicInvestigation,
  PublicRemediation,
} from "./incidentApi";

const scenarios: Array<{
  id: IncidentScenario;
  number: string;
  title: string;
  description: string;
  signal: string;
}> = [
  {
    id: "blocked_query",
    number: "01",
    title: "Blocked PostgreSQL Query",
    description: "A transaction holds a database lock while another query waits.",
    signal: "LOCK WAIT",
  },
  {
    id: "connection_exhaustion",
    number: "02",
    title: "Connection Pool Exhaustion",
    description: "The application consumes every pool connection while PostgreSQL still has capacity.",
    signal: "POOL SATURATION",
  },
  {
    id: "bad_deployment",
    number: "03",
    title: "Failing Application Deployment",
    description: "A bad release creates a genuine application/database schema incompatibility.",
    signal: "RELEASE FAILURE",
  },
];

const toolLabels: Record<string, string> = {
  get_incident: "Incident metadata",
  get_incident_events: "Incident events",
  get_application_logs: "Application logs",
  get_database_blocking: "PostgreSQL blocking diagnostics",
  get_database_connections: "PostgreSQL connections",
  get_application_pool_state: "Application pool state",
  get_recent_deployments: "Recent deployments",
  get_runbook: "Troubleshooting runbook",
};

const verificationLabels: Record<string, string> = {
  workload_healthy: "Workload healthy",
  incident_resolved: "Incident resolved",
  blocking_relationship_removed: "Blocking relationship removed",
  pool_available: "Pool capacity restored",
  healthy_release_active: "Healthy v1 release active",
};

type Phase =
  | "idle"
  | "creating"
  | "investigating"
  | "proposing"
  | "awaiting_approval"
  | "approving"
  | "executing"
  | "resolved"
  | "auto_recovered"
  | "error";

function shortId(value: string) {
  return `${value.slice(0, 8)}…`;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function phaseLabel(phase: Phase) {
  const labels: Record<Phase, string> = {
    idle: "Choose a controlled incident",
    creating: "Starting synthetic incident",
    investigating: "AI investigation in progress",
    proposing: "Validating remediation policy",
    awaiting_approval: "Human approval required",
    approving: "Recording human approval",
    executing: "Executing allowlisted remediation",
    resolved: "Recovery verified",
    auto_recovered: "Incident automatically recovered",
    error: "Workflow needs attention",
  };
  return labels[phase];
}

function errorMessage(error: unknown) {
  if (!(error instanceof IncidentApiError)) {
    return "The demo could not complete this step. No remediation was executed.";
  }
  if (error.kind === "rate_limit" && error.retryAfter) {
    return `${error.message} Retry after approximately ${error.retryAfter} seconds.`;
  }
  return error.message;
}

export function IncidentDemo() {
  const [selected, setSelected] = useState<IncidentScenario | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [incident, setIncident] = useState<PublicIncident | null>(null);
  const [investigation, setInvestigation] = useState<PublicInvestigation | null>(null);
  const [remediation, setRemediation] = useState<PublicRemediation | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const report = investigation?.report ?? null;
  const selectedScenario = scenarios.find((item) => item.id === selected) ?? null;
  const knownEvidence = useMemo(
    () => new Set(report?.evidence.map((item) => item.evidence_id) ?? []),
    [report],
  );

  useEffect(() => {
    if (!incident || !["investigating", "awaiting_approval"].includes(phase)) return;
    const timer = window.setInterval(async () => {
      try {
        const current = await getIncident(incident.incident_id);
        setIncident(current);
        if (current.status === "resolved" && phase === "awaiting_approval") {
          setPhase("auto_recovered");
        }
      } catch {
        // The primary workflow request owns user-facing errors; polling is advisory.
      }
    }, 5_000);
    return () => window.clearInterval(timer);
  }, [incident, phase]);

  async function refreshIncident(current: PublicIncident) {
    try {
      const refreshed = await getIncident(current.incident_id);
      setIncident(refreshed);
      return refreshed;
    } catch {
      return current;
    }
  }

  async function runScenario(scenario: IncidentScenario) {
    setSelected(scenario);
    setIncident(null);
    setInvestigation(null);
    setRemediation(null);
    setMessage(null);
    setPhase("creating");
    let created: PublicIncident | null = null;
    try {
      created = await createIncident(scenario);
      setIncident(created);
      setPhase("investigating");
      const completed = await investigateIncident(created.incident_id);
      setInvestigation(completed);
      const current = await refreshIncident(created);
      if (current.status === "resolved") {
        setPhase("auto_recovered");
        return;
      }
      setPhase("proposing");
      const proposal = await proposeRemediation(completed.investigation_id);
      setRemediation(proposal);
      setPhase("awaiting_approval");
    } catch (error) {
      if (created) {
        const current = await refreshIncident(created);
        if (current.status === "resolved") {
          setMessage("The synthetic incident automatically recovered before remediation was executed.");
          setPhase("auto_recovered");
          return;
        }
      }
      setMessage(errorMessage(error));
      setPhase("error");
    }
  }

  async function approveAndExecute() {
    if (!remediation || !incident) return;
    setMessage(null);
    try {
      setPhase("approving");
      const approved = await approveRemediation(remediation.proposal_id);
      setRemediation(approved);
      setPhase("executing");
      const completed = await executeRemediation(remediation.proposal_id);
      setRemediation(completed);
      const current = await refreshIncident(incident);
      setPhase(current.status === "resolved" ? "resolved" : "error");
      if (current.status !== "resolved") {
        setMessage("Recovery verification did not confirm a resolved incident.");
      }
    } catch (error) {
      const current = await refreshIncident(incident);
      if (current.status === "resolved") {
        setMessage("The synthetic incident automatically recovered before remediation was executed.");
        setPhase("auto_recovered");
        return;
      }
      setMessage(errorMessage(error));
      setPhase("error");
    }
  }

  function reset() {
    setSelected(null);
    setPhase("idle");
    setIncident(null);
    setInvestigation(null);
    setRemediation(null);
    setMessage(null);
  }

  const busy = ["creating", "investigating", "proposing", "approving", "executing"].includes(phase);

  return (
    <div className="incident-demo">
      <div className="incident-scenarios" aria-label="Controlled incident scenarios">
        {scenarios.map((scenario) => (
          <article
            className={selected === scenario.id ? "incident-scenario selected" : "incident-scenario"}
            key={scenario.id}
          >
            <div className="scenario-index"><span>{scenario.number}</span><small>{scenario.signal}</small></div>
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
            <button
              type="button"
              onClick={() => void runScenario(scenario.id)}
              disabled={busy || (phase !== "idle" && phase !== "resolved" && phase !== "auto_recovered" && phase !== "error")}
            >
              Run Incident
            </button>
          </article>
        ))}
      </div>

      {phase !== "idle" && (
        <section className="incident-workspace" aria-labelledby="workspace-title">
          <header className="workspace-header">
            <div>
              <p className="overline">LIVE INVESTIGATION WORKSPACE</p>
              <h3 id="workspace-title">{selectedScenario?.title}</h3>
            </div>
            <div className={`workflow-state state-${phase}`} role="status" aria-live="polite">
              <span aria-hidden="true" />
              <strong>{phaseLabel(phase)}</strong>
            </div>
          </header>

          {incident && (
            <div className="incident-metadata">
              <div><span>INCIDENT</span><strong title={incident.incident_id}>{shortId(incident.incident_id)}</strong></div>
              <div><span>STATUS</span><strong>{incident.status.replace("_", " ")}</strong></div>
              <div><span>STARTED</span><strong>{formatTime(incident.started_at)}</strong></div>
              <div><span>RECOVERY</span><strong>Automatic at 120s</strong></div>
            </div>
          )}

          {phase === "investigating" && (
            <div className="investigation-wait" aria-live="polite">
              <div className="activity-pulse" aria-hidden="true"><span /><span /><span /></div>
              <div>
                <strong>Investigating incident…</strong>
                <p>The backend selects restricted diagnostics and returns one validated report. No fabricated percentage or tool activity is shown while it runs.</p>
              </div>
            </div>
          )}

          {message && <div className="incident-alert" role="alert"><strong>Demo status</strong><p>{message}</p></div>}

          {report && (
            <div className="investigation-results">
              <section className="root-cause-card">
                <div className="result-heading"><p className="overline">LIKELY CAUSE</p><span>{report.primary_hypothesis.confidence} confidence</span></div>
                <h4>{report.primary_hypothesis.cause}</h4>
                <p>{report.primary_hypothesis.explanation}</p>
                <div className="executive-summary"><strong>Executive summary</strong><p>{report.executive_summary}</p></div>
              </section>

              <section className="tool-activity-panel">
                <div className="result-heading"><p className="overline">DIAGNOSTIC ACTIVITY</p><span>{report.tool_calls} calls</span></div>
                <ol>
                  {report.activity.map((item) => (
                    <li key={`${item.tool}-${item.timestamp}`}>
                      <span aria-hidden="true">✓</span>
                      <div><strong>{toolLabels[item.tool] ?? item.tool}</strong><small>{item.result_count} evidence {item.result_count === 1 ? "record" : "records"}</small></div>
                    </li>
                  ))}
                </ol>
                <p className="activity-note">Only tools selected during this investigation are shown.</p>
              </section>

              <section className="evidence-panel">
                <div className="result-heading"><p className="overline">SUPPORTING EVIDENCE</p><span>{report.evidence.length} validated records</span></div>
                <div className="evidence-grid">
                  {report.evidence.map((item, index) => (
                    <article key={item.evidence_id}>
                      <div><span>{String(index + 1).padStart(2, "0")}</span><small>{item.evidence_type.replaceAll("_", " ")}</small></div>
                      <p>{item.summary}</p>
                      <footer><span>{item.source.replaceAll("_", " ")}</span><code title={item.evidence_id}>{shortId(item.evidence_id)}</code></footer>
                    </article>
                  ))}
                </div>
                <p className="grounding-note">All report citations resolve to the curated evidence IDs shown above: <strong>{report.primary_hypothesis.evidence_ids.every((id) => knownEvidence.has(id)) ? "validated" : "invalid"}</strong>.</p>
              </section>

              {report.uncertainties.length > 0 && (
                <section className="incident-uncertainties">
                  <p className="overline">UNCERTAINTIES</p>
                  <ul>{report.uncertainties.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              )}

              <section className="remediation-panel">
                <div>
                  <p className="overline">CONTROLLED REMEDIATION</p>
                  <h4>{remediation?.summary ?? report.recommended_actions[0]?.action ?? "No remediation proposed"}</h4>
                  <p>{report.recommended_actions[0]?.reason}</p>
                  <strong className="approval-boundary">Human approval required</strong>
                </div>
                <div className="remediation-action">
                  {phase === "awaiting_approval" && remediation && (
                    <button type="button" onClick={() => void approveAndExecute()}>Approve Remediation</button>
                  )}
                  {(phase === "approving" || phase === "executing") && <span role="status">{phaseLabel(phase)}…</span>}
                  {phase === "auto_recovered" && <span>The incident recovered automatically. No remediation was executed.</span>}
                  {phase === "resolved" && <span className="recovery-complete">✓ Remediation and recovery verified</span>}
                </div>
              </section>

              {remediation?.verification_result && (
                <section className="verification-panel">
                  <p className="overline">POST-ACTION VERIFICATION</p>
                  <div>{Object.entries(remediation.verification_result).map(([key, passed]) => (
                    <span key={key}><b aria-hidden="true">{passed ? "✓" : "×"}</b>{verificationLabels[key] ?? key.replaceAll("_", " ")}</span>
                  ))}</div>
                </section>
              )}

              <section className="incident-audit">
                <p className="overline">AUDIT TRAIL</p>
                <ol>
                  {incident?.activity.map((item) => <li key={`${item.event}-${item.occurred_at}`}><time>{formatTime(item.occurred_at)}</time><span>{item.event}</span></li>)}
                  {remediation?.activity.map((item) => <li key={`${item.event}-${item.occurred_at}`}><time>{formatTime(item.occurred_at)}</time><span>{item.event}</span></li>)}
                </ol>
              </section>
            </div>
          )}

          {(phase === "resolved" || phase === "auto_recovered" || phase === "error") && (
            <button type="button" className="secondary-button incident-reset" onClick={reset}>Choose another scenario</button>
          )}
        </section>
      )}
    </div>
  );
}
