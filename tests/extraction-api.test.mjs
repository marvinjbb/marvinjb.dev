import assert from "node:assert/strict";
import test from "node:test";

import {
  extractInvoice,
  ExtractionApiError,
  queryInvoice,
} from "../app/demo/extraction/extractionApi.ts";

const invoice = {
  vendor: "Acme Supplies",
  invoice_number: "INV-1001",
  invoice_date: "2026-08-20",
  currency: "USD",
  subtotal: "100.00",
  tax: "8.25",
  total: "108.25",
  line_items: [],
  warnings: [],
};

function pdfFile() {
  return new File(["%PDF-test"], "invoice.pdf", {
    type: "application/pdf",
  });
}

test("posts one PDF using the backend multipart field", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test/";
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return Response.json(invoice);
  };

  const result = await extractInvoice(pdfFile());

  assert.deepEqual(result, invoice);
  assert.equal(request.url, "http://example.test/extractions/invoice");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.body.get("file").name, "invoice.pdf");
});

test("maps backend validation details", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json(
    { detail: "The uploaded PDF could not be read." },
    { status: 422 },
  );

  await assert.rejects(
    extractInvoice(pdfFile()),
    (error) =>
      error instanceof ExtractionApiError &&
      error.kind === "validation" &&
      error.status === 422 &&
      error.message === "The uploaded PDF could not be read.",
  );
});

test("maps provider and backend failures", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json(
    { detail: "The invoice extraction provider timed out." },
    { status: 504 },
  );

  await assert.rejects(
    extractInvoice(pdfFile()),
    (error) =>
      error instanceof ExtractionApiError &&
      error.kind === "backend" &&
      error.status === 504,
  );
});

test("maps network failures", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => {
    throw new TypeError("connection refused");
  };

  await assert.rejects(
    extractInvoice(pdfFile()),
    (error) =>
      error instanceof ExtractionApiError && error.kind === "network",
  );
});

test("rejects unexpected successful response shapes", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json({ vendor: "Incomplete" });

  await assert.rejects(
    extractInvoice(pdfFile()),
    (error) =>
      error instanceof ExtractionApiError && error.kind === "backend",
  );
});

test("posts a question and validated invoice without the original PDF", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test/";
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return Response.json({ answer: "The total is USD 108.25." });
  };

  const result = await queryInvoice("  What is the total?  ", invoice);
  const body = JSON.parse(request.options.body);

  assert.deepEqual(result, { answer: "The total is USD 108.25." });
  assert.equal(request.url, "http://example.test/extractions/invoice/query");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.headers["Content-Type"], "application/json");
  assert.deepEqual(body, { question: "What is the total?", invoice });
  assert.equal("file" in body, false);
  assert.equal(request.options.body instanceof FormData, false);
});

test("blocks empty and oversized invoice questions before fetch", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return Response.json({ answer: "unused" });
  };

  await assert.rejects(
    queryInvoice("   ", invoice),
    (error) => error instanceof ExtractionApiError && error.kind === "validation",
  );
  await assert.rejects(
    queryInvoice("x".repeat(501), invoice),
    (error) => error instanceof ExtractionApiError && error.kind === "validation",
  );
  assert.equal(fetchCount, 0);
});

test("maps query backend and network errors", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json(
    { detail: "The invoice query provider timed out." },
    { status: 504 },
  );

  await assert.rejects(
    queryInvoice("What is the total?", invoice),
    (error) =>
      error instanceof ExtractionApiError &&
      error.kind === "backend" &&
      error.status === 504,
  );

  globalThis.fetch = async () => {
    throw new TypeError("connection refused");
  };
  await assert.rejects(
    queryInvoice("What is the total?", invoice),
    (error) => error instanceof ExtractionApiError && error.kind === "network",
  );
});

test("rejects unexpected successful query responses", async () => {
  process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL = "http://example.test";
  globalThis.fetch = async () => Response.json({ answer: "" });

  await assert.rejects(
    queryInvoice("What is the total?", invoice),
    (error) => error instanceof ExtractionApiError && error.kind === "backend",
  );
});
