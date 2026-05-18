'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  NAV_ITEMS,
  type NavItemConfig,
  type ProductItem,
  type SimpleItem,
} from '@/lib/nav-data'

/* ═══════════════════════════════════════════════════════
   SHARED GRADIENT DEF
═══════════════════════════════════════════════════════ */
function IconGradientDef() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        {/* CTA-echo palette per design-system.md §3 (brand colours only —
            "Iconography uses brand colours, not accents"): brand-primary → brand-purple. */}
        <linearGradient id="nc-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#304DBB" />
          <stop offset="100%" stopColor="#5B4FD9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════════ */
function ProductCard({ item }: { item: ProductItem }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className="dd-card flex flex-col gap-[5px] p-[14px_16px] rounded-[10px] border border-[#E8EAED] bg-white no-underline"
    >
      <div className="flex items-center gap-[8px]">
        <Icon size={16} strokeWidth={1.5} style={{ stroke: 'url(#nc-icon-grad)', flexShrink: 0 } as React.CSSProperties} />
        <span className="text-[13px] font-[600] text-[#0A0A0A] leading-snug tracking-[-0.01em]">
          {item.label}
        </span>
      </div>
      <p className="m-0 text-[12px] font-normal text-[#6B7280] leading-[1.4]">
        {item.description}
      </p>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════
   SIMPLE CARD
═══════════════════════════════════════════════════════ */
function SimpleCard({ item }: { item: SimpleItem }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className="dd-card flex flex-col gap-[5px] p-[14px_16px] rounded-[10px] border border-[#E8EAED] bg-white no-underline"
    >
      <div className="flex items-center gap-[8px]">
        <Icon size={16} strokeWidth={1.5} style={{ stroke: 'url(#nc-icon-grad)', flexShrink: 0 } as React.CSSProperties} />
        <span className="text-[13px] font-[600] text-[#0A0A0A] leading-snug tracking-[-0.01em]">
          {item.label}
        </span>
      </div>
      <p className="m-0 text-[12px] font-normal text-[#6B7280] leading-[1.4]">
        {item.description}
      </p>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-[600] tracking-[0.1em] uppercase text-[#6B7280] px-1 mb-[10px]">
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
      <IconGradientDef />

      {dd.type === 'platform' && dd.items && (
        <div className="grid grid-cols-4 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}

      {dd.type === 'products' && dd.items && (
        <div className="grid grid-cols-4 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}

      {dd.type === 'industries' && dd.items && (
        <div className="grid grid-cols-5 gap-2">
          {(dd.items as ProductItem[]).map(p => <ProductCard key={p.id} item={p} />)}
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

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled]     = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('header')) setActiveMenu(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
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
  const isMaterial = isOpen || scrolled

  const cardStyle: React.CSSProperties = isMaterial
    ? {
        background:           'rgba(255,255,255,0.7)',
        backdropFilter:       'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border:               '1px solid rgba(255,255,255,0.8)',
        borderRadius:         16,
        boxShadow: isOpen
          ? /* Expanded — deep Tier 3 to make glass pop over hero */
            '0 8px 24px rgba(14,26,51,0.10), ' +
            '0 24px 64px rgba(14,26,51,0.14), ' +
            '0 48px 128px rgba(48,77,187,0.18), ' +
            'inset 0 1px 0 rgba(255,255,255,0.9)'
          : /* Scrolled only — soft lift */
            '0 2px 8px rgba(14,26,51,0.04), ' +
            '0 8px 24px rgba(14,26,51,0.06)',
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
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, overflow: 'visible' }}>
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
              className="h-[20px] w-auto"
            />
          </Link>

          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center" aria-label="Main">
            {NAV_ITEMS.map(navItem => (
              <div key={navItem.id} onMouseEnter={() => openMenu(navItem.id)}>
                <button
                  aria-haspopup="true"
                  aria-expanded={activeMenu === navItem.id}
                  className={`
                    inline-flex items-center gap-[3px] px-[13px] py-[7px] rounded-[7px]
                    text-[14px] font-[500] border-none bg-transparent cursor-pointer font-sans
                    transition-colors duration-[80ms] whitespace-nowrap
                    ${activeMenu === navItem.id
                      ? 'text-[#304DBB] bg-[rgba(48,77,187,0.05)]'
                      : 'text-[#0A0A0A] hover:text-[#304DBB] hover:bg-[rgba(48,77,187,0.05)]'}
                  `}
                >
                  {navItem.label}
                  <ChevronDown
                    size={12}
                    strokeWidth={1.75}
                    className={`flex-shrink-0 transition-transform duration-[100ms] ${
                      activeMenu === navItem.id ? 'rotate-180 text-[#304DBB]' : 'text-[#9CA3AF]'
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center px-[18px] py-[8px] rounded-[24px] text-[13.5px] font-[500] text-white no-underline border-none cursor-pointer flex-shrink-0 z-10 transition-[transform,box-shadow] duration-[200ms] hover:-translate-y-[1px] hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #0E1A33 0%, #304DBB 100%)',
              boxShadow:  '0 2px 8px rgba(14,26,51,0.20)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(48,77,187,0.35)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(14,26,51,0.20)' }}
          >
            Talk to Sales
          </Link>
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

      </div>
    </header>
  )
}
