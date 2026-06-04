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
  Heart,
  Users,
  Briefcase,
  MessageSquare,
  Megaphone,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { DOCS_URL, API_CATALOG_URL } from './external-links'

/* ─── ITEM SHAPES ──────────────────────────────────────── */

export interface ProductItem {
  kind: 'product'
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
  /** Opens off-site in a new tab (target=_blank rel=noopener). */
  external?: boolean
}

export interface SimpleItem {
  kind: 'simple'
  id: string
  label: string
  description: string
  href: string
  icon: LucideIcon
  /** Opens off-site in a new tab (target=_blank rel=noopener). */
  external?: boolean
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
    label: 'Migration',
    description: 'Modernise legacy infrastructure',
    href: '/platform/migration',
    icon: Zap,
  },
  {
    kind: 'product',
    id: 'documentation',
    label: 'Documentation',
    description: 'Guides, references, and SDKs',
    href: DOCS_URL,
    icon: BookOpen,
    external: true,
  },
  {
    kind: 'product',
    id: 'api-catalog',
    label: 'API Catalog',
    description: 'Browse the API specifications',
    href: API_CATALOG_URL,
    icon: Code2,
    external: true,
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
export const industryItems: ProductItem[] = [
  { kind: 'product', id: 'commercial-banking',  label: 'Commercial Banking',   description: 'SME and corporate payments',          href: '/solutions/commercial-banking',  icon: Building2    },
  { kind: 'product', id: 'retail-banking',       label: 'Retail Banking',       description: 'Digital banking capabilities',        href: '/solutions/retail-banking',      icon: Home         },
  { kind: 'product', id: 'exchange-houses',      label: 'Exchange Houses',      description: 'Cross-border payment infrastructure', href: '/solutions/exchange-houses',     icon: Shield       },
  { kind: 'product', id: 'fintechs',             label: 'Fintechs',             description: 'Launch regulated payment products',   href: '/solutions/fintechs',            icon: Zap          },
  { kind: 'product', id: 'telecommunications',  label: 'Telecommunications',   description: 'Embedded financial experiences',      href: '/solutions/telecommunications',  icon: Phone        },
  { kind: 'product', id: 'retail-marketplaces', label: 'Retail & Marketplaces', description: 'Cards, credit, and payouts',         href: '/solutions/retail-marketplaces', icon: ShoppingCart },
  { kind: 'product', id: 'healthcare',          label: 'Healthcare',           description: 'Patient and provider payments',       href: '/solutions/healthcare',          icon: Heart        },
  { kind: 'product', id: 'government',          label: 'Government',           description: 'Disbursement and payment systems',    href: '/solutions/government',          icon: Landmark     },
]

/* ═══════════════════════════════════════════════════════
   3b. SOLUTIONS — By Use Case (4 built pages, outcome-led).
   Pairs with industryItems above to form the two-section
   "Solutions" dropdown (By Use Case / By Industry). Labels +
   slugs mirror the use-case copy files in ../02-copy/usecase-*.md.
   NOTE: "Digital Banking" is the nav label for the Banking-as-a-
   Service page (slug stays /solutions/banking-as-a-service for SEO).
═══════════════════════════════════════════════════════ */
const useCaseItems: ProductItem[] = [
  { kind: 'product', id: 'digital-banking',     label: 'Digital Banking',     description: 'Launch a bank on nCore',       href: '/solutions/banking-as-a-service', icon: Landmark  },
  { kind: 'product', id: 'embedded-finance',    label: 'Embedded Finance',    description: 'Launch financial experiences', href: '/solutions/embedded-finance',     icon: Layers    },
  { kind: 'product', id: 'digital-wallets',     label: 'Digital Wallets',     description: 'Move, store, and spend',       href: '/solutions/digital-wallets',      icon: Wallet    },
  { kind: 'product', id: 'commercial-payments', label: 'Commercial Payments', description: 'Power business finance',       href: '/solutions/commercial-payments',  icon: Building2 },
]

/* ═══════════════════════════════════════════════════════
   4. COMPANY — Company (About · Careers · Contact) | Insights (Blog · Newsroom)
═══════════════════════════════════════════════════════ */
const companyLeftItems: SimpleItem[] = [
  { kind: 'simple', id: 'about',   label: 'About',   description: 'Our story and mission',  href: '/company/about',   icon: Users         },
  { kind: 'simple', id: 'careers', label: 'Careers', description: 'Join the team',           href: '/company/careers', icon: Briefcase     },
  { kind: 'simple', id: 'contact', label: 'Contact', description: 'Talk to the team',        href: '/company/contact', icon: MessageSquare },
]

const companyRightItems: SimpleItem[] = [
  { kind: 'simple', id: 'blog',      label: 'Blog',      description: 'Payments insights',        href: '/company/blog',      icon: BookOpen  },
  { kind: 'simple', id: 'newsroom',  label: 'Newsroom',  description: 'Press and media coverage', href: '/company/newsroom',  icon: Megaphone },
]

/* ═══════════════════════════════════════════════════════
   FULL NAV CONFIG — Platform · Products · Solutions · Company
   Top-level mirrors ../02-copy/Navigation.md. "Solutions" is now a
   two-section dropdown (mirroring Company): "By Use Case" (the 4
   built use-case pages) over "By Industry" (the 8 live industry
   pages). The use-case routes now exist, so they are live in the nav.
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
