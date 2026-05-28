import { Navbar } from "@/components/sections/Navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";

// ── (site) layout — site-wide chrome ───────────────────────────────────────
//
// Owns the Navbar and the page rails (Stripe / Linear visual-continuity
// pattern). Wraps every public-facing route. Routes that don't belong on the
// marketing site (e.g. /studio) live outside this group and therefore don't
// inherit the Navbar overlay.
//
// MotionProvider sets reducedMotion="user" as the site-wide motion safety
// net so prefers-reduced-motion is respected even if a component forgets to
// guard its own animation.

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      {/* Page rails — Stripe / Linear visual-continuity pattern. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="mx-auto h-full max-w-7xl relative">
          <div className="absolute inset-y-0 left-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
          <div className="absolute inset-y-0 right-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
          <div className="absolute left-0 right-0 top-[88px] h-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
        </div>
      </div>

      <Navbar />
      {children}
    </MotionProvider>
  );
}
