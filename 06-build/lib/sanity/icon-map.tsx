import {
  ArrowLeftRight,
  Building2,
  CreditCard,
  FileCheck2,
  Globe,
  Heart,
  Landmark,
  Layers,
  Phone,
  Plane,
  Shield,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ── icon-map ───────────────────────────────────────────────────────────────
//
// Sanity stores icons as strings (e.g. `"TrendingUp"`) because Lucide
// components can't cross the RSC boundary as function references. This map
// resolves the string back to a Lucide component and pre-renders a JSX
// element with sensible sizing. Pages call `iconByName("TrendingUp")` and
// pass the result straight into primitive props that expect a `ReactNode`.
//
// Keep the registry in sync with the `ICON_NAMES` list in
// sanity/schemaTypes/objects/page-elements.ts.

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowLeftRight,
  Building2,
  CreditCard,
  FileCheck2,
  Globe,
  Heart,
  Landmark,
  Layers,
  Phone,
  Plane,
  Shield,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
};

export function iconByName(
  name: string | undefined,
  options: { className?: string } = {},
) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) {
    // Unknown icon — render nothing rather than crashing the page.
    return null;
  }
  return <Icon className={options.className ?? "size-4"} />;
}
