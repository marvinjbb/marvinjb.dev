export type InvoiceLineItem = {
  description: string;
  quantity: string | null;
  unit_price: string | null;
  amount: string | null;
};

export type InvoiceResult = {
  vendor: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
  currency: string | null;
  subtotal: string | null;
  tax: string | null;
  total: string | null;
  line_items: InvoiceLineItem[];
  warnings: string[];
};

export type ExtractionErrorKind =
  | "configuration"
  | "validation"
  | "backend"
  | "network";

export class ExtractionApiError extends Error {
  readonly kind: ExtractionErrorKind;
  readonly status?: number;

  constructor(
    message: string,
    kind: ExtractionErrorKind,
    status?: number,
  ) {
    super(message);
    this.name = "ExtractionApiError";
    this.kind = kind;
    this.status = status;
  }
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isInvoiceResult(value: unknown): value is InvoiceResult {
  if (typeof value !== "object" || value === null) return false;
  const invoice = value as Record<string, unknown>;
  const scalarFields = [
    "vendor",
    "invoice_number",
    "invoice_date",
    "currency",
    "subtotal",
    "tax",
    "total",
  ];

  if (!scalarFields.every((field) => isNullableString(invoice[field]))) {
    return false;
  }
  if (!Array.isArray(invoice.warnings) || !invoice.warnings.every(
    (warning) => typeof warning === "string",
  )) {
    return false;
  }
  if (!Array.isArray(invoice.line_items)) return false;

  return invoice.line_items.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const lineItem = item as Record<string, unknown>;
    return (
      typeof lineItem.description === "string" &&
      isNullableString(lineItem.quantity) &&
      isNullableString(lineItem.unit_price) &&
      isNullableString(lineItem.amount)
    );
  });
}

async function readResponseBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function extractInvoice(file: File): Promise<InvoiceResult> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTRACTION_API_BASE_URL?.replace(
    /\/$/,
    "",
  );
  if (!baseUrl) {
    throw new ExtractionApiError(
      "The local Extraction Agent API URL is not configured.",
      "configuration",
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/extractions/invoice`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ExtractionApiError(
      "Could not reach the local Extraction Agent. Confirm FastAPI is running.",
      "network",
    );
  }

  const body = await readResponseBody(response);
  if (!response.ok) {
    const detail =
      typeof body === "object" &&
      body !== null &&
      typeof (body as Record<string, unknown>).detail === "string"
        ? (body as Record<string, string>).detail
        : "The Extraction Agent could not complete this request.";
    const kind: ExtractionErrorKind =
      response.status >= 400 && response.status < 500
        ? "validation"
        : "backend";
    throw new ExtractionApiError(detail, kind, response.status);
  }

  if (!isInvoiceResult(body)) {
    throw new ExtractionApiError(
      "The Extraction Agent returned an unexpected response.",
      "backend",
      response.status,
    );
  }

  return body;
}
