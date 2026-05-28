import { withKeys } from "../_seed-utils";

export const lendingDoc = {
  _id: "productPage-lending",
  _type: "productPage",
  title: "Lending",
  slug: { _type: "slug", current: "lending" },
  metaTitle:
    "Lending — Credit Infrastructure for BNPL, Installment, and Revolving Credit | NymCard",
  metaDescription:
    "Launch BNPL, installment, revolving credit, and working capital programs on nCore. Configure underwriting, disbursement, and collections through one platform. NymCard provides the credit infrastructure; you retain the lending relationship.",
  hero: {
    headline: "Embed credit into every payment flow.",
    body: "Launch BNPL, installment, revolving credit, and working capital programs on nCore. You retain the lending relationship; NymCard provides the infrastructure.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
    visualLabel: "credit program",
  },
  whyTiles: {
    eyebrow: "Why embed credit",
    headline: "Embed credit where your customers already transact.",
    body: "Four ways embedded credit changes your payment flows.",
    layout: "cols-2",
    cardMode: "no-UI",
    items: withKeys(
      [
        { eyebrow: "Revenue", heading: "New revenue lines", description: "Earn interest, interchange, and fee income from credit programs added to your existing customer base." },
        { eyebrow: "Conversion", heading: "Higher conversion", description: "Offer BNPL and installment options at checkout to lift basket size and close more sales." },
        { eyebrow: "Retention", heading: "Stronger retention", description: "Keep customers transacting on your products with card-linked credit and revolving lines." },
        { eyebrow: "Speed", heading: "Faster time to market", description: "Launch credit programs on infrastructure already built for scale." },
      ],
      "why",
    ),
  },
  capabilities: {
    eyebrow: "Credit journey",
    headline: "Configure every stage of credit.",
    body: "Origination, decisioning, disbursement, collections, and repayment on one platform.",
    layout: "bento",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Card-linked credit", heading: "Card-linked credit", description: "Embed revolving credit directly into your card program. One platform for cards, credit, and repayments.", span: 3, tall: true, uiLabel: "Revolving line meter" },
        { eyebrow: "Origination", heading: "Origination", description: "KYC, KYB, and digital onboarding through the API.", span: 3, uiLabel: "Onboarding steps" },
        { eyebrow: "Decisioning", heading: "Decisioning", description: "Connect bureaus, open banking data, or your own scoring model.", span: 3, uiLabel: "Decision rules" },
        { eyebrow: "Disbursement", heading: "Disbursement", description: "Disburse to cards, accounts, or wallets in the same session.", span: 3, uiLabel: "Disbursement targets" },
        { eyebrow: "Collections", heading: "Collections", description: "Automate billing cycles, repayment, and early delinquency intervention.", span: 3, uiLabel: "Billing cycle" },
        { eyebrow: "Repayment", heading: "Repayment structures", description: "Run conventional interest, flat fee, or reducing balance structures — with the schedule and pricing logic that fits each program.", span: 6, uiLabel: "Repayment schedule" },
      ],
      "cap",
    ),
  },
  configuration: {
    eyebrow: "Decisioning",
    headline: "Configure underwriting rules through the API.",
    body: "Connect to credit bureaus, open banking data, or your own scoring model. Adjust limits, pricing, and approval logic by segment and product.",
    docsLink: { label: "Read the underwriting docs", href: "/docs/underwriting" },
    tabs: withKeys(
      [
        { label: "JSON", language: "json", code: `{\n  "segment": "consumer",\n  "credit_structure": "revolving",\n  "scoring_model": "partner_internal_v2",\n  "data_sources": ["bureau", "open_banking", "transaction_history"],\n  "credit_limit_range": [500, 25000],\n  "approval_threshold": 720,\n  "pricing_tier": "risk_based"\n}` },
        { label: "cURL", language: "http", code: `curl https://api.nymcard.com/v1/underwriting/rules \\\n  -H "Authorization: Bearer $NYMCARD_KEY" \\\n  -d segment=consumer \\\n  -d approval_threshold=720` },
        { label: "Node", language: "ts", code: `const rules = await nymcard.underwriting.rules.create({\n  segment: "consumer",\n  credit_structure: "revolving",\n  approval_threshold: 720,\n});` },
      ],
      "tab",
    ),
    companion: {
      heading: "Decisioning you can defend",
      body: "Bureau, open banking, and transaction-history signals combine with your own scoring model — every decision is logged with the rules and inputs that produced it.",
      link: { label: "Read the underwriting docs", href: "/docs/underwriting" },
    },
  },
  industries: {
    eyebrow: "Industries",
    headline: "Credit programs for every industry.",
    items: withKeys(
      [
        { eyebrow: "Consumer banking", copy: "Revolving credit, installment plans, and credit cards on one platform.", link: { label: "See consumer banking", href: "/industries/consumer-banking" } },
        { eyebrow: "Commercial banking", copy: "Working capital, invoice financing, and SME credit lines that scale.", link: { label: "See commercial banking", href: "/industries/commercial-banking" } },
        { eyebrow: "Fintechs", copy: "Launch BNPL, installment, and digital-first credit products.", link: { label: "See fintechs", href: "/industries/fintechs" } },
        { eyebrow: "Retail & marketplaces", copy: "BNPL and installment options at checkout to lift basket size.", link: { label: "See retail", href: "/industries/retail" } },
        { eyebrow: "Telecoms", copy: "Device financing and consumer installment plans inside your customer relationship.", link: { label: "See telecoms", href: "/industries/telecoms" } },
        { eyebrow: "Healthcare", copy: "Patient financing embedded at the point of care.", link: { label: "See healthcare", href: "/industries/healthcare" } },
        { eyebrow: "Automotive", copy: "Dealer-linked auto financing and lease structures.", link: { label: "See automotive", href: "/industries/automotive" } },
      ],
      "ind",
    ),
  },
  deployment: {
    eyebrow: "Deployment",
    headline: "Deploy in the cloud, on-soil, or on-premise.",
    body: "Three deployment models on the same platform — pick the one that fits your regulatory and architectural requirements.",
    items: withKeys(
      [
        { eyebrow: "Cloud", heading: "Cloud", description: "Multi-region, NymCard-hosted, fully managed." },
        { eyebrow: "On-soil", heading: "On-soil", description: "Hosted by NymCard inside your country, meeting in-country data residency." },
        { eyebrow: "On-premise", heading: "On-premise", description: "Run inside your own data center, fully self-hosted." },
      ],
      "dep",
    ),
  },
  migration: {
    eyebrow: "Migration",
    headline: "Migrate from legacy infrastructure with agentic AI.",
    body: "Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team. Existing lending portfolios, books, and credit programs all supported.",
    fromSystem: "Legacy LMS",
    toSystem: "NymCard nCore",
    throughput: "540K loans/hr",
    eta: "~1h 12min remaining",
    drift: "drift $0.00",
    statusLine: "Full portfolio, re-carding, and phased migrations supported.",
    agents: withKeys(
      [
        { id: "mapping-agent", role: "Schema reasoning", glyph: "mapping" },
        { id: "borrower-agent", role: "Borrower migration", glyph: "person" },
        { id: "schedule-agent", role: "Repayment schedule rebuild", glyph: "calendar" },
        { id: "decisioning-agent", role: "Bureau · scoring · rules", glyph: "sliders" },
        { id: "validation-agent", role: "Parallel-run mirror", glyph: "mirror" },
      ],
      "agt",
    ),
    activity: withKeys(
      [
        { agent: "mapping-agent", kind: "decision", message: "inferred legacy `apr_bps` as basis points · converting to decimal APR (1,540 sample loans, 100% match)" },
        { agent: "borrower-agent", kind: "info", message: "migrated batch 18,400–18,500 · 1,000 borrowers with linked credit history" },
        { agent: "schedule-agent", kind: "decision", message: "rebuilt 4,827 amortisation schedules · reconciled to legacy outstanding balance, drift $0.00" },
        { agent: "decisioning-agent", kind: "info", message: "re-pulled 12,400 bureau scores · refreshed against current bureau snapshot" },
        { agent: "schedule-agent", kind: "anomaly", message: "47 loans show interest-only periods absent from legacy product code · resolving via schedule inference" },
        { agent: "validation-agent", kind: "success", message: "validated 8,200 next-billing-cycle EMIs against legacy · 100% match within rounding" },
        { agent: "mapping-agent", kind: "success", message: "mapped 23 legacy loan product types to 7 nCore credit program variants" },
        { agent: "decisioning-agent", kind: "decision", message: "translated 84 legacy underwriting rules to nCore declarative policy · 100% behavioural parity" },
        { agent: "borrower-agent", kind: "anomaly", message: "12 borrowers with active hardship deferrals · preserving repayment-holiday state through cutover" },
        { agent: "schedule-agent", kind: "info", message: "rebuilt delinquency buckets · 247 accounts repositioned, none escalated" },
        { agent: "validation-agent", kind: "decision", message: "mirror test: 1,840 new applications scored on both engines · score variance ±0.4 points" },
        { agent: "decisioning-agent", kind: "success", message: "verified open-banking consent records · 96,400 active consents carried forward" },
        { agent: "borrower-agent", kind: "info", message: "supplementary borrowers and co-applicants resolved into nCore relationship graph" },
        { agent: "mapping-agent", kind: "info", message: "verified PCI scope for 1.54M loan records · no PII outside boundary" },
        { agent: "validation-agent", kind: "info", message: "parallel run window opened · 5% of new applications routed to both engines" },
      ],
      "act",
    ),
    counters: withKeys(
      [
        { label: "Loans migrated", value: 1540000 },
        { label: "Schedules rebuilt", value: 1540000 },
        { label: "Underwriting rules", value: 84 },
        { label: "Anomalies resolved", value: 188 },
      ],
      "ctr",
    ),
    tracks: withKeys(
      [
        { label: "Schema mapping", pct: 100 },
        { label: "Borrower migration", pct: 82 },
        { label: "Schedule rebuild", pct: 76 },
        { label: "Underwriting translation", pct: 88 },
        { label: "Parallel-run validation", pct: 38 },
      ],
      "trk",
    ),
  },
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What is lending infrastructure?", answer: "Lending infrastructure enables banks, fintechs, and digital businesses to launch and operate credit programs — including BNPL, installment plans, revolving credit, and working capital — directly inside their payment flows. NymCard's Lending product runs on nCore." },
        { question: "Does NymCard fund loans?", answer: "No. NymCard provides credit infrastructure only — the technology layer for origination, decisioning, disbursement, and collections. The financial institution retains the lending relationship, the funding model, and the regulatory responsibility." },
        { question: "What credit structures does NymCard support?", answer: "Revolving credit, charge cards, installment plans, BNPL, working capital loans, and invoice financing across consumer and commercial segments. Conventional interest, flat fee, and reducing balance structures are all supported on the same platform." },
        { question: "How does decisioning work?", answer: "NymCard's decisioning layer supports connections to credit bureaus, open banking data sources, and partner-owned scoring models. Underwriting rules, credit limits, and approval thresholds are configured through the API and applied in real time." },
        { question: "Can NymCard integrate with my existing card program?", answer: "Yes. Embedded Lending runs on the same nCore platform as Card Issuing, with one customer record across both products. Card-linked credit, revolving credit limits, and installment plans on existing cards are all natively supported." },
        { question: "What deployment models are available?", answer: "Cloud, on-soil, and on-premise are all native deployment models on the NymCard platform. The deployment model is chosen based on your regulatory requirements and architecture preferences." },
        { question: "Is NymCard regulated?", answer: "NymCard operates as a regulated infrastructure provider. nCore is PCI DSS certified and ISO 27001 certified. NymCard does not hold a lending license — the partner institution holds the lending relationship and the regulatory responsibility." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to our team.",
    body: "Launch BNPL, installment, revolving credit, and working capital programs on infrastructure built to scale.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "Read the docs", href: "/docs" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Cards", body: "Issue debit, credit, and prepaid cards on the same nCore platform behind your credit programs.", link: { label: "See Cards", href: "/products/card-issuing" }, iconName: "CreditCard" },
      { leadIn: "Money Movement", body: "Disburse loans and move repayments across domestic rails, cross-border, and FX — on one platform.", link: { label: "See Money Movement", href: "/products/money-movement" }, iconName: "ArrowLeftRight" },
    ],
    "cs",
  ),
};
