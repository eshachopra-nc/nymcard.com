'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import {
  NAV_ITEMS,
  type NavItemConfig,
  type ProductItem,
  type SimpleItem,
  type DropdownItem,
} from '@/lib/nav-data'
import { useTheme } from '@/lib/theme-provider'
import { ThemeToggle } from './ThemeToggle'

/* ═══════════════════════════════════════════════════════
   NAV ICON — brand-gradient filled chip (white glyph)
   design-system.md §3: iconography uses brand colours, not accents —
   brand-primary → brand-purple. A filled chip (not an outline stroke) so the
   icons read as solid gradient marks, matching the contact-page routes.
═══════════════════════════════════════════════════════ */
function NavIcon({
  icon: Icon,
  size = 14,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  size?: number
}) {
  const box = size + 10
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-brand-primary to-brand-purple text-white shadow-[0_3px_8px_-3px_rgba(48,77,187,0.5)]"
      style={{ width: box, height: box }}
    >
      <Icon size={size} strokeWidth={2} className="text-white" />
    </span>
  )
}

/* ═══════════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════════ */
// One card link, internal (`next/link`) or external (`<a target=_blank>`).
function CardLink({
  href,
  external,
  className,
  onClick,
  children,
}: {
  href: string
  external?: boolean
  className: string
  onClick?: () => void
  children: React.ReactNode
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}

function ProductCard({ item }: { item: ProductItem }) {
  const Icon = item.icon
  return (
    <CardLink
      href={item.href}
      external={item.external}
      className="dd-card flex flex-col gap-[5px] p-[14px_16px] rounded-[8px] border border-[#E8EAED] bg-white no-underline dark:border-surface-dark-border dark:bg-surface-dark-elevated"
    >
      <div className="flex items-center gap-[8px]">
        <NavIcon icon={Icon} size={14} />
        <span className="text-[13px] font-[600] text-[#0A0A0A] leading-snug tracking-[-0.01em] dark:text-white">
          {item.label}
        </span>
      </div>
      <p className="m-0 text-[12px] font-normal text-[#6B7280] leading-[1.4] dark:text-white/60">
        {item.description}
      </p>
    </CardLink>
  )
}

/* ═══════════════════════════════════════════════════════
   SIMPLE CARD
═══════════════════════════════════════════════════════ */
function SimpleCard({ item }: { item: SimpleItem }) {
  const Icon = item.icon
  return (
    <CardLink
      href={item.href}
      external={item.external}
      className="dd-card flex flex-col gap-[5px] p-[14px_16px] rounded-[8px] border border-[#E8EAED] bg-white no-underline dark:border-surface-dark-border dark:bg-surface-dark-elevated"
    >
      <div className="flex items-center gap-[8px]">
        <NavIcon icon={Icon} size={14} />
        <span className="text-[13px] font-[600] text-[#0A0A0A] leading-snug tracking-[-0.01em] dark:text-white">
          {item.label}
        </span>
      </div>
      <p className="m-0 text-[12px] font-normal text-[#6B7280] leading-[1.4] dark:text-white/60">
        {item.description}
      </p>
    </CardLink>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-[600] tracking-[0.1em] uppercase text-[#6B7280] px-1 mb-[10px] dark:text-white/50">
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   DROPDOWN CONTENT — grids only, rendered inside the nav card
═══════════════════════════════════════════════════════ */
function DropdownContent({ item }: { item: NavItemConfig }) {
  const dd = item.dropdown!
  return (
    <>
      {dd.type === 'platform' && dd.items && (
        <div className="grid grid-cols-4 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}

      {dd.type === 'products' && dd.items && (
        <div className="grid grid-cols-3 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}

      {dd.type === 'industries' && dd.items && (
        <div className="grid grid-cols-4 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}

      {dd.type === 'solutions' && (
        <div className="flex flex-col gap-5">
          <div>
            <SectionLabel>{dd.useCaseLabel}</SectionLabel>
            <div className="grid grid-cols-4 gap-2">
              {dd.useCaseItems?.map(p => <ProductCard key={p.id} item={p} />)}
            </div>
          </div>
          <div>
            <SectionLabel>{dd.industryLabel}</SectionLabel>
            <div className="grid grid-cols-4 gap-2">
              {dd.industryItems?.map(p => <ProductCard key={p.id} item={p} />)}
            </div>
          </div>
        </div>
      )}

      {dd.type === 'company' && (
        <div className="flex flex-col gap-4">
          <div>
            <SectionLabel>{dd.leftLabel}</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {dd.leftItems?.map(l => <SimpleCard key={l.id} item={l} />)}
            </div>
          </div>
          <div>
            <SectionLabel>{dd.rightLabel}</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {dd.rightItems?.map(r => <SimpleCard key={r.id} item={r} />)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */

const NAV_HEIGHT = 76 // pt-2 (8) + h-[68px] (68)

/* ═══════════════════════════════════════════════════════
   MOBILE MENU — full nav collapsed behind a hamburger (<lg)
═══════════════════════════════════════════════════════ */
function itemsForMobile(item: NavItemConfig): DropdownItem[] {
  const dd = item.dropdown
  if (!dd) return []
  if (dd.type === 'company') return [...(dd.leftItems ?? []), ...(dd.rightItems ?? [])]
  if (dd.type === 'solutions') return [...(dd.useCaseItems ?? []), ...(dd.industryItems ?? [])]
  return dd.items ?? []
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="flex flex-col gap-6 px-6 pb-8 pt-1">
      {NAV_ITEMS.map((item) => {
        const items = itemsForMobile(item)
        return (
          <div key={item.id}>
            <div className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280] dark:text-white/50">
              {item.label}
            </div>
            <div className="flex flex-col">
              {items.map((it) => {
                const Icon = it.icon
                return (
                  <CardLink
                    key={it.id}
                    href={it.href}
                    external={it.external}
                    onClick={onNavigate}
                    className="flex items-start gap-3 rounded-[10px] px-2 py-2.5 no-underline transition-colors hover:bg-[rgba(48,77,187,0.05)] dark:hover:bg-white/[0.06]"
                  >
                    <NavIcon icon={Icon} size={16} />
                    <span className="flex flex-col">
                      <span className="text-[15px] font-semibold leading-snug text-[#0A0A0A] dark:text-white">
                        {it.label}
                      </span>
                      <span className="text-[13px] leading-snug text-[#6B7280] dark:text-white/60">
                        {it.description}
                      </span>
                    </span>
                  </CardLink>
                )
              })}
            </div>
          </div>
        )
      })}
      <Link
        href="/company/contact"
        onClick={onNavigate}
        className="mt-1 inline-flex items-center justify-center rounded-button bg-brand-navy px-5 py-3 text-sm font-medium text-white no-underline dark:bg-accent-cyan dark:text-brand-navy"
      >
        Talk to us
      </Link>
    </nav>
  )
}

export function Navbar({ bannerHeight = 0 }: { bannerHeight?: number }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // When an alert banner sits above the nav, the nav starts below it and
  // rides up as the banner scrolls away, pinning to the top once it's gone.
  const [navTop, setNavTop]         = useState(bannerHeight)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      const next = bannerHeight > 0 ? Math.max(0, bannerHeight - y) : 0
      setNavTop((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [bannerHeight])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('header')) {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  // Close the mobile menu once the viewport reaches the desktop nav (lg).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const openMenu     = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(id)
  }, [])
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 80)
  }, [])
  const cancelClose   = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const activeItem = NAV_ITEMS.find(n => n.id === activeMenu) ?? null
  const isOpen     = activeMenu !== null

  /*
   * Transparent at rest (top of page, no menu open).
   * Glass + Tier 3 shadow only when the user has scrolled >20px OR a menu is open.
   * Explicit transparent-state values ensure clean CSS transitions on every property.
   */
  const isMaterial = isOpen || scrolled || mobileOpen

  const cardStyle: React.CSSProperties = isMaterial
    ? {
        background:           isDark ? 'rgba(20,29,54,0.72)' : 'rgba(255,255,255,0.7)',
        backdropFilter:       'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border:               isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.8)',
        borderRadius:         16,
        boxShadow: isOpen
          ? /* Expanded — deep Tier 3 to make glass pop over hero */
            (isDark
              ? '0 8px 24px rgba(0,0,0,0.40), 0 24px 64px rgba(0,0,0,0.50), ' +
                '0 48px 128px rgba(34,211,238,0.10), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 8px 24px rgba(14,26,51,0.10), 0 24px 64px rgba(14,26,51,0.14), ' +
                '0 48px 128px rgba(48,77,187,0.18), inset 0 1px 0 rgba(255,255,255,0.9)')
          : /* Scrolled only — soft lift */
            (isDark
              ? '0 2px 8px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.35)'
              : '0 2px 8px rgba(14,26,51,0.04), 0 8px 24px rgba(14,26,51,0.06)'),
      }
    : {
        background:           'transparent',
        backdropFilter:       'none',
        WebkitBackdropFilter: 'none',
        border:               '1px solid transparent',
        borderRadius:         16,
        boxShadow:            'none',
      }

  return (
    /*
     * Fixed — zero height in the document flow.
     * Hero (and all sections) start at y=0, the hero gradient fills the area
     * behind the transparent resting nav so there is no colour discontinuity.
     * The visual card is position: absolute inside the fixed header and grows
     * freely downward when a dropdown is open without shifting any page content.
     */
    <header style={{ position: 'fixed', top: navTop, left: 0, right: 0, zIndex: 999, overflow: 'visible' }}>
      {/* No flow spacer — HeroSection paddingTop handles the clearance */}

      <div
        style={{
          position:   'absolute',
          top:        8,
          left:       0,
          right:      0,
          maxWidth:   1280,
          margin:     '0 auto',
          transition: 'background 200ms, backdrop-filter 200ms, box-shadow 200ms, border-color 200ms, border-radius 200ms',
          ...cardStyle,
        }}
        onMouseLeave={scheduleClose}
      >
        {/* ── Nav bar row ── */}
        <div className="px-6 h-[68px] flex items-center justify-between">

          <Link href="/" className="flex items-center flex-shrink-0 z-10" aria-label="NymCard">
            <Image
              src="/images/shared/logo/nymcard-logo-full.svg"
              alt="NymCard"
              width={130}
              height={18}
              priority
              className="h-[20px] w-auto dark:brightness-0 dark:invert"
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex" aria-label="Main">
            {NAV_ITEMS.map(navItem => (
              <div key={navItem.id} onMouseEnter={() => openMenu(navItem.id)}>
                <button
                  aria-haspopup="true"
                  aria-expanded={activeMenu === navItem.id}
                  className={`
                    inline-flex items-center gap-[3px] px-[13px] py-[7px] rounded-[8px]
                    text-[14px] font-[500] border-none bg-transparent cursor-pointer font-sans
                    transition-colors duration-[80ms] whitespace-nowrap
                    ${activeMenu === navItem.id
                      ? 'text-[#304DBB] bg-[rgba(48,77,187,0.05)] dark:text-accent-cyan dark:bg-white/[0.07]'
                      : 'text-[#0A0A0A] hover:text-[#304DBB] hover:bg-[rgba(48,77,187,0.05)] dark:text-white/90 dark:hover:text-accent-cyan dark:hover:bg-white/[0.07]'}
                  `}
                >
                  {navItem.label}
                  <ChevronDown
                    size={12}
                    strokeWidth={1.75}
                    className={`flex-shrink-0 transition-transform duration-[100ms] ${
                      activeMenu === navItem.id
                        ? 'rotate-180 text-[#304DBB] dark:text-accent-cyan'
                        : 'text-[#9CA3AF] dark:text-white/50'
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>

          {/* Nav-bar CTA — uses radius-button (20px) per design-system §5.
              All CTAs across the site share this radius regardless of size;
              navigation buttons and dropdown items use smaller radii since
              they are not CTAs. Solid brand-navy fill with white text and
              opacity hover, per §8.9. */}
          <div className="z-10 flex flex-shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link
              href="/company/contact"
              className="hidden items-center rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white no-underline transition-all duration-150 hover:-translate-y-px hover:shadow-[var(--shadow-lift)] sm:inline-flex dark:bg-accent-cyan dark:text-brand-navy dark:hover:shadow-[var(--shadow-dark-lift)]"
            >
              Talk to us
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-[8px] text-[#0A0A0A] transition-colors hover:bg-[rgba(48,77,187,0.05)] lg:hidden dark:text-white dark:hover:bg-white/[0.07]"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        {/* ── Dropdown — inside the SAME card, no layout shift ── */}
        <div onMouseEnter={cancelClose}>
          <AnimatePresence mode="wait">
            {activeItem?.dropdown && (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 pb-5"
              >
                <DropdownContent item={activeItem} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile menu — full nav collapsed behind the hamburger (<lg) ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[calc(100vh-96px)] overflow-y-auto lg:hidden"
            >
              <MobileMenu onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}
