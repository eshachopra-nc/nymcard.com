import { withKeys } from "../_seed-utils";

export const cardIssuingDoc = {
  _id: "productPage-card-issuing",
  _type: "productPage",
  title: "Card Issuing",
  slug: { _type: "slug", current: "card-issuing" },
  metaTitle:
    "Card Issuing, Debit, Credit, Prepaid on One Platform | NymCard",
  metaDescription:
    "Launch debit, credit, and prepaid card programs on nCore, NymCard's full-stack payments platform. Principal member of Visa and Mastercard. Cloud, on-soil, or on-premise.",
  trustLine:
    "Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001.",
  hero: {
    headline: "Launch the card program your customers need.",
    body: "Issue debit, credit, and prepaid cards on infrastructure built to scale with you.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    visualLabel: "card program",
  },
  capabilities: {
    eyebrow: "Card programs",
    headline: "Issue debit, credit, and prepaid cards.",
    body: "One platform, one set of APIs, every card type your customers need — issued as physical, virtual, or tokenized.",
    layout: "bento",
    cardMode: "with-UI",
    items: withKeys(
      [
        { eyebrow: "Debit", heading: "Debit", description: "Cards linked to live accounts with real-time authorization across consumer and commercial programs.", span: 3, uiLabel: "Transaction feed" },
        { eyebrow: "Prepaid", heading: "Prepaid", description: "Reloadable, gift, and disbursement cards with per-card spend tracking.", span: 3, uiLabel: "Top-up + ledger" },
        { eyebrow: "Credit", heading: "Credit and installments", description: "Run revolving credit, BNPL, and installment plans — configure limits, billing cycles, grace periods, and repayment through the API.", span: 6, tall: true, uiLabel: "Credit + EMI" },
      ],
      "cap",
    ),
  },
  featureShowcase: {
    eyebrow: "Card controls",
    headline: "Control every card and every transaction.",
    body: "Freeze cards, set limits, and block categories in real time — for any cardholder, on any program.",
    uiLabel: "card controls dashboard",
  },
  configuration: {
    eyebrow: "Configuration",
    headline: "Configure every program through the API.",
    body: "Credit limits, billing cycles, repayment, and installments — set per program, applied in real time.",
    docsLink: { label: "Read the docs", href: "https://docs.nymcard.com/" },
    tabs: withKeys(
      [
        { label: "JSON", language: "json", code: `{\n  "program_type": "credit",\n  "credit_limit_amount": 10000,\n  "currency": "USD",\n  "billing_cycle_day": 1,\n  "grace_period_days": 21,\n  "minimum_payment_pct": 5,\n  "installments_enabled": true,\n  "status": "active"\n}` },
        { label: "cURL", language: "http", code: `curl https://api.nymcard.com/v1/programs \\\n  -H "Authorization: Bearer $NYMCARD_KEY" \\\n  -d program_type=credit` },
        { label: "Node", language: "ts", code: `const program = await nymcard.programs.create({\n  program_type: "credit",\n  credit_limit_amount: 10000,\n  currency: "USD",\n});` },
      ],
      "tab",
    ),
    companion: {
      heading: "Comprehensive configuration",
      body: "Limits, billing, installments, delinquency, and reporting — all configurable per program and per cardholder, on the same API surface.",
      link: { label: "Read the configuration docs", href: "https://docs.nymcard.com/" },
    },
  },
  industries: {
    eyebrow: "Industries",
    headline: "Card programs for every industry.",
    items: withKeys(
      [
        { eyebrow: "Banks", copy: "Retail and commercial card portfolios on one platform.", link: { label: "See banks", href: "/industries/retail-banking" } },
        { eyebrow: "Fintechs", copy: "Launch debit, credit, prepaid, and BNPL programs.", link: { label: "See fintechs", href: "/industries/fintechs" } },
        { eyebrow: "Telecoms", copy: "Wallet-linked debit, prepaid, and rewards cards.", link: { label: "See telecoms", href: "/industries/telecommunications" } },
        { eyebrow: "Retail and marketplaces", copy: "Co-branded, gift, and payout cards for customers and sellers.", link: { label: "See retail", href: "/industries/retail-marketplaces" } },
        { eyebrow: "Government", copy: "Prepaid and disbursement cards with auditable spend.", link: { label: "See government", href: "/industries/government" } },
        { eyebrow: "Mobility & fleet", copy: "Fuel and expense cards with category-level controls.", link: { label: "See mobility", href: "/industries/mobility" } },
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
    body: "Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team.",
    fromSystem: "Legacy processor",
    toSystem: "NymCard nCore",
    throughput: "540K cards/hr",
    eta: "~37min remaining",
    drift: "drift <0.01%",
    statusLine: "Full portfolio, re-carding, and phased migrations supported.",
    agents: withKeys(
      [
        { id: "mapping-agent", role: "Schema reasoning", glyph: "mapping" },
        { id: "migration-agent", role: "Bulk record movement", glyph: "flow" },
        { id: "token-agent", role: "Tokenization rebuild", glyph: "key" },
        { id: "compliance-agent", role: "AML · sanctions · PEP", glyph: "shield" },
        { id: "validation-agent", role: "Parallel-run mirror", glyph: "mirror" },
      ],
      "agt",
    ),
    activity: withKeys(
      [
        { agent: "mapping-agent", kind: "decision", message: "inferred cents → dollars conversion for legacy `crd_lmt_dec2` (47 sample values, 100% confidence)" },
        { agent: "migration-agent", kind: "info", message: "processed batch 4,281–4,290 · 12,000 cards, no anomalies" },
        { agent: "token-agent", kind: "info", message: "reissued 12,400 Apple Pay tokens via NymCard TSP for BIN 414720–414729" },
        { agent: "compliance-agent", kind: "anomaly", message: "3 supplementary cards linked to PEP-flagged primary · escalated for human review" },
        { agent: "validation-agent", kind: "success", message: "ran 5,840 synthetic auth tests against legacy mirror · drift <0.01%, within tolerance" },
        { agent: "mapping-agent", kind: "decision", message: "translated 127 legacy IF-THEN auth rules to nCore declarative format" },
        { agent: "migration-agent", kind: "decision", message: "detected absent legacy field `wealth_segment` · enriching via portfolio inference" },
        { agent: "token-agent", kind: "info", message: "rotated HSM keys for 247,000 tokenised merchant records" },
        { agent: "compliance-agent", kind: "info", message: "re-screened 1,847 sanctions matches against current OFAC list · all clear" },
        { agent: "validation-agent", kind: "decision", message: "mirror test passed for 1,247 in-flight disputed authorizations · zero divergence" },
        { agent: "mapping-agent", kind: "success", message: "mapped 47 legacy card product variants to 9 nCore program types · all reconciled" },
        { agent: "migration-agent", kind: "anomaly", message: "247 corporate cards have non-standard limit inheritance · resolving via spend-pattern inference" },
        { agent: "token-agent", kind: "success", message: "completed Google Pay token re-issuance · 184,000 tokens active on nCore" },
        { agent: "compliance-agent", kind: "decision", message: "verified PCI scope across 1.2M records · no PAN leakage outside HSM boundary" },
        { agent: "validation-agent", kind: "info", message: "parallel run window opened · 5% of live auth traffic mirrored to nCore" },
      ],
      "act",
    ),
    counters: withKeys(
      [
        { label: "Cards migrated", value: 1200000 },
        { label: "Tokens reissued", value: 892140 },
        { label: "Auth rules translated", value: 127 },
        { label: "Anomalies resolved", value: 312 },
      ],
      "ctr",
    ),
    tracks: withKeys(
      [
        { label: "Schema mapping", pct: 100 },
        { label: "Card records", pct: 78 },
        { label: "Tokenization rebuild", pct: 64 },
        { label: "Compliance re-validation", pct: 91 },
        { label: "Parallel-run validation", pct: 42 },
      ],
      "trk",
    ),
  },
  faq: {
    headline: "Common questions.",
    items: withKeys(
      [
        { question: "What card types can I issue on NymCard?", answer: "Debit, credit, and prepaid cards — physical, virtual, and tokenized — on the same platform." },
        { question: "Does NymCard own its processor, or use a third party?", answer: "NymCard owns nCore, its own processing platform, and is a principal member of Visa and Mastercard. No third-party processor sits between your application and the schemes." },
        { question: "Can I deploy NymCard on-premise?", answer: "Yes. NymCard supports cloud, on-soil, and on-premise deployment. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center." },
        { question: "How long does a card program take to launch?", answer: "Typically less than three months, subject to program complexity and market requirements. Larger or more configured programs can take longer." },
        { question: "Can I migrate from my existing card processor?", answer: "Yes. NymCard offers agentic AI-led migration that handles discovery, mapping, configuration, parallel running, and cutover. Full portfolio, re-carding, and phased migrations are supported." },
        { question: "Do I have to use NymCard for card fulfillment and customer support?", answer: "No. You can use NymCard's services or bring your own vendors for fulfillment, rewards, cashback, and customer support." },
        { question: "What certifications does NymCard hold?", answer: "nCore is PCI DSS Level 1 certified and ISO 27001 certified." },
        { question: "Is credit card issuing supported, or only debit and prepaid?", answer: "Credit is fully supported. Configure credit limits, billing cycles, grace periods, and installment plans through the API." },
      ],
      "faq",
    ),
  },
  finalCta: {
    headline: "Talk to us.",
    body: "Launch debit, credit, or prepaid card programs on infrastructure built to scale.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
  },
  crossSell: withKeys(
    [
      { leadIn: "Money Movement", body: "Move funds across domestic rails, cross-border, and FX, on the same nCore platform behind your cards.", link: { label: "See Money Movement", href: "/products/money-movement" }, iconName: "ArrowLeftRight" },
      { leadIn: "Financial Crime", body: "KYC, AML, 3D Secure, and fraud monitoring run inside the authorization path.", link: { label: "See Financial Crime", href: "/products/financial-crime" }, iconName: "ShieldAlert" },
    ],
    "cs",
  ),
};
