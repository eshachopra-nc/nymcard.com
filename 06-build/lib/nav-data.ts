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
  CalendarClock,
  Globe2,
  Send,
  Wallet,
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
    type: 'platform' | 'products' | 'industries' | 'company' | 'solutions'
    items?: DropdownItem[]
    leftLabel?: string
    leftItems?: SimpleItem[]
    rightLabel?: string
    rightItems?: SimpleItem[]
    // For type === 'solutions' — two product-card grids stacked vertically:
    // "By Use Case" on top, "By Industry" below.
    useCaseLabel?: string
    useCaseItems?: ProductItem[]
    industryLabel?: string
    industryItems?: ProductItem[]
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
   2. PRODUCTS — 6 items, 3×2 grid. The six products on nCore
   per architecture.md (Identity, Fraud Monitoring, ACS / 3DS,
   and Risk Management are capabilities inside Financial Crime,
   not standalone products — per Lending copy v3).
═══════════════════════════════════════════════════════ */
const productItems: ProductItem[] = [
  {
    kind: 'product',
    id: 'card-issuing',
    label: 'Card Issuing',
    description: 'Debit, credit, and prepaid cards',
    href: '/products/card-issuing',
    icon: CreditCard,
  },
  {
    kind: 'product',
    id: 'lending',
    label: 'Lending',
    description: 'BNPL, installment, and revolving credit',
    href: '/products/lending',
    icon: TrendingUp,
  },
  {
    kind: 'product',
    id: 'money-movement',
    label: 'Money Movement',
    description: 'Cross-border payments, FX, and corridors',
    href: '/products/money-movement',
    icon: ArrowLeftRight,
  },
  {
    kind: 'product',
    id: 'settlement',
    label: 'Settlement',
    description: 'Bank-grade stablecoin settlement',
    href: '/products/settlement',
    icon: Layers,
  },
  {
    kind: 'product',
    id: 'financial-crime',
    label: 'Financial Crime',
    description: 'KYC, AML, 3D Secure, and fraud monitoring',
    href: '/products/financial-crime',
    icon: ShieldAlert,
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
   3. INDUSTRIES — 11 items, 4×3 grid (same card as Products)
═══════════════════════════════════════════════════════ */
const industryItems: ProductItem[] = [
  { kind: 'product', id: 'commercial-banking',  label: 'Commercial Banking',   description: 'SME and corporate payments',          href: '/industries/commercial-banking',  icon: Building2    },
  { kind: 'product', id: 'retail-banking',       label: 'Retail Banking',       description: 'Digital banking capabilities',        href: '/industries/retail-banking',      icon: Home         },
  { kind: 'product', id: 'neobanks',             label: 'Neobanks',             description: 'Full digital bank, API-first',         href: '/industries/neobanks',            icon: Wallet       },
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
   3b. SOLUTIONS — Use Cases (7 items, outcome-led) — mirrors
   the homepage Solutions / Use Cases section. Pairs with
   industryItems above.
═══════════════════════════════════════════════════════ */
const useCaseItems: ProductItem[] = [
  { kind: 'product', id: 'commercial-payments', label: 'Run a commercial card programme', description: 'SME and corporate cards, with Visa',           href: '/solutions/commercial-payments', icon: Building2     },
  { kind: 'product', id: 'launch-a-bank',       label: 'Launch a bank',                   description: 'Accounts, cards, payments, ledger',            href: '/solutions/launch-a-bank',       icon: Landmark      },
  { kind: 'product', id: 'embedded-finance',    label: 'Embed financial products',        description: 'Cards & credit inside your product',           href: '/solutions/embedded-finance',    icon: Layers        },
  { kind: 'product', id: 'buy-now-pay-later',   label: 'Offer buy now, pay later',        description: 'Decisioning and servicing at checkout',         href: '/solutions/buy-now-pay-later',   icon: CalendarClock },
  { kind: 'product', id: 'disbursements',       label: 'Disburse at scale',               description: 'Payouts to suppliers, gig workers, payroll',    href: '/solutions/disbursements',       icon: Send          },
  { kind: 'product', id: 'remittances',         label: 'Power remittances',               description: 'Cross-border send-and-receive across MEA',      href: '/solutions/remittances',         icon: Globe2        },
  { kind: 'product', id: 'mobile-wallet',       label: 'Launch a mobile wallet',          description: 'Consumer or agent-led wallets, P2P and CICO',   href: '/solutions/mobile-wallet',       icon: Wallet        },
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
   FULL NAV CONFIG — Platform · Products · Solutions · Company
   "Solutions" replaces the standalone "Industries" entry; its
   dropdown stacks "By Use Case" on top and "By Industry" below.
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
    id: 'solutions',
    label: 'Solutions',
    dropdown: {
      type: 'solutions',
      useCaseLabel: 'By Use Case',
      useCaseItems,
      industryLabel: 'By Industry',
      industryItems,
    },
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
