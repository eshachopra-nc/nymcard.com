import {
  Cpu,
  Zap,
  BookOpen,
  Code2,
  CreditCard,
  TrendingUp,
  ArrowLeftRight,
  Building2,
  Layers,
  ShieldAlert,
  ShieldCheck,
  Gauge,
  Fingerprint,
  FileCheck2,
  Landmark,
  Home,
  Shield,
  Phone,
  ShoppingCart,
  Plane,
  Heart,
  Car,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  Megaphone,
  type LucideIcon,
} from 'lucide-react'

/* ─── ITEM SHAPES ──────────────────────────────────────── */

export interface ProductItem {
  kind: 'product'
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
}

export interface SimpleItem {
  kind: 'simple'
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
}

export type DropdownItem = ProductItem | SimpleItem

/* ─── NAV ITEM CONFIG ──────────────────────────────────── */

export interface NavItemConfig {
  id: string
  label: string
  href?: string
  dropdown?: {
    type: 'platform' | 'products' | 'industries' | 'company'
    items?: DropdownItem[]
    leftLabel?: string
    leftItems?: SimpleItem[]
    rightLabel?: string
    rightItems?: SimpleItem[]
  }
}

/* ═══════════════════════════════════════════════════════
   1. PLATFORM — 4 items, 1×4 row
═══════════════════════════════════════════════════════ */
const platformItems: ProductItem[] = [
  {
    kind: 'product',
    id: 'ncore',
    label: 'nCore',
    description: 'Full-stack payments infrastructure',
    href: '/platform/ncore',
    icon: Cpu,
  },
  {
    kind: 'product',
    id: 'agentic-ai',
    label: 'Agentic AI Migration',
    description: 'Modernise legacy infrastructure',
    href: '/platform/ai-migration',
    icon: Zap,
  },
  {
    kind: 'product',
    id: 'documentation',
    label: 'Documentation',
    description: 'Read the developer documentation',
    href: '/developers/guides',
    icon: BookOpen,
  },
  {
    kind: 'product',
    id: 'api-reference',
    label: 'API Reference',
    description: 'REST APIs and SDKs',
    href: '/developers/api',
    icon: Code2,
  },
]

/* ═══════════════════════════════════════════════════════
   2. PRODUCTS — 9 items, 3×3 grid
═══════════════════════════════════════════════════════ */
const productItems: ProductItem[] = [
  {
    kind: 'product',
    id: 'cards',
    label: 'Cards',
    description: 'Debit, credit, prepaid cards',
    href: '/products/cards',
    icon: CreditCard,
  },
  {
    kind: 'product',
    id: 'money-movement',
    label: 'Cross-Border & FX',
    description: 'Domestic and cross-border payments',
    href: '/products/money-movement',
    icon: ArrowLeftRight,
  },
  {
    kind: 'product',
    id: 'embedded-lending',
    label: 'Lending',
    description: 'Decisioning and servicing infrastructure',
    href: '/products/embedded-lending',
    icon: TrendingUp,
  },
  {
    kind: 'product',
    id: 'identity',
    label: 'Identity',
    description: 'KYC, KYB, identity verification',
    href: '/products/identity',
    icon: Fingerprint,
  },
  {
    kind: 'product',
    id: 'fraud-monitoring',
    label: 'Fraud Monitoring',
    description: 'Real-time transaction screening',
    href: '/products/fraud-monitoring',
    icon: ShieldAlert,
  },
  {
    kind: 'product',
    id: 'risk-management',
    label: 'Risk Management',
    description: 'Portfolio risk scoring and limits',
    href: '/products/risk-management',
    icon: Gauge,
  },
  {
    kind: 'product',
    id: 'acs-3ds',
    label: 'ACS / 3DS',
    description: 'Issuer authentication and 3D Secure',
    href: '/products/acs-3ds',
    icon: ShieldCheck,
  },
  {
    kind: 'product',
    id: 'stablecoin-settlement',
    label: 'Stablecoin Settlement',
    description: '24/7 digital asset settlement',
    href: '/products/stablecoin-settlement',
    icon: Layers,
  },
  {
    kind: 'product',
    id: 'reconciliation',
    label: 'Reconciliation',
    description: 'Automated payment reconciliation',
    href: '/products/reconciliation',
    icon: FileCheck2,
  },
]

/* ═══════════════════════════════════════════════════════
   3. INDUSTRIES — 10 items, 5×2 grid (same card as Products)
═══════════════════════════════════════════════════════ */
const industryItems: ProductItem[] = [
  { kind: 'product', id: 'commercial-banking',  label: 'Commercial Banking',   description: 'SME and corporate payments',          href: '/industries/commercial-banking',  icon: Building2    },
  { kind: 'product', id: 'retail-banking',       label: 'Retail Banking',       description: 'Digital banking capabilities',        href: '/industries/retail-banking',      icon: Home         },
  { kind: 'product', id: 'exchange-houses',      label: 'Exchange Houses',      description: 'Cross-border payment infrastructure', href: '/industries/exchange-houses',     icon: Shield       },
  { kind: 'product', id: 'fintechs',             label: 'Fintechs',             description: 'Launch regulated payment products',   href: '/industries/fintechs',            icon: Zap          },
  { kind: 'product', id: 'telecommunications',  label: 'Telecommunications',   description: 'Embedded financial experiences',      href: '/industries/telecommunications',  icon: Phone        },
  { kind: 'product', id: 'retail-marketplaces', label: 'Retail & Marketplaces', description: 'Cards, credit, and payouts',         href: '/industries/retail-marketplaces', icon: ShoppingCart },
  { kind: 'product', id: 'travel',              label: 'Travel',               description: 'Multi-currency payment flows',        href: '/industries/travel',              icon: Plane        },
  { kind: 'product', id: 'healthcare',          label: 'Healthcare',           description: 'Patient and provider payments',       href: '/industries/healthcare',          icon: Heart        },
  { kind: 'product', id: 'government',          label: 'Government',           description: 'Disbursement and payment systems',    href: '/industries/government',          icon: Landmark     },
  { kind: 'product', id: 'mobility',            label: 'Mobility',             description: 'Payments for transport ecosystems',   href: '/industries/mobility',            icon: Car          },
]

/* ═══════════════════════════════════════════════════════
   4. COMPANY — 2 rows of 3 cards: Company | Insights
═══════════════════════════════════════════════════════ */
const companyLeftItems: SimpleItem[] = [
  { kind: 'simple', id: 'about',   label: 'About',   description: 'Our story and mission',  href: '/company/about',   icon: Users         },
  { kind: 'simple', id: 'careers', label: 'Careers', description: 'Join the team',           href: '/company/careers', icon: Briefcase     },
  { kind: 'simple', id: 'contact', label: 'Contact', description: 'Talk to the team',        href: '/company/contact', icon: MessageSquare },
]

const companyRightItems: SimpleItem[] = [
  { kind: 'simple', id: 'resources', label: 'Resources', description: 'Reports and research',    href: '/company/resources', icon: FileText  },
  { kind: 'simple', id: 'blog',      label: 'Blog',      description: 'Payments insights',        href: '/company/blog',      icon: BookOpen  },
  { kind: 'simple', id: 'newsroom',  label: 'Newsroom',  description: 'Press and media coverage', href: '/company/newsroom',  icon: Megaphone },
]

/* ═══════════════════════════════════════════════════════
   FULL NAV CONFIG — Platform · Products · Industries · Company
═══════════════════════════════════════════════════════ */
export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'platform',
    label: 'Platform',
    dropdown: { type: 'platform', items: platformItems },
  },
  {
    id: 'products',
    label: 'Products',
    dropdown: { type: 'products', items: productItems },
  },
  {
    id: 'industries',
    label: 'Industries',
    dropdown: { type: 'industries', items: industryItems },
  },
  {
    id: 'company',
    label: 'Company',
    dropdown: {
      type: 'company',
      leftLabel:  'Company',
      leftItems:  companyLeftItems,
      rightLabel: 'Insights',
      rightItems: companyRightItems,
    },
  },
]
