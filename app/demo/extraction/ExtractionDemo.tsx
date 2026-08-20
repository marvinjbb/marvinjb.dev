"use client";

import { DragEvent, useRef, useState } from "react";

import {
  extractInvoice as extractInvoiceRequest,
  ExtractionApiError,
  InvoiceResult,
} from "./extractionApi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type DemoState = "idle" | "ready" | "extracting" | "success" | "error";
type View = "table" | "json";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

function displayValue(value: string | null) {
  return value ?? "Not found";
}

function displayMoney(value: string | null, currency: string | null) {
  if (value === null) return "Not found";
  if (!currency) return value;

  const amount = Number(value);
  if (!Number.isFinite(amount)) return `${currency} ${value}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function ExtractionDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<DemoState>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [view, setView] = useState<View>("table");
  const [dragging, setDragging] = useState(false);
  function selectFile(nextFile?: File) {
    setError("");
    setResult(null);
    setView("table");

    if (!nextFile) return;
    if (nextFile.size === 0) {
      setFile(null);
      setState("error");
      setError("That PDF is empty. Choose a file containing invoice text.");
      return;
    }

    const isPdf =
      nextFile.type === "application/pdf" ||
      (nextFile.type === "" && nextFile.name.toLowerCase().endsWith(".pdf"));
    if (!isPdf) {
      setFile(null);
      setState("error");
      setError("Only PDF files are supported in this demo.");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setState("error");
      setError("That PDF is larger than the 5 MiB demo limit.");
      return;
    }

    setFile(nextFile);
    setState("ready");
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  async function extractInvoice() {
    if (!file) return;
    setError("");
    setState("extracting");
    try {
      const invoice = await extractInvoiceRequest(file);
      setResult(invoice);
      setState("success");
    } catch (caught) {
      setResult(null);
      setState("error");
      setError(
        caught instanceof ExtractionApiError
          ? caught.message
          : "The invoice could not be extracted. Please try again.",
      );
    }
  }

  function reset() {
    setFile(null);
    setError("");
    setResult(null);
    setState("idle");
    setView("table");
    if (inputRef.current) inputRef.current.value = "";
  }

  const showResults = state === "success" && result !== null;

  return (
    <div className="extraction-demo">
      <input
        id="invoice-file"
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="application/pdf,.pdf"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />

      <div
        className={`upload-zone${dragging ? " is-dragging" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setDragging(false);
          }
        }}
        onDrop={handleDrop}
      >
        <span className="upload-index">PDF / 5 MiB MAX</span>
        <div className="upload-mark" aria-hidden="true">PDF</div>
        <div>
          <h3>Drag and drop your invoice here.</h3>
          <p>Text-based PDF only. The file is sent only to your local FastAPI service.</p>
        </div>
        <label className="secondary-button" htmlFor="invoice-file">
          Browse files
        </label>
      </div>

      {file && (
        <div className="selected-file" aria-live="polite">
          <div className="file-badge">PDF</div>
          <div>
            <span>SELECTED FILE</span>
            <strong>{file.name}</strong>
            <small>{formatFileSize(file.size)}</small>
          </div>
          <button type="button" onClick={reset}>Remove</button>
          <button type="button" onClick={() => inputRef.current?.click()}>
            Change
          </button>
        </div>
      )}

      {state === "error" && (
        <div className="demo-error" role="alert">
          <span>{file ? "EXTRACTION ERROR" : "UPLOAD ERROR"}</span>
          <strong>{error}</strong>
          {file ? (
            <button type="button" onClick={extractInvoice}>
              Retry extraction
            </button>
          ) : (
            <button type="button" onClick={() => inputRef.current?.click()}>
              Choose another file
            </button>
          )}
        </div>
      )}

      <div className="demo-actions">
        <button
          className="primary-button"
          type="button"
          disabled={!file || state === "extracting"}
          onClick={extractInvoice}
        >
          {state === "extracting" ? "Extracting invoice…" : "Extract invoice"}
        </button>
        <p aria-live="polite">
          {state === "extracting"
            ? "Uploading to FastAPI and extracting structured fields."
            : "Uses your locally configured Extraction Agent API."}
        </p>
      </div>

      {state === "extracting" && (
        <div className="extracting-state" role="status">
          <span className="status-pulse" aria-hidden="true" />
          <div>
            <strong>Extraction in progress</strong>
            <p>Preparing a structured invoice response…</p>
          </div>
        </div>
      )}

      {showResults && (
        <section className="results-panel" id="results" aria-labelledby="results-title">
          <div className="results-heading">
            <div>
              <p className="overline">02 · STRUCTURED RESULT</p>
              <h3 id="results-title">Invoice extracted.</h3>
            </div>
            <div className="view-tabs" role="tablist" aria-label="Result view">
              <button
                type="button"
                role="tab"
                aria-selected={view === "table"}
                onClick={() => setView("table")}
              >
                Table
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "json"}
                onClick={() => setView("json")}
              >
                JSON
              </button>
            </div>
          </div>

          {view === "table" ? (
            <div role="tabpanel" className="table-view">
              <dl className="invoice-fields">
                <div><dt>Vendor</dt><dd>{displayValue(result.vendor)}</dd></div>
                <div><dt>Invoice number</dt><dd>{displayValue(result.invoice_number)}</dd></div>
                <div><dt>Invoice date</dt><dd>{displayValue(result.invoice_date)}</dd></div>
                <div><dt>Currency</dt><dd>{displayValue(result.currency)}</dd></div>
                <div><dt>Subtotal</dt><dd>{displayMoney(result.subtotal, result.currency)}</dd></div>
                <div><dt>Tax</dt><dd>{displayMoney(result.tax, result.currency)}</dd></div>
                <div className="total-field"><dt>Total</dt><dd>{displayMoney(result.total, result.currency)}</dd></div>
              </dl>
              <div className="line-items">
                <h4>Line items</h4>
                <div className="table-scroll">
                  <table>
                    <thead><tr><th>Description</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead>
                    <tbody>{result.line_items.length > 0 ? result.line_items.map((item) => (
                      <tr key={item.description}>
                        <td>{item.description}</td><td>{displayValue(item.quantity)}</td>
                        <td>{displayMoney(item.unit_price, result.currency)}</td>
                        <td>{displayMoney(item.amount, result.currency)}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4}>No line items were extracted.</td></tr>
                    )}</tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <pre role="tabpanel" className="json-view">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          )}

          {result.warnings.length > 0 && (
            <div className="result-warnings" role="note">
              <strong>Extraction warnings</strong>
              <ul>{result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}</ul>
            </div>
          )}

          <div className="results-footer">
            <p>FastAPI response · Pydantic-validated data</p>
            <button className="secondary-button" type="button" onClick={reset}>
              Upload another invoice
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
