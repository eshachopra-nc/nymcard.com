// ─────────────────────────────────────────────────────────────────────────
//  DEV-ONLY preview route — /visual-system
//
//  A QA surface for the NymCard visual engine (components/visuals/*). It is
//  NOT a marketing page: not linked from the nav, not in any sitemap, and
//  marked noindex below. Delete this folder (app/visual-system/) once the
//  site is ready to launch.
//
//  Presented as a navigable system — a fixed sidebar orders it the way the
//  codebase is layered: Foundations (the tokens / rhythm / motion rules) →
//  Atmosphere & visuals (components/visuals/) → UI primitives
//  (components/ui/) → Card surfaces (the cards that go INSIDE a section
//  primitive) → Section primitives (components/composition/, §8.12–§8.22 —
//  the catalogue every product / industry page composes from) → Artifacts
//  (components/artifacts/, illustrative static props). Page-bound section
//  instances (components/sections/) are deliberately out of scope here.
//  Dark frames force `.dark` locally.
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Layers, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { RibbonKinetic } from "@/components/hero/RibbonKinetic";
import { RibbonKineticWithViolet } from "@/components/hero/RibbonKineticWithViolet";
import {
  BlueprintOverlay,
  CrosshairRails,
  GlassPanel,
  InfraGrid,
  InfraIcon,
  iconLabels,
  iconNames,
  KineticRibbon,
  ProductHeroRibbon,
  RibbonField,
  RibbonStreak,
  ScanSweep,
  SectionReveal,
  TopologyTraces,
  visual,
} from "@/components/visuals";
import {
  CardGrid,
  type CardGridItem,
  CodeArtifact,
  type CodeArtifactTab,
  CrossSellBanner,
  type CrossSellItem,
  CTASection,
  DeveloperBlock,
  FAQ,
  type FAQItem,
  FeatureShowcase,
  FloatingOperationalPanel,
  OutcomeChips,
  type OutcomeChip,
  PageHero,
  PlatformChecklist,
  PrincipalMemberTrustLine,
  ProductCard,
  RailCarousel,
  type RailCarouselRichItem,
  type RailCarouselSparseItem,
  SplitEditorial,
  TextImageRow,
  TrustBar,
  UIContainer,
  UIPlaceholder,
} from "@/components/composition";
import { CardTreatment, CARD_TREATMENTS } from "@/components/visuals";
import {
  NCoreStack,
  PaymentCard,
} from "@/components/artifacts";
import { SignatureStitchToCore } from "@/components/sections/SignatureStitchToCore";
import { FragmentationWeb } from "@/components/sections/FragmentationWeb";
import { HandoffVisual } from "@/components/sections/product-uis";
import {
  CardsUI,
  LendingUI,
  MoneyMovementUI,
  SettlementUI,
  FinancialCrimeUI,
  ReconciliationUI,
} from "@/components/sections/product-uis";
import {
  CardLinkedCreditUI,
  OriginationUI,
  DecisioningUI,
  DisbursementUI,
  CollectionsUI,
  RepaymentStructuresUI,
  DecisioningVisualization,
} from "@/components/sections/product-uis";
import { Button } from "@/components/ui/button";
import {
  Checkbox,
  Field,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@/components/ui/field";
import { Badge, StatusPill } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/sections/ThemeToggle";

export const metadata: Metadata = {
  title: "Visual System — dev",
  robots: { index: false, follow: false },
};

// ── Composition helpers ────────────────────────────────────────────────────

// Centres normal content; the page itself is full-width so DividerRibbon can
// run edge to edge.
function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
      {children}
    </div>
  );
}

function Group({
  index,
  label,
  lede,
}: {
  index: string;
  label: string;
  lede: string;
}) {
  // The anchor a sidebar link scrolls to — derived from `index`.
  const id = index.toLowerCase().replace(/\s+/g, "-");
  return (
    <Container>
      <div id={id} className="mt-28 scroll-mt-12">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-primary dark:text-accent-cyan">
          {index}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
          {label}
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {lede}
        </p>
      </div>
    </Container>
  );
}

// A primitive heading — used on its own (full-width demos follow) or above a
// grid of stages.
function Heading({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mt-12">
      <h3 className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {title}
      </h3>
      <p className="mt-1 max-w-2xl font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {desc}
      </p>
    </div>
  );
}

function Primitive({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <Container>
      <Heading title={title} desc={desc} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </Container>
  );
}

type StageSize = "lg" | "md" | "sm";
const STAGE_H: Record<StageSize, string> = {
  lg: "h-80",
  md: "h-64",
  sm: "h-52",
};

function Stage({
  label,
  dark = false,
  size = "sm",
  className,
  children,
}: {
  label: string;
  dark?: boolean;
  size?: StageSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1",
        STAGE_H[size],
        dark
          ? "dark bg-surface-dark-base ring-white/[0.07]"
          : "bg-surface-soft ring-brand-navy/[0.06]",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "absolute left-4 top-4 z-20 font-mono text-[10px] uppercase tracking-wider",
          dark ? "text-white/55" : "text-text-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center p-6">
      {children}
    </div>
  );
}

function SampleCardBody({ title }: { title: string }) {
  return (
    <div className="p-5">
      <div className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
        {title}
      </div>
      <div className="mt-1.5 font-body text-xs leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        A lit operational panel — an ambient sheen at rest, a cursor spotlight
        on hover, over the §8.6 hover sequence.
      </div>
    </div>
  );
}

// A full-width composition-primitive demo — a heading, then the primitive(s)
// at real section width. Dark variants are wrapped in `.dark`.
function CompositionDemo({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <Container>
      <Heading title={title} desc={desc} />
      <div className="mt-5 space-y-5">{children}</div>
    </Container>
  );
}

// A frame for a full-bleed page-section template — the §8.12–8.16 templates
// are real sections with their own padding and max-width, so here they are
// just clipped and rounded. `dark` forces the `.dark` class locally.
function SectionFrame({
  dark = false,
  children,
}: {
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl ring-1",
        dark ? "dark ring-white/[0.07]" : "ring-brand-navy/[0.06]",
      )}
    >
      {children}
    </div>
  );
}

// A faint content slab — the abstract building block for the rhythm diagrams.
// It stands in for a content region so the SPACING between regions reads,
// not the content itself.
function Slab({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-brand-navy/[0.07] dark:bg-white/[0.08]",
        className,
      )}
    />
  );
}

// An atmospheric icon tile + its label — the cell for the icon-system grid.
function IconCell({
  name,
  size = "md",
}: {
  name: (typeof iconNames)[number];
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <InfraIcon name={name} size={size} />
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
        {iconLabels[name]}
      </span>
    </div>
  );
}

// The form-field set — rendered on light and dark in the Forms demo. `group`
// scopes the radio name so the two instances don't share selection.
function FormFields({ group }: { group: string }) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Work email" hint="Used for programme notifications.">
          <Input type="email" placeholder="you@company.com" />
        </Field>
        <Field label="Region">
          <Select defaultValue="">
            <option value="" disabled>
              Select a region
            </option>
            <option>Europe</option>
            <option>MENA</option>
            <option>Asia-Pacific</option>
          </Select>
        </Field>
        <Field label="Notes" hint="Optional." className="sm:col-span-2">
          <Textarea placeholder="Tell us about the programme…" />
        </Field>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Checkbox label="Virtual cards" defaultChecked />
        <Checkbox label="Physical cards" />
        <Radio name={group} label="Single rail" defaultChecked />
        <Radio name={group} label="Multi rail" />
        <Switch label="Sandbox mode" defaultChecked />
      </div>
    </>
  );
}

// Badges, status pills and a keyboard-focus reference — light and dark.
function BadgeRow() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Issuing</Badge>
        <Badge tone="primary">Platform</Badge>
        <Badge tone="cyan">New</Badge>
        <Badge tone="purple">Beta</Badge>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <StatusPill status="success">Live</StatusPill>
        <StatusPill status="info">Processing</StatusPill>
        <StatusPill status="warning">Degraded</StatusPill>
        <StatusPill status="danger">Outage</StatusPill>
        <StatusPill status="neutral">Idle</StatusPill>
      </div>
      <div className="mt-7 border-t border-surface-border-subtle pt-6 dark:border-surface-dark-border">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
          Keyboard focus
        </span>
        <p className="mt-1.5 max-w-lg font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          Every interactive element carries the §6 brand focus ring. Tab to the
          button and field below to see it.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="md">
            Focusable button
          </Button>
          <div className="w-60">
            <Input placeholder="Focusable input" />
          </div>
        </div>
      </div>
    </>
  );
}

// Sample product set for the symmetric CardGrid demos — six equal-weight
// products with eyebrow / heading / description. Used across every symmetric
// layout × card-type × surface combination below.
const PRODUCT_ITEMS: CardGridItem[] = [
  {
    eyebrow: "Issuing",
    heading: "Card issuing",
    description:
      "Virtual and physical card programmes on programmable rails — multi-currency and region-aware.",
  },
  {
    eyebrow: "Lending",
    heading: "Embedded lending",
    description:
      "Originate and service credit natively inside the customer journey.",
  },
  {
    eyebrow: "Movement",
    heading: "Money movement",
    description:
      "Payouts, transfers and collections across one observable settlement layer.",
  },
  {
    eyebrow: "Identity",
    heading: "Identity & KYC",
    description:
      "Onboarding and verification composed directly into the product flow.",
  },
  {
    eyebrow: "Risk",
    heading: "Fraud & risk",
    description: "Real-time transaction scoring and programmable controls.",
  },
  {
    eyebrow: "Core",
    heading: "nCore platform",
    description:
      "The single programmable core beneath every NymCard programme.",
  },
];

// Asymmetric bento cells — uneven six-column spans, tall / wide interplay. The
// `treatment` surface auto-cycles the CardTreatment library, so every cell
// reads differently (ribbon stroke, atmospheric preset, glass or spotlight).
const BENTO_CELLS: CardGridItem[] = [
  {
    span: 3,
    tall: true,
    eyebrow: "Card issuing",
    heading: "Issue cards on programmable infrastructure",
    description:
      "Virtual and physical card programmes — multi-currency, region-aware, launched as configuration rather than a rebuild.",
  },
  {
    span: 3,
    tall: true,
    eyebrow: "Money movement",
    heading: "One settlement layer across every rail",
    description:
      "Payouts, transfers and collections — observable and consistent across regions.",
  },
  {
    span: 2,
    eyebrow: "Platform",
    heading: "A calm, observable core",
  },
  {
    span: 2,
    eyebrow: "Embedded lending",
    heading: "Credit originated inside the product",
  },
  {
    span: 2,
    eyebrow: "nCore",
    heading: "The infrastructure topology",
  },
];

// Sample data for the §8.15 FAQ template — questions phrased as a user
// would ask them, all rows closed by default.
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How long does it take to launch a card programme?",
    answer:
      "Most programmes move from sandbox to a live pilot in weeks, not quarters — the issuing core is configured, not rebuilt, for each new programme.",
  },
  {
    question: "Which regions does NymCard support?",
    answer:
      "NymCard operates across Europe, the MENA region and Asia-Pacific, with region-aware settlement and compliance built into the platform.",
  },
  {
    question: "Can NymCard issue both virtual and physical cards?",
    answer:
      "Yes. Virtual and physical cards run on the same programmable core, so a single integration covers both form factors.",
  },
  {
    question: "How does NymCard handle settlement?",
    answer:
      "Settlement runs on a multi-currency layer with real-time observability — every payout, transfer and collection is traceable end to end.",
  },
];

// Sample data for the §8.17 CodeArtifact template — a JSON spend-controls
// config object on a 1-language tab strip. Representative placeholder content
// for the styleguide; real copy comes after the copywriter runs against this
// prop signature.
const CODE_ARTIFACT_TABS: CodeArtifactTab[] = [
  {
    label: "JSON",
    language: "json",
    code: `{
  "card_id": "card_4f3c2b1a",
  "limits": {
    "daily": 5000,
    "monthly": 50000,
    "currency": "AED"
  },
  "merchant_controls": {
    "categories": {
      "allowed": ["travel", "fuel", "office_supplies"],
      "blocked": ["gambling", "crypto"]
    },
    "countries": ["AE", "SA", "EG"]
  },
  "schedule": {
    "weekdays_only": true,
    "active_hours": "08:00-20:00"
  },
  "auto_reconcile": true
}`,
  },
];

// Sample data for the §8.18 RailCarousel (variant="sparse") — five industries
// for the page-arc Section 7 shape.
const SAMPLE_INDUSTRIES: RailCarouselSparseItem[] = [
  {
    id: "banks",
    eyebrow: "Banks",
    copy: "Modernise card programmes on programmable infrastructure.",
    link: { label: "Explore banks", href: "#" },
  },
  {
    id: "fintechs",
    eyebrow: "Fintechs",
    copy: "Launch and scale a card product without rebuilding the core.",
    link: { label: "Explore fintechs", href: "#" },
  },
  {
    id: "wallets",
    eyebrow: "Mobile wallets",
    copy: "Issue, transact and reconcile across one programmable ledger.",
    link: { label: "Explore wallets", href: "#" },
  },
  {
    id: "telcos",
    eyebrow: "Telcos",
    copy: "Add payments and credit on top of the customer base you already serve.",
    link: { label: "Explore telcos", href: "#" },
  },
  {
    id: "platforms",
    eyebrow: "Platforms",
    copy: "Embed cards, payouts and accounts inside the product your customers use.",
    link: { label: "Explore platforms", href: "#" },
  },
];

// Sample data for the §8.18 RailCarousel (variant="rich") — three sample use
// cases for the styleguide. The homepage rail uses lib/homepage-use-cases.ts
// against the same shape.
const SAMPLE_USE_CASES: RailCarouselRichItem[] = [
  {
    id: "sample-commercial",
    name: "Run a commercial card program",
    description:
      "Issue SME and corporate cards on programmable infrastructure, region-aware and reconciled in real time.",
    bullets: [
      "Multi-entity cards and accounts",
      "Limits by category, amount and time",
      "Reconciliation across cards and rails",
    ],
    uiLabel: "commercial console",
    href: "#",
  },
  {
    id: "sample-embedded",
    name: "Embed financial products",
    description:
      "Add cards, payments and credit to the platform your customers already use.",
    bullets: [
      "Cards and payouts via API and SDK",
      "White-labeled — your brand and UX",
      "One contract across the stack",
    ],
    uiLabel: "API console",
    href: "#",
  },
  {
    id: "sample-disbursements",
    name: "Disburse at scale",
    description:
      "Move funds to suppliers, gig workers and claimants across rails on one programmable layer.",
    bullets: [
      "One API across cards and wallets",
      "Routing, retries and reconciliation",
      "Sanctions and AML on every payout",
    ],
    uiLabel: "payouts console",
    href: "#",
  },
];

// Sample data for the §8.16 CrossSellBanner template — the lead-in runs
// in-line into the body sentence.
const CROSS_SELL_ITEMS: [CrossSellItem, CrossSellItem] = [
  {
    leadIn: "Embedded Lending.",
    body: "Credit decisioning, origination and servicing composed natively into your product journey.",
    link: { label: "Explore Embedded Lending", href: "#" },
  },
  {
    leadIn: "Stablecoin Settlement.",
    body: "Move value across borders on a programmable settlement layer, observable end to end.",
    link: { label: "Explore Stablecoin Settlement", href: "#" },
  },
];

// Sample data for the §8.19 OutcomeChips template — three buyer-side outcome
// statements (revenue, retention, speed). Generic enough for the styleguide;
// real copy is written per industry. Icons are JSX elements (server → client
// boundary requires pre-built ReactNodes, never component references).
const SAMPLE_OUTCOME_CHIPS: [OutcomeChip, OutcomeChip, OutcomeChip] = [
  {
    icon: <Zap strokeWidth={1.75} />,
    label: "Launch in weeks",
    body: "Move from sandbox to a live programme in weeks, not quarters — the core is configured, not rebuilt.",
  },
  {
    icon: <Layers strokeWidth={1.75} />,
    label: "One platform, every flow",
    body: "Issuing, payouts, lending and settlement run on one programmable core — never a stitched set of vendors.",
  },
  {
    icon: <ShieldCheck strokeWidth={1.75} />,
    label: "Compliance built in",
    body: "KYC, AML, audit trails and regulatory reporting embedded across every programme — not added after the fact.",
  },
];

// ── Design-token reference data ────────────────────────────────────────────
// The values shown in the Foundations section, mirrored from design-system.md
// §2 (type), §3 (colour) and §4 (spacing).
// Type-scale specimens. Sample strings are chosen to surface Geist's
// distinctive glyph shapes — slashed zero, geometric two-storey "a", the
// crisp terminals on g/k/y, and the wide mono characters in code. Pick
// characters that make the family obvious so the swap is unmistakable.
const TYPE_SCALE: {
  token: string;
  cls: string;
  sample: string;
  family: string;
}[] = [
  {
    token: "display-xl · 72 / 80 · Geist 700",
    cls: "font-display text-[4.5rem] font-bold leading-[1.1] tracking-[-0.02em]",
    sample: "0% downtime, 24/7 rails",
    family: "Display weight — hero only",
  },
  {
    token: "display-lg · 64 / 72 · Geist 700",
    cls: "font-display text-[4rem] font-bold leading-[1.125] tracking-[-0.02em]",
    sample: "Infrastructure agency",
    family: "Display weight — sub-page heroes",
  },
  {
    token: "h1 · 48 / 56 · Geist 700",
    cls: "font-display text-5xl font-bold tracking-[-0.015em]",
    sample: "Page headline — gateway 80",
    family: "Heading — page",
  },
  {
    token: "h2 · 36 / 44 · Geist 700",
    cls: "font-display text-4xl font-bold tracking-[-0.01em]",
    sample: "Section headline · 36px",
    family: "Heading — section",
  },
  {
    token: "h3 · 28 / 36 · Geist 500",
    cls: "font-display text-[1.75rem] font-medium tracking-[-0.01em]",
    sample: "Card title — agnostic & geometric",
    family: "Heading — card",
  },
  {
    token: "h4 · 22 / 30 · Geist 500",
    cls: "font-display text-[1.375rem] font-medium tracking-[-0.005em]",
    sample: "Card sub-title (22px)",
    family: "Heading — sub-card",
  },
  {
    token: "body-lg · 18 / 28 · Geist 400",
    cls: "font-body text-lg leading-[1.55]",
    sample:
      "Hero and large-section body. Geist's geometric letterforms keep long paragraphs precise without going cold — the lowercase a, g and y do most of the personality.",
    family: "Body — large",
  },
  {
    token: "body · 16 / 26 · Geist 400",
    cls: "font-body text-base leading-[1.625]",
    sample:
      "Default body and card description copy. Notice the slashed 0 in 1024, the open aperture on c and e, and the upright italic-free voice.",
    family: "Body — default",
  },
  {
    token: "body-sm · 14 / 22 · Geist 400",
    cls: "font-body text-sm leading-[1.57]",
    sample:
      "Captions, table cells and secondary info — 14px body kept at the same family for visual continuity.",
    family: "Body — small",
  },
  {
    token: "caption · 12 / 18 · Geist 400",
    cls: "font-body text-xs leading-[1.5]",
    sample: "Footnotes, micro-copy and legal — 12px.",
    family: "Caption",
  },
  {
    token: "code · 14 mono · Geist Mono 400",
    cls: "font-mono text-sm leading-[1.57]",
    sample: "const settled = await ledger.post({ amount: 1024, currency: \"AED\" });",
    family: "Mono — code",
  },
];

// The four signature anchors of the NymCard wash, in left-to-right order.
// navy → cyan → indigo → violet — the wash the brand recognises by. Hex
// values are mirrored from the design tokens (visual.* + tokens.color.*) so
// drift is impossible.
const SIGNATURE_WASH: {
  name: string;
  token: string;
  hex: string;
  cls: string;
  role: string;
}[] = [
  {
    name: "Navy",
    token: "brand.navy",
    hex: visual.navy,
    cls: "bg-brand-navy",
    role: "Infrastructure weight; depth / shadow end of the wash.",
  },
  {
    name: "Cyan",
    token: "visual.cyan",
    hex: visual.cyan,
    cls: "bg-accent-cyan",
    role: "Primary highlight and bright accent; scan / signal moments.",
  },
  {
    name: "Indigo",
    token: "visual.indigo",
    hex: visual.indigo,
    cls: "bg-accent-indigo",
    role: "Mid-wash anchor; gradient bridge between cyan and violet.",
  },
  {
    name: "Violet",
    token: "visual.violet",
    hex: visual.violet,
    cls: "bg-accent-violet",
    role: "Dark-end gradient anchor; chip / glow accent only — never a CTA.",
  },
];

const SWATCHES: { group: string; items: { name: string; cls: string }[] }[] = [
  {
    group: "Brand",
    items: [
      { name: "brand-primary", cls: "bg-brand-primary" },
      { name: "brand-purple", cls: "bg-brand-purple" },
      { name: "brand-navy", cls: "bg-brand-navy" },
    ],
  },
  {
    group: "Accent · cool only",
    items: [
      { name: "accent-cyan", cls: "bg-accent-cyan" },
      { name: "accent-teal", cls: "bg-accent-teal" },
      { name: "accent-indigo", cls: "bg-accent-indigo" },
      { name: "accent-violet", cls: "bg-accent-violet" },
    ],
  },
  {
    group: "Surface",
    items: [
      { name: "surface-white", cls: "bg-surface-white" },
      { name: "surface-soft", cls: "bg-surface-soft" },
      { name: "surface-dark-base", cls: "bg-surface-dark-base" },
      { name: "surface-dark-elevated", cls: "bg-surface-dark-elevated" },
    ],
  },
  {
    group: "Semantic · status only",
    items: [
      { name: "success", cls: "bg-semantic-success" },
      { name: "warning", cls: "bg-semantic-warning" },
      { name: "danger", cls: "bg-semantic-danger" },
      { name: "info", cls: "bg-semantic-info" },
    ],
  },
];

const SPACING: { token: string; w: string }[] = [
  { token: "space-1 · 4", w: "w-1" },
  { token: "space-2 · 8", w: "w-2" },
  { token: "space-3 · 12", w: "w-3" },
  { token: "space-4 · 16", w: "w-4" },
  { token: "space-5 · 20", w: "w-5" },
  { token: "space-6 · 24", w: "w-6" },
  { token: "space-7 · 32", w: "w-8" },
  { token: "space-8 · 40", w: "w-10" },
  { token: "space-9 · 48", w: "w-12" },
  { token: "space-10 · 64", w: "w-16" },
  { token: "space-11 · 96", w: "w-24" },
  { token: "space-12 · 120", w: "w-[120px]" },
  { token: "space-13 · 160", w: "w-40" },
];

// ── Sidebar navigation ─────────────────────────────────────────────────────
//
// A fixed left rail so the engine reads like the codebase it documents. The
// six categories track the layer model in components/:
//
//   Foundations           — the tokens / rhythm / motion rules every layer obeys
//   Atmosphere & visuals  — components/visuals/        (decorative primitives)
//   UI primitives         — components/ui/             (atomic shadcn-style)
//   Card surfaces         — composition/, the tiles INSIDE section primitives
//   Section primitives    — composition/, §8.12–§8.22  (the page catalogue)
//   Artifacts             — components/artifacts/      (illustrative props)

const NAV: { category: string; items: { label: string; id: string }[] }[] = [
  {
    category: "Foundations",
    items: [
      { label: "Design tokens", id: "tokens" },
      { label: "Typography — Geist swap", id: "typography" },
      { label: "Section rhythm & spacing", id: "rhythm" },
      { label: "Motion principles", id: "motion" },
      { label: "Hover vocabulary", id: "hover-vocabulary" },
    ],
  },
  {
    category: "Atmosphere & visuals",
    items: [
      { label: "The ribbon", id: "family" },
      { label: "Product-page ribbon — ProductHeroRibbon", id: "ribbon-streak" },
      { label: "Ribbon — violet anchor proposal", id: "ribbon-violet" },
      { label: "Crosshair-marker rails", id: "crosshair-rails" },
      { label: "Supporting systems", id: "supporting" },
      { label: "CardTreatment library", id: "card-treatments" },
    ],
  },
  {
    category: "UI primitives",
    items: [
      { label: "Button system", id: "buttons" },
      { label: "Form fields", id: "forms" },
      { label: "Badges & status", id: "badges" },
      { label: "Infrastructure icons", id: "icons" },
    ],
  },
  {
    category: "Card surfaces",
    items: [
      { label: "ProductCard", id: "productcard" },
      { label: "FloatingOperationalPanel", id: "floatingoperationalpanel" },
      { label: "UIContainer / UIPlaceholder", id: "uicontainer-and-uiplaceholder" },
      { label: "Homepage product UIs — coded surfaces on the glass kit (§8.8 v6)", id: "product-uis" },
    ],
  },
  {
    category: "Section primitives",
    items: [
      { label: "PageHero — §8.12", id: "section-pagehero" },
      { label: "FeatureShowcase — §8.13", id: "section-featureshowcase" },
      { label: "CTASection — §8.14", id: "section-ctasection" },
      { label: "FAQ — §8.15", id: "section-faq" },
      { label: "CrossSellBanner — §8.16", id: "section-crosssell" },
      { label: "CodeArtifact — §8.17", id: "section-codeartifact" },
      { label: "RailCarousel — §8.18", id: "section-railcarousel" },
      { label: "OutcomeChips — §8.19", id: "section-outcomechips" },
      { label: "TextImageRow — §8.20", id: "section-textimagerow" },
      { label: "PlatformChecklist — §8.21", id: "section-platformchecklist" },
      { label: "DeveloperBlock — §8.22", id: "section-developerblock" },
      { label: "TrustBar — §8.25", id: "section-trustbar" },
      { label: "CardGrid", id: "section-cardgrid" },
      { label: "SplitEditorial", id: "section-spliteditorial" },
    ],
  },
  {
    category: "Artifacts",
    items: [
      { label: "nCore stack", id: "ncore" },
      { label: "Signature moment", id: "signature" },
      { label: "Card surface systems", id: "surfaces" },
    ],
  },
];

function SideNav() {
  return (
    <nav
      aria-label="Visual system sections"
      className="fixed left-0 top-0 z-40 hidden h-screen w-60 overflow-y-auto border-r border-surface-border-subtle bg-surface-white/85 px-6 py-9 backdrop-blur xl:block"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-primary">
            Dev preview
          </span>
          <span className="mt-1 block font-display text-lg font-bold tracking-tight text-text-primary">
            Visual engine
          </span>
        </div>
        <ThemeToggle />
      </div>
      <div className="mt-9 space-y-7">
        {NAV.map((group, i) => (
          <div key={group.category}>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                {group.category}
              </span>
            </div>
            <ul className="mt-2.5 space-y-1.5 border-l border-surface-border-subtle pl-3.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block font-body text-[13px] leading-snug text-text-secondary transition-colors hover:text-brand-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function VisualSystemPage() {
  return (
    <div className="xl:pl-60">
      <SideNav />
      <main className="pb-32 pt-32">
        <Container>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-primary dark:text-accent-cyan">
            Dev preview
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
            Visual engine
          </h1>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            One living infrastructure atmosphere, organised the way the
            codebase is layered. Foundations set the rules; atmosphere &
            visuals (<code className="font-mono text-[13px]">components/visuals/</code>) supply the decorative
            primitives; UI primitives (<code className="font-mono text-[13px]">components/ui/</code>) are
            the atomic building blocks; card surfaces are the tiles that go
            inside a section primitive; section primitives
            (<code className="font-mono text-[13px]">components/composition/</code>, §8.12–§8.22) are the
            catalogue every product and industry page composes from; artifacts
            (<code className="font-mono text-[13px]">components/artifacts/</code>) are illustrative static
            props. Cool palette, light and dark.
          </p>
        </Container>

        {/* ════ FOUNDATIONS ════════════════════════════════════════════════ */}

        <Container>
          <div className="mt-20 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 01
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              Foundations
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              The rules every other layer obeys — typography, the cool-only
              colour palette, the 4px spacing scale, the six layout rhythms,
              and the motion language. Mirrored from design-system.md §2–§4
              and §9.
            </p>
          </div>
        </Container>

        {/* ── DESIGN TOKENS ─────────────────────────────────────────────── */}
        <Group
          index="Tokens"
          label="Design tokens"
          lede="The foundation layer — type, colour and spacing. The raw material every other system is built from; mirrored from design-system.md §2–§4."
        />

        <div id="typography" className="scroll-mt-12" />
        <CompositionDemo
          title="Type scale — Geist Sans + Geist Mono"
          desc="One sans family across display and body — Geist Sans (Vercel's commissioned typeface) for everything from the hero down to the caption, and Geist Mono for code. Distinctive shapes to watch: the slashed 0, the two-storey geometric 'a', the precise terminals on g/k/y. No italics, no all-caps. Tracking tightens with size."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-white p-8 sm:p-10 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
            <div className="space-y-7">
              {TYPE_SCALE.map((t) => (
                <div
                  key={t.token}
                  className="border-b border-surface-border-subtle pb-7 last:border-0 last:pb-0 dark:border-surface-dark-border"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                      {t.family}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                      {t.token}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "mt-2.5 text-text-primary dark:text-text-on-brand",
                      t.cls,
                    )}
                  >
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>

            {/* Glyph callouts — slashed zero, geometric 'a', g terminal.
                These are the shapes that make Geist read as Geist and not
                Inter; foregrounding them makes the family swap legible at
                a glance for the owner. */}
            <div className="mt-9 grid gap-3 border-t border-surface-border-subtle pt-7 sm:grid-cols-3 dark:border-surface-dark-border">
              <div className="rounded-xl border border-surface-border-subtle p-5 dark:border-surface-dark-border">
                <div className="font-display text-[5rem] font-medium leading-none tracking-tight text-text-primary dark:text-text-on-brand">
                  0
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                  Slashed zero
                </div>
                <p className="mt-1 font-body text-[12px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  Disambiguates 0 from O — a technical-system signal.
                </p>
              </div>
              <div className="rounded-xl border border-surface-border-subtle p-5 dark:border-surface-dark-border">
                <div className="font-display text-[5rem] font-medium leading-none tracking-tight text-text-primary dark:text-text-on-brand">
                  a
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                  Two-storey a
                </div>
                <p className="mt-1 font-body text-[12px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  Geometric, with a precise stem-to-bowl junction.
                </p>
              </div>
              <div className="rounded-xl border border-surface-border-subtle p-5 dark:border-surface-dark-border">
                <div className="font-display text-[5rem] font-medium leading-none tracking-tight text-text-primary dark:text-text-on-brand">
                  g
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                  Single-storey g
                </div>
                <p className="mt-1 font-body text-[12px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  Open descender with a flat terminal — quietly distinctive.
                </p>
              </div>
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="Colour & tone"
          desc="The cool-only palette — blue, violet, cyan, indigo. Brand carries weight, accents highlight, surfaces hold the page. Semantic colour is reserved for status."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-white p-8 sm:p-10 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
            <div className="space-y-8">
              {/* Signature wash — the four anchor colours that define the
                  NymCard gradient, shown in left-to-right wash order. Each
                  swatch carries its hex, token name and role. */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                  Signature wash · navy → cyan → indigo → violet
                </div>
                <p className="mt-1 max-w-2xl font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  The four anchors of the wash that earn NymCard's signature. The deeper violet sits past indigo so the gradient has somewhere to land — used as a gradient anchor, a chip colour on light surfaces, and a glow accent on dark. Never a CTA colour.
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10">
                  <div
                    aria-hidden="true"
                    className="h-14 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${visual.navy} 0%, ${visual.cyan} 34%, ${visual.indigo} 68%, ${visual.violet} 100%)`,
                    }}
                  />
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {SIGNATURE_WASH.map((s) => (
                    <div
                      key={s.token}
                      className="flex flex-col gap-2 rounded-xl border border-surface-border-subtle p-4 dark:border-surface-dark-border"
                    >
                      <span
                        className={cn(
                          "h-12 w-full rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10",
                          s.cls,
                        )}
                      />
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
                          {s.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                          {s.hex}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-text-secondary dark:text-text-dark-secondary">
                        {s.token}
                      </span>
                      <span className="font-body text-[12px] leading-snug text-text-secondary dark:text-text-dark-secondary">
                        {s.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {SWATCHES.map((g) => (
                <div key={g.group}>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                    {g.group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4">
                    {g.items.map((s) => (
                      <div key={s.name} className="flex flex-col gap-2">
                        <span
                          className={cn(
                            "size-16 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10",
                            s.cls,
                          )}
                        />
                        <span className="font-mono text-[10px] text-text-secondary dark:text-text-dark-secondary">
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="Spacing scale"
          desc="A 4px base unit — every spacing value is a multiple of four. Whitespace is composed, never guessed; there are no magic numbers."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-white p-8 sm:p-10 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
            <div className="space-y-3">
              {SPACING.map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                    {s.token}
                  </span>
                  <span
                    className={cn("h-3 rounded-sm bg-accent-cyan/70", s.w)}
                  />
                </div>
              ))}
            </div>
          </div>
        </CompositionDemo>

        {/* ── SECTION RHYTHM & SPACING ──────────────────────────────────── */}
        <Group
          index="Rhythm"
          label="Section rhythm & spacing system"
          lede="The editorial pacing of the NymCard site — how layouts breathe. Whitespace is intentional and carries the atmosphere; every layout has a rhythm. These six are the rhythms the site composes with — not a type scale, but layout breathing logic."
        />

        <Primitive
          title="The six rhythms"
          desc="Shown as abstract structure so the spacing reads, not the content. Restrained throughout — no startup compression, no oversized marketing padding; whitespace is the subject."
        >
          <Stage label="hero rhythm" size="lg">
            <div className="absolute inset-0 flex flex-col px-8 pb-8 pt-11">
              <div className="h-8 rounded-md bg-accent-cyan/15" />
              <div className="flex-1" />
              <Slab className="h-3.5 w-[66%]" />
              <Slab className="mt-2 h-3.5 w-[48%]" />
              <div className="mt-5 flex gap-2.5">
                <div className="h-7 w-24 rounded-md bg-accent-cyan/85" />
                <div className="h-7 w-20 rounded-md border border-brand-navy/15" />
              </div>
              <div className="h-3" />
            </div>
          </Stage>
          <Stage label="split editorial rhythm" size="lg">
            <div className="absolute inset-0 grid grid-cols-2 gap-5 px-8 pb-8 pt-11">
              <div className="flex flex-col">
                <Slab className="h-2 w-12" />
                <Slab className="mt-4 h-3 w-full" />
                <Slab className="mt-2 h-3 w-4/5" />
                <Slab className="mt-5 h-2 w-full" />
                <Slab className="mt-1.5 h-2 w-full" />
                <Slab className="mt-1.5 h-2 w-3/5" />
                <div className="mt-5 space-y-2">
                  <Slab className="h-2 w-full" />
                  <Slab className="h-2 w-full" />
                </div>
              </div>
              <Slab className="h-full" />
            </div>
          </Stage>
          <Stage label="bento density rhythm" size="lg">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2.5 px-8 pb-8 pt-11">
              <Slab className="col-span-2 row-span-2" />
              <Slab className="row-span-2" />
              <Slab />
              <Slab className="col-span-2" />
            </div>
          </Stage>
          <Stage label="enterprise information rhythm" size="lg">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1.5 px-8 pb-8 pt-11">
              {Array.from({ length: 12 }).map((_, i) => (
                <Slab key={i} />
              ))}
            </div>
          </Stage>
          <Stage label="section transition rhythm" size="lg">
            <div className="absolute inset-0 flex flex-col justify-center px-8 py-8">
              <Slab className="h-16" />
              <div className="h-6" />
              <div className="h-7 rounded-md bg-accent-cyan/15" />
              <div className="h-6" />
              <Slab className="h-16" />
            </div>
          </Stage>
          <Stage label="dark mode rhythm" size="lg" dark>
            <div className="absolute inset-0 flex flex-col justify-center gap-6 px-8 py-8">
              <div className="h-12 rounded-md bg-white/[0.12]" />
              <div className="h-12 rounded-md bg-white/[0.065]" />
              <div className="h-12 rounded-md bg-white/[0.035]" />
            </div>
          </Stage>
        </Primitive>

        {/* ── MOTION PRINCIPLES ─────────────────────────────────────────── */}
        <Group
          index="Motion"
          label="Motion principles"
          lede="The motion language — slow, synchronized, infrastructural. Environmental motion is ambient by design (long, non-looping periods, held quiet); responsive motion answers the pointer directly. Section entrance is the new piece — a SectionReveal primitive. prefers-reduced-motion freezes all of it."
        />

        <Primitive
          title="Environmental & signal motion"
          desc="Atmospheric drift moves the environment; ribbon cadence carries the hero ribbon's drift; the infrastructure pulse propagates a signal along the topology; section entrance assembles a composition with restrained stagger. These are ambient — slow and quiet by mandate; shown here on their most-present settings."
        >
          <Stage label="atmospheric drift" size="lg">
            <KineticRibbon intensity="peak" />
          </Stage>
          <Stage label="ribbon cadence" size="lg">
            <RibbonField variant="crest" />
          </Stage>
          <Stage label="infrastructure pulse · dark" size="lg" dark>
            <KineticRibbon intensity="calm" />
            <TopologyTraces density="medium" tone="cyan" />
          </Stage>
          <Stage label="section entrance" size="lg">
            <KineticRibbon intensity="calm" />
            <Centered>
              <SectionReveal stagger className="w-full max-w-[220px] space-y-2.5">
                <div className="h-9 rounded-lg border border-surface-border-subtle bg-surface-white/85" />
                <div className="h-9 rounded-lg border border-surface-border-subtle bg-surface-white/85" />
                <div className="h-9 rounded-lg border border-surface-border-subtle bg-surface-white/85" />
              </SectionReveal>
            </Centered>
          </Stage>
        </Primitive>

        {/* ── HOVER VOCABULARY ──────────────────────────────────────────── */}
        <div id="hover-vocabulary" className="scroll-mt-12" />
        <CompositionDemo
          title="Hover vocabulary — .nc-card-hover"
          desc="The §8.6 hover contract as a single utility class. Pattern is Stripe / Apple / Anthropic — the whole card lifts translateY(-4px) on hover and picks up the shadow-lift token; the CTA arrow translates 4px right per §9.7. Linear's restrained no-lift approach is rejected for this phase: card interiors are still placeholders, and without inside-the-card motion a non-lifting hover reads as no hover. Hover any card below — the three light-mode cards are different surfaces composing the same .nc-card-hover utility, so the lift reads identically across the system."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-soft p-8 sm:p-12">
            <div className="grid gap-5 sm:grid-cols-3">
              <a
                href="#"
                className="nc-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                  Stacked
                </span>
                <h4 className="mt-3 font-display text-base font-semibold leading-snug text-text-primary">
                  Card surface
                </h4>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary">
                  The default — a bordered white tile. Hover lifts the whole card and the shadow lands underneath.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-brand-primary">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="nc-card-hover group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-soft p-6"
              >
                <CardTreatment name="cyan" />
                <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                  Treatment
                </span>
                <h4 className="relative z-10 mt-3 font-display text-base font-semibold leading-snug text-text-primary">
                  Treatment surface
                </h4>
                <p className="relative z-10 mt-2 font-body text-[13px] leading-relaxed text-text-secondary">
                  Same utility, applied to a chromatic-treatment card. The lift behaviour stays consistent across material.
                </p>
                <span className="relative z-10 mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-brand-primary">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="nc-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                  Rail card
                </span>
                <h4 className="mt-3 font-display text-base font-semibold leading-snug text-text-primary">
                  Rail-style card
                </h4>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary">
                  RailCarousel cards compose the same utility — the lift reads identically across grids and rails.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-brand-primary">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="dark rounded-3xl bg-surface-dark-base p-8 sm:p-12">
            <div className="grid gap-5 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="nc-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-dark-border bg-surface-dark-elevated p-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan">
                    Dark surface
                  </span>
                  <h4 className="mt-3 font-display text-base font-semibold leading-snug text-text-on-brand">
                    Card surface
                  </h4>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-text-dark-secondary">
                    The same utility on a dark surface — shadow-dark-lift carries the lift; the surface gets a white-tint inset highlight.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-accent-cyan">
                    Explore
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <p className="font-body text-[12px] leading-relaxed text-text-muted dark:text-text-dark-muted">
            Hover: translateY(-4px) + shadow-lift (light) / shadow-dark-lift (dark) on 200ms ease-out. CTA arrow translates 4px right on 150ms. prefers-reduced-motion collapses the translate to a no-op; the shadow + border still resolve.
          </p>
        </CompositionDemo>

        {/* ════ ATMOSPHERE & VISUALS ═══════════════════════════════════════ */}

        <Container>
          <div className="mt-32 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 02
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              Atmosphere & visuals
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              Decorative layers from <code className="font-mono text-[12px]">components/visuals/</code>. Atmosphere primitives —
              ribbons, glow, glass, topology traces — that sit behind
              interactive content. No interaction; no copy.
            </p>
          </div>
        </Container>

        {/* ── THE RIBBON FAMILY ─────────────────────────────────────────── */}
        <Group
          index="Family"
          label="The ribbon"
          lede="One master, kept sacred — and two derivatives: a full-width divider that is a thinner, lighter strip of the ribbon, and an atmosphere with no ribbon silhouette at all."
        />

        <Primitive
          title="Master — homepage hero ribbon"
          desc="Approved, singular, cinematic. Homepage only; never touched or replicated. Everything below derives from this."
        >
          <Stage
            label="homepage only · master · untouched"
            size="lg"
            className="sm:col-span-2 lg:col-span-3"
          >
            <RibbonKinetic />
          </Stage>
        </Primitive>

        {/* ── PRODUCT-PAGE RIBBON — ProductHeroRibbon ─────────────────────
            The painterly product-page hero ribbon (handed off as
            /handoff/product-page-ribbon.png). Fills the parent and adds
            kinetic drift + scale breathing + opacity pulse. PNG was
            post-processed once to add an alpha channel so it works on both
            light and dark surfaces without blend-mode tricks. */}
        <div id="ribbon-streak" className="scroll-mt-12" />
        <Primitive
          title="Product-page ribbon — ProductHeroRibbon"
          desc="The painterly atmosphere for product and solution PageHeroes. Full-bleed PNG with an alpha-channel mask (white → transparent), driven by ambient drift, gentle scale breathing, and a subtle opacity pulse. Works in light and dark without blend-mode tricks because the alpha is baked in. PageHero uses it directly; listing-page headers still use the leaner [RibbonStreak] sibling."
        >
          <Stage
            label="product / solution pageHero · full-bleed · kinetic"
            size="lg"
            className="sm:col-span-2 lg:col-span-3"
          >
            <ProductHeroRibbon />
          </Stage>
        </Primitive>

        {/* ── VIOLET ANCHOR PROPOSAL ──────────────────────────────────────
            A side-by-side comparison: the live homepage ribbon (cyan +
            indigo tint) versus the same ribbon with a deeper violet
            anchor layered into the tint, so the navy → cyan → indigo →
            violet wash has somewhere to land. Lives only on this
            styleguide page — the production hero is untouched until
            this is approved. */}
        <Container>
          <div id="ribbon-violet" className="scroll-mt-24">
            <Heading
              title="Ribbon — violet anchor proposal"
              desc="The hero ribbon as it ships today (left) and the same ribbon with the deeper-violet anchor layered into the tint (right). The violet sits past indigo so the navy → cyan → indigo → violet wash has somewhere to land. The shipped hero is untouched; this comparison is the proposal."
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Stage label="current · cyan + indigo tint" size="lg">
                <RibbonKinetic />
              </Stage>
              <Stage label="proposed · with violet anchor" size="lg">
                <RibbonKineticWithViolet />
              </Stage>
            </div>
            <p className="mt-3 max-w-2xl font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              The violet anchor gives the wash dimension and earns the
              signature.
            </p>
          </div>
        </Container>

        {/* ── CROSSHAIR-MARKER RAILS ────────────────────────────────────────
            Locked page-rail signature. The production `CrosshairRails`
            primitive (components/visuals/CrosshairRails.tsx) ships in Phase 1
            and is what this demo now uses. The page-level rails system in
            app/layout.tsx is untouched. */}
        <Container>
          <div id="crosshair-rails" className="mt-16 scroll-mt-24">
            <Heading
              title="CrosshairRails — page-rail signature"
              desc="The locked page-rail signature, lifted from styleguide demo to a production visual primitive. Four 1.5px-stroke plus glyphs at the four corners of any `relative` parent. Brand-navy on light, white on dark, both at ~22% opacity. Server component, tokens only."
            />

            <div className="mt-8 overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft p-10 dark:border-surface-dark-border dark:bg-surface-dark-base">
              {/* Sample section content rectangle with the production
                  CrosshairRails primitive applied. The wrapper is `relative`
                  and the primitive fills it via `absolute inset-0`. */}
              <div className="relative mx-auto max-w-3xl">
                {/* Vertical rails on left and right edges of the content
                    rectangle — the rails the crosshairs sit on. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-px bg-brand-navy/[0.10] dark:bg-white/[0.10]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-px bg-brand-navy/[0.10] dark:bg-white/[0.10]"
                />

                {/* The production primitive. */}
                <CrosshairRails />

                {/* Sample content slabs inside the section. */}
                <div className="px-8 py-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
                    Sample section
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.01em] text-text-primary dark:text-text-on-brand">
                    Section headline 36 / 44
                  </h3>
                  <p className="mt-2 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    The four corner glyphs are rendered by{" "}
                    <code className="font-mono text-[12px]">CrosshairRails</code>{" "}
                    — a single primitive imported from{" "}
                    <code className="font-mono text-[12px]">@/components/visuals</code>.
                    A technical glyph that says &ldquo;measured, instrumented,
                    on a grid&rdquo; without saying anything literal.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Slab className="h-24" />
                    <Slab className="h-24" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-2xl font-body text-[12px] leading-relaxed text-text-muted dark:text-text-dark-muted">
              Production primitive. The page-level rails system in{" "}
              <code className="font-mono text-[11px]">app/layout.tsx</code> is
              separate; `CrosshairRails` is for section-level composition.
            </p>

            {/* Quiet crosshair recurrence — the eyebrow marker. Phase 1.5
                surfaces the crosshair glyph in more places: an optional
                `marker` on Eyebrow puts a tiny plus before the label, and
                rail-style cards reveal a small crosshair on hover. */}
            <div className="mt-10 rounded-2xl border border-surface-border-subtle bg-surface-white p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
                Quiet recurrence — Eyebrow `marker` prop
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-primary dark:text-accent-cyan">
                    Default eyebrow
                  </span>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    Plain editorial mark — used everywhere by default.
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-primary dark:text-accent-cyan">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 10"
                      className="h-2.5 w-2.5 shrink-0 text-brand-primary/65 dark:text-accent-cyan/65"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    >
                      <line x1="5" y1="1" x2="5" y2="9" />
                      <line x1="1" y1="5" x2="9" y2="5" />
                    </svg>
                    With marker
                  </span>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    `marker={"{true}"}` adds the page-rail crosshair micro-glyph. Reads as a measured rail-mark.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Primitive
          title="Environmental atmosphere"
          desc="The environmental effect caused by the ribbon — directional pressure haze, faint asymmetric energy pockets, a soft internal bloom. Row one is pure atmosphere with no ribbon shape; row two explores the alternative — subtle ribbon designs extracted from the hero ribbon, kept faint enough to read as atmosphere."
        >
          <Stage label="focus · top-right · calm" size="lg">
            <KineticRibbon focus="top-right" intensity="calm" />
          </Stage>
          <Stage label="focus · left · ambient" size="lg">
            <KineticRibbon focus="left" intensity="ambient" />
          </Stage>
          <Stage label="focus · bottom-right · peak · dark" size="lg" dark>
            <KineticRibbon focus="bottom-right" intensity="peak" />
          </Stage>
          <Stage label="ribbon design · trace" size="lg">
            <RibbonField variant="trace" />
          </Stage>
          <Stage label="ribbon design · crest" size="lg">
            <RibbonField variant="crest" />
          </Stage>
          <Stage label="ribbon design · veil · dark" size="lg" dark>
            <RibbonField variant="crest" />
          </Stage>
        </Primitive>

        {/* ── SUPPORTING SYSTEMS ────────────────────────────────────────── */}
        <Group
          index="Supporting"
          label="Supporting systems"
          lede="Distinct primitives that integrate into the ribbon atmosphere — each with its own clear identity, none competing with the ribbon."
        />

        <Primitive
          title="Scan"
          desc="The operational accent — an invoice-scanner glow. `linear` sweeps a layered cyan band top-to-bottom for documents; `radial` expands concentric rings for biometric / identity surfaces. Corner brackets mark a surface as actively scanned. Used sparingly — nCore, Identity, Fraud, Risk."
        >
          <Stage label="linear · document scan" size="lg">
            <KineticRibbon intensity="calm" />
            <Centered>
              <div className="relative h-48 w-full max-w-[260px] overflow-hidden rounded-xl">
                <GlassPanel className="absolute inset-0 overflow-hidden" padded={false} />
                <ScanSweep variant="linear" brackets intensity="standard" />
              </div>
            </Centered>
          </Stage>
          <Stage label="radial · biometric scan" size="lg">
            <KineticRibbon intensity="calm" />
            <Centered>
              <div className="relative size-48 overflow-hidden rounded-xl">
                <GlassPanel className="absolute inset-0 overflow-hidden" padded={false} />
                <ScanSweep variant="radial" brackets intensity="standard" />
              </div>
            </Centered>
          </Stage>
          <Stage label="linear · document scan · dark" size="lg" dark>
            <KineticRibbon intensity="calm" />
            <Centered>
              <div className="relative h-48 w-full max-w-[260px] overflow-hidden rounded-xl">
                <GlassPanel className="absolute inset-0 overflow-hidden" padded={false} />
                <ScanSweep variant="linear" brackets intensity="standard" />
              </div>
            </Centered>
          </Stage>
        </Primitive>

        <Primitive
          title="Light glass"
          desc="Clean white-blue translucency with a subtle cyan edge light and minimal depth — deliberately simpler than the layered translucency below."
        >
          <Stage label="light glass" size="md">
            <KineticRibbon intensity="ambient" />
            <Centered>
              <GlassPanel className="w-full max-w-[240px]">
                <div className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
                  Glass surface
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                  cyan edge · minimal depth
                </div>
              </GlassPanel>
            </Centered>
          </Stage>
          <Stage label="light glass · dark" size="md" dark>
            <KineticRibbon intensity="ambient" />
            <Centered>
              <GlassPanel className="w-full max-w-[240px]">
                <div className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
                  Glass surface
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                  cyan edge · minimal depth
                </div>
              </GlassPanel>
            </Centered>
          </Stage>
        </Primitive>

        <Primitive
          title="Structural framing"
          desc="Operational infrastructure scaffolding — a masked grid, a blueprint frame with corner brackets, a measured ruler and a slow cyan probe, and the topology undercurrent held at the edge of perception."
        >
          <Stage label="infrastructure grid">
            <InfraGrid variant="dots" fade="radial" />
          </Stage>
          <Stage label="blueprint frame">
            <KineticRibbon intensity="calm" />
            <BlueprintOverlay corners ticks />
          </Stage>
          <Stage label="topology undercurrent · dark" dark>
            <KineticRibbon intensity="calm" />
            <TopologyTraces density="medium" tone="cyan" />
          </Stage>
        </Primitive>

        {/* ── CARDTREATMENT LIBRARY ─────────────────────────────────────── */}
        <div id="card-treatments" className="scroll-mt-12" />
        <Primitive
          title="CardTreatment library — v2 chromatic reset (Phase 1.5)"
          desc="The four cell-treatments used by the CardGrid `treatment` surface. v2 reset: each treatment carries its own chromatic identity — cyan / indigo / violet / ribbon — rather than the same KineticRibbon at different intensities. The grid auto-cycles the library so adjacent cells differ by hue, not by volume. Cool only — no warm tones; no rainbow. One ribbon per row maximum."
        >
          {CARD_TREATMENTS.map((name) => (
            <Stage key={name} label={`treatment · ${name}`} size="md">
              <CardTreatment name={name} />
            </Stage>
          ))}
          <Stage label="treatment · cyan · dark" size="md" dark>
            <CardTreatment name="cyan" />
          </Stage>
          <Stage label="treatment · violet · dark" size="md" dark>
            <CardTreatment name="violet" />
          </Stage>
          <Stage label="treatment · ribbon · dark" size="md" dark>
            <CardTreatment name="ribbon" />
          </Stage>
        </Primitive>

        {/* ════ UI PRIMITIVES ══════════════════════════════════════════════ */}

        <Container>
          <div className="mt-32 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 03
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              UI primitives
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              Atomic UI primitives from <code className="font-mono text-[12px]">components/ui/</code>. Buttons, fields,
              badges, infrastructure icons — the smallest building blocks
              every other layer composes from.
            </p>
          </div>
        </Container>

        {/* ── BUTTON SYSTEM ─────────────────────────────────────────────── */}
        <Group
          index="Buttons"
          label="Button system"
          lede="design-system.md §8.9. One primary CTA per section — navy fill, the authority. Secondary is the outline; tertiary is a text link with a functional forward arrow. One radius family."
        />

        <CompositionDemo
          title="Variants, sizes & states"
          desc="Primary, secondary and tertiary — light and dark. Active scales to 0.98; disabled drops to 40%; keyboard focus shows the §6 brand ring."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-soft p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Talk to sales</Button>
              <Button variant="secondary">Explore nCore</Button>
              <Button variant="tertiary">Read the docs</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md">
                Primary · md
              </Button>
              <Button variant="secondary" size="md">
                Secondary · md
              </Button>
            </div>
          </div>
          <div className="dark rounded-3xl bg-surface-dark-base p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Talk to sales</Button>
              <Button variant="secondary">Explore nCore</Button>
              <Button variant="tertiary">Read the docs</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </CompositionDemo>

        {/* ── FORM FIELDS ───────────────────────────────────────────────── */}
        <Group
          index="Forms"
          label="Form fields"
          lede="Native, accessible inputs at radius-md — a 1px edge, shadow-xs, and the §6 brand focus ring. Text, select, multi-line, choice and toggle; uncontrolled by default."
        />

        <CompositionDemo
          title="Field types"
          desc="Input, select, textarea, checkbox, radio and switch — light and dark. Tab through them to see the focus ring."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-white p-8 sm:p-10 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
            <FormFields group="rail-light" />
          </div>
          <div className="dark rounded-3xl bg-surface-dark-base p-8 sm:p-10">
            <FormFields group="rail-dark" />
          </div>
        </CompositionDemo>

        {/* ── BADGES & STATUS ───────────────────────────────────────────── */}
        <Group
          index="Badges"
          label="Badges & status"
          lede="Small categorical tags at radius-sm; status pills at radius-pill, where shape carries the meaning. The pill is the one place semantic colour is allowed."
        />

        <CompositionDemo
          title="Badges, status & focus"
          desc="Cool-palette badges, semantic status pills, and the keyboard focus ring every interactive element carries. Shown light and dark."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-white p-8 sm:p-10 dark:border-surface-dark-border dark:bg-surface-dark-elevated">
            <BadgeRow />
          </div>
          <div className="dark rounded-3xl bg-surface-dark-base p-8 sm:p-10">
            <BadgeRow />
          </div>
        </CompositionDemo>

        {/* ── INFRASTRUCTURE ICONS ──────────────────────────────────────── */}
        <Group
          index="Icons"
          label="Infrastructure icon system"
          lede="One treatment: atmospheric. Each icon is a geometric mark on a 24px grid, drawn with a cool gradient stroke and set inside a rounded-square tile that carries a soft tonal glow — never a circle, never a flat fill, never neon. The tone is keyed per icon across the full cool palette: cyan highlights, indigo and purple bridges, primary blue for infrastructure weight. The component renders the tile itself, so an icon can never land in a circular container."
        />

        <CompositionDemo
          title="The atmospheric icon library"
          desc="Eleven icons — Cards, Lending, Money Movement, Fraud, Risk, 3D Secure, Settlement, Reconciliation, Design, Migration, AI. Each tile is a rounded square with a tonal gradient fill and glow; the glyph is a gradient-stroked geometric mark."
        >
          <div className="rounded-3xl border border-surface-border-subtle bg-surface-soft p-8 sm:p-12">
            <div className="grid grid-cols-3 gap-y-10 sm:grid-cols-6">
              {iconNames.map((name) => (
                <IconCell key={name} name={name} />
              ))}
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="The library on dark"
          desc="The same eleven icons on a dark surface. The tonal glow reads as environmental edge lighting; the gradient stroke holds its blues and purples. Light and dark by construction — one component, no second set."
        >
          <div className="dark rounded-3xl bg-surface-dark-base p-8 sm:p-12">
            <div className="grid grid-cols-3 gap-y-10 sm:grid-cols-6">
              {iconNames.map((name) => (
                <IconCell key={name} name={name} />
              ))}
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="Inside a card surface"
          desc="Icons sit at the top of a card as the editorial header mark — the atmospheric tile at the medium size. Restrained: the icon anchors the card, it never dominates it."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {(["cards", "money-movement", "ai"] as const).map((name) => (
              <div
                key={name}
                className="rounded-2xl border border-surface-border-subtle bg-surface-white p-6"
              >
                <InfraIcon name={name} size="md" />
                <div className="mt-4 font-display text-sm font-semibold text-text-primary">
                  {iconLabels[name]}
                </div>
                <div className="mt-2.5 h-2 w-4/5 rounded-full bg-brand-navy/[0.08]" />
                <div className="mt-1.5 h-2 w-3/5 rounded-full bg-brand-navy/[0.08]" />
              </div>
            ))}
          </div>
        </CompositionDemo>

        {/* ════ CARD SURFACES ══════════════════════════════════════════════ */}

        <Container>
          <div className="mt-32 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 04
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              Card surfaces
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              The cards that go <em>inside</em> section primitives. Used by{" "}
              <code className="font-mono text-[12px]">CardGrid</code>, the bento layouts, and ad-hoc compositions on
              product pages — never a page section on their own. From{" "}
              <code className="font-mono text-[12px]">components/composition/</code>.
            </p>
          </div>
        </Container>

        {/* ── PRODUCTCARD ───────────────────────────────────────────────── */}
        <Group
          index="ProductCard"
          label="ProductCard"
          lede="The single-product tile on a product grid (§8.8) — heading + description above, an animated translucent product-UI zone below. Used as the cell inside the symmetric CardGrid layouts. Stacked by default; the split orientation places copy beside the UI for full-width single-column rows."
        />
        <CompositionDemo
          title="Stacked & split orientations"
          desc="The two orientations the primitive supports. Stacked is the default for 2- and 3-column grids; split takes the full width and is used by the cols-1 layout."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <ProductCard
              name="Card issuing"
              description="Virtual and physical card programmes on programmable rails — multi-currency and region-aware."
            />
            <ProductCard
              name="Money movement"
              description="Payouts, transfers and collections across one observable settlement layer."
            />
          </div>
          <ProductCard
            orientation="split"
            name="nCore platform"
            description="The single programmable core beneath every NymCard programme — issuing, lending, money movement and settlement composed on one operational layer."
          />
        </CompositionDemo>

        {/* ── FLOATINGOPERATIONALPANEL ──────────────────────────────────── */}
        <Group
          index="FloatingOperationalPanel"
          label="FloatingOperationalPanel"
          lede="An elevated glass operational surface — subtle glass, a soft float, a directional corner light and a localised atmospheric pressure beneath. Shown over a dark atmospheric field. For identity, fraud and real-time control modules."
        />
        <CompositionDemo
          title="FloatingOperationalPanel"
          desc="Composed inside a darkened ambient frame so the glass float and corner light read clearly."
        >
          <div className="dark relative overflow-hidden rounded-3xl bg-surface-dark-base p-10 sm:p-14">
            <KineticRibbon intensity="ambient" />
            <div className="relative mx-auto max-w-md">
              <FloatingOperationalPanel
                eyebrow="Fraud monitoring"
                title="Real-time risk controls"
                body="Operational signals composed into one elevated surface — calm, infrastructural, always observable."
                status={[
                  { label: "Transaction scoring", state: "Active" },
                  { label: "Velocity rules", state: "Active" },
                  { label: "Manual review queue", state: "Idle" },
                ]}
              />
            </div>
          </div>
        </CompositionDemo>

        {/* ── UICONTAINER / UIPLACEHOLDER ───────────────────────────────── */}
        <Group
          index="UIContainer and UIPlaceholder"
          label="UIContainer & UIPlaceholder"
          lede="The embedding helpers — how a product UI sits inside the cinematic atmosphere. UIContainer holds an abstract UI placeholder at three depths with optional edge dissolve; UIPlaceholder is the neutral skeleton stand-in used in the visual zones of PageHero and FeatureShowcase until real product UIs land. Skeleton forms only — never a fake dashboard."
        />

        <CompositionDemo
          title="UI depth hierarchy"
          desc="Three depths place a UI in the scene: foreground (crisp, lifted), embedded (translucent — the atmosphere reads through), recessed (pushed back, an infrastructure surface). The atmosphere is the fourth layer, behind all three."
        >
          <div className="relative overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft p-8 sm:p-12">
            <KineticRibbon intensity="ambient" focus="top-right" />
            <div className="relative z-10 grid gap-6 sm:grid-cols-3">
              {(["foreground", "embedded", "recessed"] as const).map((depth) => (
                <div key={depth}>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                    {depth}
                  </span>
                  <UIContainer depth={depth} className="mt-2.5" />
                </div>
              ))}
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="Edge dissolve & environmental lighting"
          desc="An embedded UI fades into the atmosphere on a chosen edge — directional integration, never a hard cut. A cyan edge hairline and faint cyan / indigo reflections let the environment read across the surface."
        >
          <div className="relative overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft p-10 sm:p-16">
            <KineticRibbon intensity="ambient" focus="left" />
            <div className="relative z-10 mx-auto max-w-md">
              <UIContainer depth="embedded" dissolve="bottom" />
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="Screenshot cropping & atmospheric overlap"
          desc="Product UIs are cropped editorially — partial, asymmetric, bleeding off an edge — never a perfectly centred screenshot. The ribbon and atmosphere overlap the UI without overwhelming it; one edge dissolves into the field."
        >
          <div className="relative h-80 overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft">
            <KineticRibbon intensity="ambient" focus="top-right" />
            <RibbonField variant="trace" />
            <div className="absolute right-[-7%] top-[15%] w-[58%] sm:w-[46%]">
              <UIContainer depth="foreground" dissolve="left" />
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="UIPlaceholder — the product-UI stand-in"
          desc="The neutral, on-system stand-in for a real product UI — used in the visual zones of PageHero and FeatureShowcase until the real surface is produced. Abstract skeleton forms only (a header bar, a divider, content rows, two blocks), a clear mono label, a faint cool environmental light. Two scales: `compact` for a hero visual, `wide` for a showcase UI zone. Light and dark."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-72">
              <UIPlaceholder label="compact · hero visual" scale="compact" />
            </div>
            <div className="dark h-72 rounded-lg">
              <UIPlaceholder label="compact · dark" scale="compact" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-80">
              <UIPlaceholder label="wide · showcase zone" scale="wide" />
            </div>
            <div className="dark h-80 rounded-lg">
              <UIPlaceholder label="wide · dark" scale="wide" />
            </div>
          </div>
        </CompositionDemo>

        {/* ── HOMEPAGE PRODUCT UIs — coded surfaces on the glass kit (§8.8 v6) ── */}
        <Group
          index="Product UIs"
          label="Homepage product UIs — coded surfaces on the glass kit"
          lede="The six homepage Products cells (§8.8 v6). Each is its OWN bespoke, hand-authored, tokenized React + SVG surface — distinct from one another and from the hero carousel — composed on the CANONICAL GLASS KIT (§8.1): GlassSurface (the frosted material, mirroring GlassPanel) floating on GlassAtmosphere (the rich, theme-aware, restrained cool field). This is the crux the whole system turns on — glass reads as glass only over a rich field, never a flat bed. Navy/cyan-led; purple appears only as an object accent (the Cards object), never the field. The prior v5 direction (every cell loading a reused /public/handoff SVG on a faint tonal bed) read flat and samey and was retired. Bar to match: /visual-system/glass. Each surface reveals on scroll-in and reacts on hover; cool-palette only; light + dark; reduced-motion safe."
        />

        <CompositionDemo
          title="The six homepage cells — coded surfaces, light + dark"
          desc="Cards · Lending · Money Movement · Settlement · Financial Crime · Reconciliation. Each fills its cell flush and floats glass over its own restrained cool field; the field deepens (not inverts to a light pane) on dark."
        >
          {([false, true] as const).map((isDark) => (
            <div
              key={isDark ? "dark" : "light"}
              className={cn(
                "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 first:mt-0",
                isDark && "dark",
              )}
            >
              {[
                CardsUI,
                LendingUI,
                MoneyMovementUI,
                SettlementUI,
                FinancialCrimeUI,
                ReconciliationUI,
              ].map((Surface, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-inset",
                    isDark
                      ? "bg-surface-dark-elevated/40 ring-surface-dark-border"
                      : "bg-surface-white ring-surface-border-subtle/60",
                  )}
                >
                  <Surface />
                </div>
              ))}
            </div>
          ))}
        </CompositionDemo>

        {/* ── LENDING PRODUCT-PAGE SURFACES (/products/lending §4 + §5) ──── */}
        <Group
          index="Product UIs"
          label="Lending product-page surfaces — distinct coded UIs"
          lede="The Lending product page (/products/lending) gets bespoke, hand-authored, tokenized React + SVG surfaces — one per credit-journey stage in §4 and a live decisioning visualization in §5 — replacing the prior repeated handoff-SVG (every §4 cell resolved to the same embedded-lending.svg). Each §4 surface depicts THAT stage and is visually distinct: a card detail panel, an onboarding stepper, a decision-rules score gauge, a disbursement-target selector, a billing-cycle timeline, and a repayment-structure comparison chart. Each has a scroll-into-view entrance and a group-hover reaction; cool-palette only; light + dark; reduced-motion safe. Cards are straight (never tilted)."
        />

        <CompositionDemo
          title="§4 Credit journey — six distinct surfaces (light + dark)"
          desc="Card-linked credit (revolving meter + electric-violet card) · Origination (KYC/KYB stepper) · Decisioning (sources → score vs threshold) · Disbursement (card/account/wallet target) · Collections (billing-cycle timeline) · Repayment structures (three structure shapes compared). Each fills its bento cell flush; the per-cell tonal bed flips to a dark cool wash on dark."
        >
          {([false, true] as const).map((isDark) => (
            <div
              key={isDark ? "dark" : "light"}
              className={cn(
                "grid grid-cols-1 gap-4 overflow-hidden rounded-2xl p-4 sm:grid-cols-2 lg:auto-rows-[14rem] lg:grid-cols-6",
                isDark
                  ? "dark bg-surface-dark-base ring-1 ring-inset ring-surface-dark-border"
                  : "bg-surface-white ring-1 ring-inset ring-surface-border-subtle",
              )}
            >
              {(
                [
                  { Comp: CardLinkedCreditUI, span: "lg:col-span-3", tall: true },
                  { Comp: OriginationUI, span: "lg:col-span-3", tall: false },
                  { Comp: DecisioningUI, span: "lg:col-span-3", tall: false },
                  { Comp: DisbursementUI, span: "lg:col-span-3", tall: false },
                  { Comp: CollectionsUI, span: "lg:col-span-3", tall: false },
                  { Comp: RepaymentStructuresUI, span: "lg:col-span-6", tall: true },
                ] as const
              ).map(({ Comp, span, tall }, i) => (
                <div
                  key={i}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border",
                    "border-surface-border-subtle dark:border-surface-dark-border",
                    span,
                    tall && "lg:row-span-2",
                  )}
                >
                  <Comp />
                </div>
              ))}
            </div>
          ))}
        </CompositionDemo>

        <CompositionDemo
          title="§5 Decisioning visualization — dark-only"
          desc="Three applicants run through the configured rules in sequence: A clears the threshold (approved with a calculated limit), B falls below (declined, reasoning shown), C is routed to manual review. Values are coherent with the section's JSON config (threshold 720, limit range $500–$25,000). Lives beneath the CodeArtifact on the dark §5 frame. Reduced-motion renders the resolved end-state statically."
        >
          <div className="dark overflow-hidden rounded-2xl bg-surface-dark-base p-6 ring-1 ring-inset ring-surface-dark-border sm:p-8">
            <DecisioningVisualization />
          </div>
        </CompositionDemo>

        {/* ════ SECTION PRIMITIVES ═════════════════════════════════════════ */}

        <Container>
          <div className="mt-32 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 05
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              Section primitives
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              The reusable section-level primitives in{" "}
              <code className="font-mono text-[12px]">components/composition/</code>, numbered §8.12–§8.22. Every
              product and industry page on nymcard.com composes from these —{" "}
              <code className="font-mono text-[12px]">PageHero</code> opens, <code className="font-mono text-[12px]">CTASection</code> closes,
              the rest fill the body. This is the catalogue every page is built
              from.
            </p>
          </div>
        </Container>

        {/* PageHero — §8.12. Framed so the full-bleed section reads inside the
            dev page; the SectionFrame just clips and rounds. Wider wrapper
            than the standard Container so the F-split has the room it will
            have on a real page (the sidebar makes a 1280px Container feel
            cramped here). */}
        <div id="section-pagehero" className="mx-auto mt-12 w-full max-w-[1600px] scroll-mt-12 px-4 sm:px-6 lg:px-8">
          <Heading
            title="PageHero — §8.12 product / solution hero"
            desc="The shared hero for product and solution pages — F-pattern asymmetric (copy left, one product UI right), one ambient glow, and a thin diagonal kinetic streak under the visual column. Same family as the homepage hero, dialled down. Light only. UIPlaceholder stands in for the real product UI."
          />
          <div className="mt-5">
            <SectionFrame>
              <PageHero
                topLine="Processing 4.2M transactions a day"
                headline="The issuing platform for modern card programmes"
                body="Launch virtual and physical cards on infrastructure built for scale, observability and control across every region."
                primaryCta={{ label: "Talk to sales", href: "#" }}
                secondaryCta={{ label: "Read the docs", href: "#" }}
                visualLabel="issuing console"
              />
            </SectionFrame>
          </div>
        </div>

        {/* FeatureShowcase — §8.13 */}
        <div id="section-featureshowcase" className="scroll-mt-12">
          <CompositionDemo
            title="FeatureShowcase — §8.13 feature showcase"
            desc="The Linear pattern — a two-column header (headline left, body right) over one large product-UI zone. No eyebrow: the headline leads (CLAUDE.md v1.5). The UI zone loads a real Claude Design handoff surface (HandoffVisual) — never the grey UIPlaceholder skeleton. One UI per showcase, never a grid. Light and dark (dark is permitted for a single technical showcase)."
          >
            <SectionFrame>
              <FeatureShowcase
                headline="Every spend control, in one operational surface"
                body="Set limits, freeze a card, route authorisations and reconcile settlement — composed into a single console rather than scattered across screens."
                ui={
                  <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
                    <HandoffVisual slug="card-issuing" tone="slate" pad="loose" />
                  </div>
                }
              />
            </SectionFrame>
            <SectionFrame dark>
              <FeatureShowcase
                headline="Every spend control, in one operational surface"
                body="Set limits, freeze a card, route authorisations and reconcile settlement — composed into a single console rather than scattered across screens."
                background="dark"
                ui={
                  <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
                    <HandoffVisual slug="card-issuing" tone="slate" pad="loose" />
                  </div>
                }
              />
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* CTASection — §8.14 */}
        <div id="section-ctasection" className="scroll-mt-12">
          <CompositionDemo
            title="CTASection — §8.14 closing call-to-action"
            desc="The centred closing call-to-action that ends a page, before the footer — headline, one line of body, one primary CTA. It carries the CTA and nothing else: no adjacent cards, no cross-link grid. Centred is the deliberate exception to the asymmetry default. Light (surface-soft) and dark."
          >
            <SectionFrame>
              <CTASection
                headline="Ready to launch your card programme?"
                body="Launch on infrastructure built to scale across every region."
                primaryCta={{ label: "Talk to sales", href: "#" }}
                secondaryCta={{ label: "Explore nCore", href: "#" }}
              />
            </SectionFrame>
            <SectionFrame dark>
              <CTASection
                headline="Ready to launch your card programme?"
                body="Launch on infrastructure built to scale across every region."
                primaryCta={{ label: "Talk to sales", href: "#" }}
                secondaryCta={{ label: "Explore nCore", href: "#" }}
                background="dark"
              />
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* FAQ — §8.15 */}
        <div id="section-faq" className="scroll-mt-12">
          <CompositionDemo
            title="FAQ — §8.15 divider accordion"
            desc="A divider-based accordion — rows separated by hairlines, never a grid of cards. All rows closed by default; questions phrased as a user would ask them. Emits mandatory schema.org/FAQPage JSON-LD for answer-engine citation. Expand / collapse on functional timing, paused under prefers-reduced-motion. Shown on the white and soft surfaces."
          >
            <SectionFrame>
              <FAQ
                eyebrow="Questions"
                headline="Frequently asked questions"
                items={FAQ_ITEMS}
              />
            </SectionFrame>
            <SectionFrame>
              <FAQ
                eyebrow="Questions"
                headline="Frequently asked questions"
                items={FAQ_ITEMS}
                background="soft"
              />
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* CrossSellBanner — §8.16 */}
        <div id="section-crosssell" className="scroll-mt-12">
          <CompositionDemo
            title="CrossSellBanner — §8.16 cross-sell banners"
            desc="Wide 2-up cross-link banners — the lead-in (the product name) runs in-line into the body sentence, a tertiary link, and a cool-palette gradient graphic bleeding off the right edge. Two banners per row maximum; a cross-link, never a primary CTA. Light and dark — the gradient keeps the same cool palette on both."
          >
            <div className="py-12">
              <CrossSellBanner items={CROSS_SELL_ITEMS} />
            </div>
            <div className="dark rounded-3xl bg-surface-dark-base py-12">
              <CrossSellBanner items={CROSS_SELL_ITEMS} />
            </div>
          </CompositionDemo>
        </div>

        {/* CodeArtifact — §8.17 */}
        <div id="section-codeartifact" className="scroll-mt-12">
          <Container>
            <Heading
              title="CodeArtifact — §8.17 on-system code / JSON / config artifact"
              desc="The code panel for page-arc Section 6 (API / configuration). Language tabs across the top (active in cyan), line numbers down the left, restrained cool-palette syntax highlight, and an optional companion block beneath (sub-headline + body + tertiary link) — the home for the page-arc's 'live visualization showing the config applied' hook. Dark default (the canonical Stripe reference), light variant preserved. Below: a 1-language tab strip with the companion slot filled, shown dark and light."
            />
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <SectionFrame dark>
                <div className="p-6 sm:p-8 lg:p-10">
                  <CodeArtifact
                    background="dark"
                    tabs={CODE_ARTIFACT_TABS}
                    companion={{
                      heading: "Comprehensive controls",
                      body: "Every spend control on a card — limits, merchant categories, schedules — set with one JSON object, applied in real time.",
                      link: { label: "Read the docs", href: "#" },
                    }}
                  />
                </div>
              </SectionFrame>
              <SectionFrame>
                <div className="p-6 sm:p-8 lg:p-10">
                  <CodeArtifact
                    background="light"
                    tabs={CODE_ARTIFACT_TABS}
                    companion={{
                      heading: "Comprehensive controls",
                      body: "Every spend control on a card — limits, merchant categories, schedules — set with one JSON object, applied in real time.",
                      link: { label: "Read the docs", href: "#" },
                    }}
                  />
                </div>
              </SectionFrame>
            </div>
          </Container>
        </div>

        {/* RailCarousel — §8.18 */}
        <div id="section-railcarousel" className="scroll-mt-12">
          <div className="mx-auto mt-12 w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Heading
              title="RailCarousel — §8.18 full-bleed snap-scroll rail"
              desc="The props-driven generalisation of the homepage UseCases rail. Two card-density variants: rich (UI + headline + body + bullets + Explore link — the homepage use cases) and sparse (eyebrow + one line + link — page-arc Section 7 industries). Section header inside the constrained content rail; the rail itself bleeds full-width. Below: a rich rail on a light surface with three sample use cases, and a sparse rail on a dark surface with five sample industries."
            />
            <div className="mt-5 space-y-5">
              <SectionFrame>
                <RailCarousel
                  variant="rich"
                  background="light"
                  eyebrow="Use cases"
                  headline="Multiple ways to grow with NymCard"
                  items={SAMPLE_USE_CASES}
                  ariaLabel="Sample rich rail"
                />
              </SectionFrame>
              <SectionFrame dark>
                <RailCarousel
                  variant="sparse"
                  background="dark"
                  eyebrow="Industries"
                  headline="Built for the teams that ship financial products"
                  items={SAMPLE_INDUSTRIES}
                  ariaLabel="Sample sparse rail"
                />
              </SectionFrame>
            </div>
          </div>
        </div>

        {/* OutcomeChips — §8.19 */}
        <div id="section-outcomechips" className="scroll-mt-12">
          <CompositionDemo
            title="OutcomeChips — §8.19 outcome chip row"
            desc="The row of three buyer-side outcome chips that sits directly beneath an industry-page hero. Icon (accent-cyan) + bold label (2–4 words) + one-sentence body. Buyer outcomes, never capabilities; no card frame — reads as an editorial row separated from the hero above by a hairline. Light and dark."
          >
            <SectionFrame>
              <div className="bg-surface-white py-[72px]">
                <OutcomeChips items={SAMPLE_OUTCOME_CHIPS} />
              </div>
            </SectionFrame>
            <SectionFrame dark>
              <div className="bg-surface-dark-base py-[72px]">
                <OutcomeChips items={SAMPLE_OUTCOME_CHIPS} />
              </div>
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* TextImageRow — §8.20 */}
        <div id="section-textimagerow" className="scroll-mt-12">
          <CompositionDemo
            title="TextImageRow — §8.20 copy ↔ visual row"
            desc="The lighter copy ↔ visual row used in the industry-page 'What you can build' section — 3 or 4 rows per page, alternating text-left / text-right. No card frame — reads as an editorial row, not a product card. Optional tertiary 'Learn more →' link uses the §8.16 cross-link treatment. Below: two rows alternating, one with a link, one without; shown light then dark."
          >
            <SectionFrame>
              <div className="space-y-[72px] bg-surface-white py-[72px]">
                <TextImageRow
                  orientation="text-left"
                  eyebrow="Patient financing"
                  headline="Embed installment financing into the care journey"
                  body="Configurable repayment structures, integrated into the care journey — without a third-party lender or a separate integration."
                  link={{ label: "Learn more", href: "#" }}
                  visualLabel="financing console"
                />
                <TextImageRow
                  orientation="text-right"
                  eyebrow="Staff disbursement"
                  headline="Pay medical staff, contractors and agency workers in real time"
                  body="Payout cards with spend controls and reconciliation per disbursement — no batch payroll, no end-of-month lag."
                  visualLabel="payouts console"
                />
              </div>
            </SectionFrame>
            <SectionFrame dark>
              <div className="space-y-[72px] bg-surface-dark-base py-[72px]">
                <TextImageRow
                  orientation="text-left"
                  eyebrow="Patient financing"
                  headline="Embed installment financing into the care journey"
                  body="Configurable repayment structures, integrated into the care journey — without a third-party lender or a separate integration."
                  link={{ label: "Learn more", href: "#" }}
                  visualLabel="financing console"
                />
                <TextImageRow
                  orientation="text-right"
                  eyebrow="Staff disbursement"
                  headline="Pay medical staff, contractors and agency workers in real time"
                  body="Payout cards with spend controls and reconciliation per disbursement — no batch payroll, no end-of-month lag."
                  visualLabel="payouts console"
                />
              </div>
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* PlatformChecklist — §8.21 */}
        <div id="section-platformchecklist" className="scroll-mt-12">
          <CompositionDemo
            title="PlatformChecklist — §8.21 'Built for X' platform section"
            desc="The compact platform answer on every industry page — heading + body on the left, a 4–6 bullet checklist on the right (each item with a cyan check), and an optional trust-chip strip beneath the list. No AmbientGlow, no kinetic ribbon — this is the calm factual counterpoint to the editorial rows above. Light and dark."
          >
            <SectionFrame>
              <div className="bg-surface-white py-[96px]">
                <PlatformChecklist
                  eyebrow="Platform"
                  headline="Built for high-volume, distributed payment operations"
                  body="The platform behind every industry programme — deployable, integrated, certified."
                  items={[
                    "API-first — integrates with the systems your team already runs",
                    "Real-time disbursement and spend visibility across distributed networks",
                    "On-premise, hybrid and cloud deployment",
                    "KYC, KYB, AML and sanctions screening embedded across programmes",
                    "Audit trails and regulatory reporting built into the platform",
                  ]}
                  chips={[
                    "PCI DSS Level 1",
                    "ISO 27001",
                    "Principal member of Visa",
                    "Principal member of Mastercard",
                  ]}
                />
              </div>
            </SectionFrame>
            <SectionFrame dark>
              <div className="bg-surface-dark-base py-[96px]">
                <PlatformChecklist
                  eyebrow="Platform"
                  headline="Built for high-volume, distributed payment operations"
                  body="The platform behind every industry programme — deployable, integrated, certified."
                  items={[
                    "API-first — integrates with the systems your team already runs",
                    "Real-time disbursement and spend visibility across distributed networks",
                    "On-premise, hybrid and cloud deployment",
                    "KYC, KYB, AML and sanctions screening embedded across programmes",
                    "Audit trails and regulatory reporting built into the platform",
                  ]}
                  chips={[
                    "PCI DSS Level 1",
                    "ISO 27001",
                    "Principal member of Visa",
                    "Principal member of Mastercard",
                  ]}
                />
              </div>
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* DeveloperBlock — §8.22 */}
        <div id="section-developerblock" className="scroll-mt-12">
          <CompositionDemo
            title="DeveloperBlock — §8.22 slim mid-page developer call"
            desc="A slim left-aligned block — heading + one sentence + tertiary 'Read the docs →' — that sits between Platform and the product cross-sells on every industry page. Smaller than §8.14 CTASection so it never competes with the closing CTA. Three surface variants: white (default), soft, and dark."
          >
            <SectionFrame>
              <DeveloperBlock
                eyebrow="Developers"
                headline="Built for your team to integrate"
                body="Full API access, SDKs, sandbox environment and webhooks — connects to the systems your team already runs without rebuilding around them."
                link={{ label: "Read the docs", href: "#" }}
              />
            </SectionFrame>
            <SectionFrame>
              <DeveloperBlock
                eyebrow="Developers"
                headline="Built for your team to integrate"
                body="Full API access, SDKs, sandbox environment and webhooks — connects to the systems your team already runs without rebuilding around them."
                link={{ label: "Read the docs", href: "#" }}
                background="soft"
              />
            </SectionFrame>
            <SectionFrame dark>
              <DeveloperBlock
                eyebrow="Developers"
                headline="Built for your team to integrate"
                body="Full API access, SDKs, sandbox environment and webhooks — connects to the systems your team already runs without rebuilding around them."
                link={{ label: "Read the docs", href: "#" }}
                background="dark"
              />
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* ── TrustBar — §8.25 ──────────────────────────────────────────── */}
        <div id="section-trustbar" className="scroll-mt-12">
          <CompositionDemo
            title="TrustBar — §8.25 marquee + optional trust line"
            desc="The thin marquee strip of client / network / certification logos that sits directly under the hero on the homepage and every product / industry page. Promoted from sections/ to a composition primitive in Phase 1. Three surface variants (white, soft, dark) and an optional `trustLine` that adds a second row beneath the marquee (used by the industry-page arc). Preserves the v1 behaviour — 45s loop, two-copy seamless, edge fades, reduced-motion fallback to first 6 logos centred static."
          >
            <SectionFrame>
              <TrustBar />
            </SectionFrame>
            <SectionFrame>
              <TrustBar background="soft" />
            </SectionFrame>
            <SectionFrame dark>
              <TrustBar background="dark" />
            </SectionFrame>
            <SectionFrame>
              <TrustBar trustLine={<PrincipalMemberTrustLine />} />
            </SectionFrame>
            <SectionFrame dark>
              <TrustBar
                background="dark"
                trustLine={<PrincipalMemberTrustLine />}
              />
            </SectionFrame>
          </CompositionDemo>
        </div>

        {/* ── CARDGRID — bento + symmetric, one entry ───────────────────── */}
        <div id="section-cardgrid" className="scroll-mt-12">
          <Group
            index="CardGrid"
            label="CardGrid — bento + symmetric layouts"
            lede="One prop-configured grid for the whole site. Two axes — `layout` (asymmetric `bento` or symmetric `cols-3` / `cols-2` / `cols-1`) and card type (`with-UI`: heading + description + product-UI zone; `no-UI`: icon + heading + text) — plus a `surface` selector (`product`, `treatment`, `glass`). It replaces the six overlapping grids that grew here; the card-surface systems it composes (CardTreatment, GlassPanel, ProductCard) are unchanged. Every layout × card-type combination is shown below, light and dark — bento first, then the symmetric column layouts."
          />

          <CompositionDemo
            title="layout='bento' · card='with-UI'"
            desc="The asymmetric, six-column grid — uneven spans, tall / wide interplay, density variation (the Stripe.com asymmetric reference). On the `treatment` surface every cell auto-cycles a distinct CardTreatment; the two tall feature cells split heading beside an embedded product-UI zone. One tone throughout — the whole grid flips light or dark."
          >
            <div className="rounded-3xl bg-surface-soft p-5">
              <CardGrid layout="bento" card="with-UI" surface="treatment" items={BENTO_CELLS} />
            </div>
            <div className="dark rounded-3xl bg-surface-dark-base p-5">
              <CardGrid layout="bento" card="with-UI" surface="treatment" items={BENTO_CELLS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='bento' · card='no-UI'"
            desc="The same uneven six-column grid with the no-UI card — an infrastructural icon opens each cell, then heading and text on the treatment surface. No embedded product-UI zone."
          >
            <div className="rounded-3xl bg-surface-soft p-5">
              <CardGrid layout="bento" card="no-UI" surface="treatment" items={BENTO_CELLS} />
            </div>
            <div className="dark rounded-3xl bg-surface-dark-base p-5">
              <CardGrid layout="bento" card="no-UI" surface="treatment" items={BENTO_CELLS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='cols-3' · card='no-UI' — the icon / heading / text grid"
            desc="Equal-height cards on one shared restrained atmosphere — a fixed icon → eyebrow → heading → copy rhythm and a subtle cyan hover light. The modular three-column pattern (§8.5). Light and dark."
          >
            <CardGrid layout="cols-3" card="no-UI" surface="product" items={PRODUCT_ITEMS} />
            <div className="dark">
              <CardGrid layout="cols-3" card="no-UI" surface="product" items={PRODUCT_ITEMS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='cols-3' · card='with-UI' — treatment surface"
            desc="The three-column symmetric grid with the with-UI card on the treatment surface — each card a distinct CardTreatment, an embedded product-UI placeholder cropped editorially into it. Light and dark."
          >
            <CardGrid layout="cols-3" card="with-UI" surface="treatment" items={PRODUCT_ITEMS} />
            <div className="dark">
              <CardGrid layout="cols-3" card="with-UI" surface="treatment" items={PRODUCT_ITEMS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='cols-3' · card='with-UI' — glass surface"
            desc="The same three-column grid on the Light Glass material — every card a GlassPanel floating on one shared ribbon atmosphere (§8.1: glass never sits on a solid fill), carrying a heading, a description and an embedded UI. Light and dark."
          >
            <CardGrid layout="cols-3" card="with-UI" surface="glass" items={PRODUCT_ITEMS} />
            <div className="dark">
              <CardGrid layout="cols-3" card="with-UI" surface="glass" items={PRODUCT_ITEMS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='cols-2' · card='with-UI' — the homepage product overview"
            desc="The balanced two-column grid on the `product` surface — equal product cards, each carrying heading + description + an animated product-UI zone (§8.8). The default for the homepage product overview. Light and dark."
          >
            <CardGrid layout="cols-2" card="with-UI" surface="product" items={PRODUCT_ITEMS} />
            <div className="dark">
              <CardGrid layout="cols-2" card="with-UI" surface="product" items={PRODUCT_ITEMS} />
            </div>
          </CompositionDemo>

          <CompositionDemo
            title="layout='cols-1' · card='with-UI' — editorial full-width"
            desc="At full width the card splits — editorial heading and description beside a large product-UI zone. Best for a short list or a flagship product. Shown on the treatment surface, light and dark."
          >
            <CardGrid
              layout="cols-1"
              card="with-UI"
              surface="treatment"
              items={PRODUCT_ITEMS.slice(0, 3)}
            />
            <div className="dark">
              <CardGrid
                layout="cols-1"
                card="with-UI"
                surface="treatment"
                items={PRODUCT_ITEMS.slice(0, 3)}
              />
            </div>
          </CompositionDemo>
        </div>

        {/* ── SPLITEDITORIAL ────────────────────────────────────────────── */}
        <div id="section-spliteditorial" className="scroll-mt-12">
          <CompositionDemo
            title="SplitEditorial — copy ↔ visual section primitive"
            desc="The core text / visual layout — one primitive at two scales. `standard` is the even 50/50 section split; `hero` is the larger asymmetric 5/7 split with hero-scale typography (it replaces the old, redundant Product Hero Card)."
          >
            <SplitEditorial
              eyebrow="Money movement"
              headline="Move money across rails on one programmable layer"
              body="A single settlement layer beneath every payout, transfer and collection — observable, controllable, and consistent across regions."
              items={[
                "Real-time settlement rails",
                "Multi-currency by default",
                "Programmable movement controls",
              ]}
            />
            <SplitEditorial
              scale="hero"
              eyebrow="Card issuing"
              headline="The issuing platform for modern card programmes"
              body="Launch virtual and physical cards on infrastructure built for scale, observability and control across every region."
              items={[
                "Virtual and physical cards",
                "Multi-currency by default",
                "Programmable spend controls",
              ]}
            />
          </CompositionDemo>
        </div>

        {/* ════ ARTIFACTS ══════════════════════════════════════════════════ */}

        <Container>
          <div className="mt-32 border-t border-surface-border-subtle pt-10 dark:border-surface-dark-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-primary dark:text-accent-cyan">
              Category · 06
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand">
              Artifacts
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              Illustrative product artifacts from{" "}
              <code className="font-mono text-[12px]">components/artifacts/</code> — static visual props (the nCore stack
              diagram, payment card surfaces) that go{" "}
              <em>inside</em> section primitives. Not interactive.
            </p>
          </div>
        </Container>

        {/* ── nCORE STACK ───────────────────────────────────────────────── */}
        <Group
          index="nCore"
          label="nCore stack"
          lede="The nCore platform as a flat, precise systems diagram — the engine is the solid foundation at the base, translucent product layers stack on it, and a cyan data spine threads up through every layer. v5 (2026-05-26) loads the Claude Design handoff SVGs (/handoff/home/ncore-stack-light.svg + ncore-stack-dark.svg) with a slow ambient float — the procedural v4 visual is retired."
        />

        <CompositionDemo
          title="nCore in the editorial split hero"
          desc="The nCore section as it ships — a SplitEditorial at hero scale: the editorial intro on the left, the nCore stack as the visual on the right. The engine grounds the stack; the product layers rise from it. The visual loads /handoff/home/ncore-stack-{light,dark}.svg via dark:hidden / hidden dark:block. Light and dark."
        >
          <SplitEditorial
            scale="hero"
            eyebrow="nCore"
            eyebrowCaps={false}
            headline="The core that powers every NymCard product"
            body="nCore is the programmable infrastructure layer beneath issuing, lending, money movement and settlement — one engine, every product."
            items={[
              "One programmable core",
              "Observable end to end",
              "A new product is configuration, not a rebuild",
            ]}
            visual={<NCoreStack />}
          />
          <div className="dark">
            <SplitEditorial
              scale="hero"
              eyebrow="nCore"
              eyebrowCaps={false}
              headline="The core that powers every NymCard product"
              body="nCore is the programmable infrastructure layer beneath issuing, lending, money movement and settlement — one engine, every product."
              items={[
                "One programmable core",
                "Observable end to end",
                "A new product is configuration, not a rebuild",
              ]}
              visual={<NCoreStack />}
            />
          </div>
        </CompositionDemo>

        {/* ── SIGNATURE MOMENT ──────────────────────────────────────────── */}
        <Group
          index="Signature"
          label="Signature moment — stitched stack → one core"
          lede="The campaign's owned visual (strategy §5): ONE continuous sequence, two phases, shared vocabulary. phase='fragmented' (the FragmentationWeb) is a sprawl of mismatched vendor systems crudely wired together with crossed, taped, precarious seams — the bank's assembled estate, an instant read of a fragmented mess. phase='collapse' RESOLVES that same tangle INTO the original NCoreStack at full presence: the scattered systems converge inward and fade as the clean nCore stack assembles in their place (chaos → order). On the homepage these are two full-presence halves — §3 owns the full-width FragmentationWeb (the pain), §4 presents the full NCoreStack (the answer). COUNT-AGNOSTIC: the tangle derives from one vendors array; the story is 'a sprawl → one core', never 'N → one'. Reuses the InfraIcon family + the NCoreStack. Framer once-on-enter; reduced-motion renders each phase's clean end-state (the settled tangle, or the stack) — no half-empty mid-state. Cool/navy-led, violet as the committed signature accent (§3), never the field; no alarm red."
        />

        <CompositionDemo
          title="FragmentationWeb — the §3 pain (light + dark)"
          desc="The bank's stitched-together estate, made literal: a sprawl of mismatched vendor systems crudely wired together with crossed, bowed, taped, precarious seams — a subset broken (stopping short of the target node). Reads instantly as 'a fragmented, painful mess', never flat cards and never a tidy diagram. Cool-only — the pain reads through tangle, density, mismatch and a heavy tone, NEVER alarm red. Reuses the InfraIcon family so the same vocabulary carries into the §4 NCoreStack answer. COUNT-AGNOSTIC: every node, seam and tape patch derives from one vendors array. On GlassAtmosphere (deep azure) — never a flat bed (§8.1). Cables fade + settle in on enter (a staggered opacity reveal, no pathLength dash artifacts); nodes lift on hover; reduced-motion shows the settled tangle statically."
        >
          <FragmentationWeb className="aspect-[2.1/1]" />
          <div className="dark">
            <div className="rounded-2xl bg-surface-dark-base p-5">
              <FragmentationWeb className="aspect-[2.1/1]" />
            </div>
          </div>
        </CompositionDemo>

        <CompositionDemo
          title="SignatureStitchToCore — both phases, light + dark"
          desc="The two phases side by side: the fragmented tangle (left) and the resolved NCoreStack (right). On the live page they are two full-presence halves across stacked sections — the §3 FragmentationWeb (the pain) and the §4 NCoreStack (the answer), the same vocabulary resolving. The collapse here morphs the converging tangle into the NCoreStack; both sit on GlassAtmosphere over the kinetic ribbon (never glass on a flat bed, §8.1). Scroll-driven; reduced-motion shows these resolved states statically, with no dead mid-state."
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SignatureStitchToCore phase="fragmented" className="aspect-[16/10]" />
            <SignatureStitchToCore phase="collapse" className="aspect-[16/10]" />
          </div>
          <div className="dark">
            <div className="grid grid-cols-1 gap-5 rounded-2xl bg-surface-dark-base p-5 lg:grid-cols-2">
              <SignatureStitchToCore phase="fragmented" className="aspect-[16/10]" />
              <SignatureStitchToCore phase="collapse" className="aspect-[16/10]" />
            </div>
          </div>
        </CompositionDemo>

        {/* ── CARD SURFACE VARIANTS ─────────────────────────────────────── */}
        <Group
          index="Surfaces"
          label="Card surface systems"
          lede="The payment-card artifact — the foundational primitive. Horizontal / vertical, light / dark, two corner-graphic treatments. Composed into product cards and hero surfaces across the site."
        />

        <CompositionDemo
          title="PaymentCard — the foundational artifact"
          desc="A premium, programmable, infrastructural surface: a tonal field, an abstract chip-module, a cool ribbon-derived sheen and mono micro-labels. The corner graphic is either a restrained topology fragment or an integrated ribbon slice — both shown. Horizontal and vertical, light and dark."
        >
          <div className="relative overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft p-8 sm:p-12">
            <KineticRibbon intensity="calm" focus="top-right" />
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-8">
              <PaymentCard
                orientation="horizontal"
                tone="dark"
                label="credit"
                network="visa"
                className="w-full max-w-[360px]"
              />
              <PaymentCard
                orientation="vertical"
                tone="dark"
                label="corporate"
                className="w-[227px]"
              />
              <PaymentCard
                orientation="horizontal"
                tone="light"
                label="virtual issuing"
                className="w-full max-w-[360px]"
              />
              <PaymentCard
                orientation="horizontal"
                tone="dark"
                label="credit"
                graphic="ribbon"
                className="w-full max-w-[360px]"
              />
              <PaymentCard
                orientation="horizontal"
                tone="light"
                label="credit"
                graphic="ribbon"
                className="w-full max-w-[360px]"
              />
            </div>
          </div>
        </CompositionDemo>

      </main>
    </div>
  );
}
