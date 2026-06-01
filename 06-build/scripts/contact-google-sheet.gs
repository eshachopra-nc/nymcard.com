/**
 * NymCard — Contact form → Google Sheet
 * ======================================
 * Appends each contact-form submission as a row. The Next.js route
 * (app/api/contact/route.ts) POSTs the entry here server-side.
 *
 * SETUP (one time, ~3 minutes)
 * 1. Create a Google Sheet (e.g. "NymCard — Website Leads").
 * 2. Extensions → Apps Script. Delete any boilerplate, paste this whole file.
 * 3. Save. Then Deploy → New deployment → gear icon → Web app:
 *      - Description:  contact-form
 *      - Execute as:   Me
 *      - Who has access: Anyone
 *    → Deploy → Authorize → copy the "Web app" URL
 *    (looks like https://script.google.com/macros/s/AKfy.../exec).
 * 4. Put that URL in the site's environment as CONTACT_SHEET_WEBHOOK_URL:
 *      - Local:  06-build/.env.local →  CONTACT_SHEET_WEBHOOK_URL=https://script.google.com/.../exec
 *      - Vercel: Project → Settings → Environment Variables (Production)
 *    Restart `npm run dev` / redeploy. Done — submissions now land in the Sheet.
 *
 * To change where rows go, edit HEADERS / the column order below.
 * After editing the script, redeploy (Deploy → Manage deployments → Edit → new version).
 */

var HEADERS = [
  "Submitted At",
  "Name",
  "Work Email",
  "Dial Code",
  "Phone",
  "Company",
  "Company Type",
  "Country",
  "Products",
  "Message",
  "Consent",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write the header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    var products = Array.isArray(data.products)
      ? data.products.join(", ")
      : data.products || "";

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.dialCode || "",
      data.phone || "",
      data.company || "",
      data.companyType || "",
      data.country || "",
      products,
      data.message || "",
      data.consent ? "Yes" : "No",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
