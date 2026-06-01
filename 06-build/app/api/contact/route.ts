import { NextResponse } from "next/server";
import { appendRowToSheet, sheetsServiceConfigured } from "@/lib/google-sheets";

// ── POST /api/contact ──────────────────────────────────────────────────────
//
// The Contact form posts here (same-origin, no CORS). The entry is written to a
// Google Sheet by ONE of two methods, in priority order:
//
//   1. Service account (lib/google-sheets.ts) — the enterprise-correct path for
//      a Sheet restricted to the org. The Sheet is shared only with the robot
//      address; nothing is public. Set GOOGLE_SERVICE_ACCOUNT_EMAIL,
//      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, CONTACT_SHEET_ID.
//   2. Apps Script webhook (scripts/contact-google-sheet.gs) — simpler, but
//      needs the org to permit an "Anyone"-access web app. Set
//      CONTACT_SHEET_WEBHOOK_URL.
//
// Neither set → the entry is logged server-side only (form still works).
// Every submission is logged as a fallback capture regardless. Swapping to a
// real CRM later is a one-line change here; the client contract is unchanged.

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  dialCode?: string;
  phone?: string;
  company?: string;
  companyType?: string;
  country?: string;
  products?: string[] | string;
  message?: string;
  consent?: boolean;
  company_website?: string; // honeypot — real users never fill this
  submittedAt?: string;
};

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot — a bot filled the hidden field. Accept, but drop.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Minimal validation — the real validation is native (required) on the client.
  if (!data.name || !data.email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 },
    );
  }

  const products = Array.isArray(data.products)
    ? data.products.join(", ")
    : data.products ?? "";

  const entry = {
    submittedAt: data.submittedAt ?? new Date().toISOString(),
    name: data.name,
    email: data.email,
    dialCode: data.dialCode ?? "",
    phone: data.phone ?? "",
    company: data.company ?? "",
    companyType: data.companyType ?? "",
    country: data.country ?? "",
    products,
    message: data.message ?? "",
    consent: data.consent ? "Yes" : "No",
  };

  // Fallback capture — visible in server logs even if no Sheet is configured.
  console.log("[contact]", JSON.stringify(entry));

  // Column order must match scripts/contact-google-sheet.gs HEADERS.
  const row = [
    entry.submittedAt,
    entry.name,
    entry.email,
    entry.dialCode,
    entry.phone,
    entry.company,
    entry.companyType,
    entry.country,
    entry.products,
    entry.message,
    entry.consent,
  ];

  // Header-gated diagnostic — `x-debug: 1` surfaces the underlying error in the
  // response (never shown to normal visitors). Used to debug the live wiring.
  const debug = request.headers.get("x-debug") === "1";

  // 1) Service account — works with a private, org-restricted Sheet.
  if (sheetsServiceConfigured()) {
    try {
      await appendRowToSheet(row);
      return NextResponse.json({ ok: true, stored: true });
    } catch (err) {
      console.error("[contact] Sheets append failed:", err);
      return NextResponse.json(
        {
          ok: false,
          error: "Could not store the entry.",
          ...(debug
            ? { detail: err instanceof Error ? err.message : String(err) }
            : {}),
        },
        { status: 502 },
      );
    }
  }

  // 2) Apps Script webhook — only if the org allows an "Anyone"-access web app.
  const webhook = process.env.CONTACT_SHEET_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Sheet webhook responded ${res.status}`);
      return NextResponse.json({ ok: true, stored: true });
    } catch (err) {
      console.error("[contact] forward to Sheet failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not store the entry." },
        { status: 502 },
      );
    }
  }

  // 3) Nothing configured — logged only (the form still succeeds).
  console.warn(
    "[contact] No Sheet configured (service account or webhook) — entry logged only.",
  );
  return NextResponse.json({ ok: true, stored: false });
}
