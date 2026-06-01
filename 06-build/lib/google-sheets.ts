import crypto from "node:crypto";

// ── Google Sheets append via a service account ──────────────────────────────
//
// Writes a row to a PRIVATE Google Sheet using a service-account identity — the
// enterprise-correct method when the Sheet is restricted to the organisation
// and anonymous Apps Script web apps aren't allowed. The Sheet is shared only
// with the service-account robot address (plus employees); the server proves it
// is that robot with a signed JWT. No public endpoint, no new dependency
// (Node's built-in crypto signs the JWT; the Sheets REST API is called via
// fetch).
//
// Required env:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL        robot@project.iam.gserviceaccount.com
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  the PEM (literal \n escapes are handled)
//   CONTACT_SHEET_ID                    the spreadsheet id (from its URL)
// Optional:
//   CONTACT_SHEET_RANGE                 default "A:K" (first tab); e.g. "Leads!A:K"

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

/** True when the service-account env is fully configured. */
export function sheetsServiceConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.CONTACT_SHEET_ID,
  );
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string;
  const key = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n",
  );

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = b64url(
    crypto.createSign("RSA-SHA256").update(`${header}.${claim}`).sign(key),
  );
  const assertion = `${header}.${claim}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("No access_token in token response");
  return json.access_token;
}

/** Append one row (array of cell values) to the configured Sheet. */
export async function appendRowToSheet(row: (string | number)[]): Promise<void> {
  const sheetId = process.env.CONTACT_SHEET_ID as string;
  const range = process.env.CONTACT_SHEET_RANGE || "A:K";
  const token = await getAccessToken();

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed (${res.status}): ${await res.text()}`);
  }
}
