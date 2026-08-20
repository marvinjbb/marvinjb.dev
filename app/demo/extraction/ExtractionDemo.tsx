"use client";

import { DragEvent, useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type DemoState = "idle" | "ready" | "extracting" | "success" | "error";
type View = "table" | "json";

const mockInvoice = {
  vendor: "Northstar Office Supply",
  invoice_number: "INV-2026-0148",
  invoice_date: "2026-08-12",
  currency: "USD",
  subtotal: "240.00",
  tax: "19.20",
  total: "259.20",
  line_items: [
    {
      description: "Ergonomic keyboard",
      quantity: "2",
      unit_price: "120.00",
      amount: "240.00",
    },
  ],
  warnings: [],
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

export function ExtractionDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<DemoState>("idle");
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("table");
  const [dragging, setDragging] = useState(false);

  function selectFile(nextFile?: File) {
    setError("");
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
    await new Promise((resolve) => window.setTimeout(resolve, 1100));
    setState("success");
  }

  function reset() {
    setFile(null);
    setError("");
    setState("idle");
    setView("table");
    if (inputRef.current) inputRef.current.value = "";
  }

  const showResults = state === "success";

  return (
    <div className="extraction-demo">
      <input
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
          <p>Text-based PDF only. The file is not uploaded during this UI phase.</p>
        </div>
        <button
          className="secondary-button"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Browse files
        </button>
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
          <span>UPLOAD ERROR</span>
          <strong>{error}</strong>
          <button type="button" onClick={() => inputRef.current?.click()}>
            Choose another file
          </button>
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
            ? "Reading the document and validating structured fields."
            : "Mocked locally for Phase 2 — no API request will be made."}
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
                <div><dt>Vendor</dt><dd>{mockInvoice.vendor}</dd></div>
                <div><dt>Invoice number</dt><dd>{mockInvoice.invoice_number}</dd></div>
                <div><dt>Invoice date</dt><dd>{mockInvoice.invoice_date}</dd></div>
                <div><dt>Currency</dt><dd>{mockInvoice.currency}</dd></div>
                <div><dt>Subtotal</dt><dd>${mockInvoice.subtotal}</dd></div>
                <div><dt>Tax</dt><dd>${mockInvoice.tax}</dd></div>
                <div className="total-field"><dt>Total</dt><dd>${mockInvoice.total}</dd></div>
              </dl>
              <div className="line-items">
                <h4>Line items</h4>
                <div className="table-scroll">
                  <table>
                    <thead><tr><th>Description</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead>
                    <tbody>{mockInvoice.line_items.map((item) => (
                      <tr key={item.description}>
                        <td>{item.description}</td><td>{item.quantity}</td>
                        <td>${item.unit_price}</td><td>${item.amount}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <pre role="tabpanel" className="json-view">
              <code>{JSON.stringify(mockInvoice, null, 2)}</code>
            </pre>
          )}

          <div className="results-footer">
            <p>Mock response · Schema-valid example data</p>
            <button className="secondary-button" type="button" onClick={reset}>
              Upload another invoice
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
