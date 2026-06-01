# Contact form → Google Sheet

The Contact form (`/company/contact`) posts to `app/api/contact/route.ts`, which
writes each entry to a Google Sheet. Two methods are supported; pick the one
your Google admin allows. **The Sheet stays private to NymCard in both.**

---

## Option A — Service account (recommended for a restricted Workspace)

The server authenticates as a "robot" identity. The Sheet is shared only with
that robot (and your employees). Nothing is public — no admin exception needed.

1. **Create the Sheet** (e.g. "NymCard — Website Leads"). Optionally paste this
   header row into row 1:
   `Submitted At | Name | Work Email | Dial Code | Phone | Company | Company Type | Country | Products | Message | Consent`
2. **Create a service account** (you or IT, in Google Cloud Console):
   - APIs & Services → **Enable** the *Google Sheets API*.
   - IAM & Admin → Service Accounts → **Create service account** → name it
     `nymcard-contact-form`.
   - On the account → Keys → **Add key → JSON** → download the file. It contains
     `client_email` and `private_key`.
3. **Share the Sheet** with that `client_email` address (Share → add it as
   **Editor**).
4. **Set env vars** (locally in `06-build/.env.local`, and in Vercel → Settings →
   Environment Variables → Production):
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=nymcard-contact-form@<project>.iam.gserviceaccount.com
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   CONTACT_SHEET_ID=<the id from the Sheet URL: /spreadsheets/d/THIS_PART/edit>
   # optional, defaults to A:K on the first tab:
   # CONTACT_SHEET_RANGE=Leads!A:K
   ```
   Keep the private key on one line with literal `\n` (the app converts them).
   In Vercel, paste the multi-line key as-is into the value field.
5. Restart `npm run dev` / redeploy. Submissions now append to the Sheet.

---

## Option B — Apps Script web app (simpler, only if your admin allows it)

Needs the Workspace to permit deploying a web app with **"Anyone"** access. The
Sheet still stays private — only the (unguessable) webhook endpoint is callable.

Use `scripts/contact-google-sheet.gs` (steps are inside that file), then set:
```
CONTACT_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
```

---

## Behaviour

- **Priority:** if the service-account vars are set, they're used; otherwise the
  webhook; otherwise the entry is **logged server-side only** (the form still
  works and shows success, nothing is lost).
- A honeypot field silently drops bot submissions.
- Columns are written in the order listed above — keep the Sheet header in sync.
- **Later: a real CRM** is a one-line swap in `app/api/contact/route.ts`.
