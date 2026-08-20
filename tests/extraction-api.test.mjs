import assert from "node:assert/strict";
import test from "node:test";

import {
  extractInvoice,
  ExtractionApiError,
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
