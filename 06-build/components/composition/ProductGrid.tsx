import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

// ── Product Grid ───────────────────────────────────────────────────────────
//
// Lays out product cards (design-system.md §8.8) in one of the four product
// grid layouts (§8.9): asymmetric `bento`, or symmetric `cols-3` / `cols-2` /
// `cols-1`. One layout per grid — never mixed.

type ProductItem = {
  name: string;
  description: string;
  /** Bento layout only — column span on the six-column grid. */
  span?: 2 | 3 | 4 | 6;
};

type ProductLayout = "bento" | "cols-3" | "cols-2" | "cols-1";

const GRID: Record<ProductLayout, string> = {
  bento: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr",
  "cols-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "cols-2": "grid-cols-1 sm:grid-cols-2",
  "cols-1": "grid-cols-1",
};

const SPAN: Record<NonNullable<ProductItem["span"]>, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

export function ProductGrid({
  items,
  layout = "cols-2",
  className,
}: {
  items: ProductItem[];
  layout?: ProductLayout;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5 lg:gap-6", GRID[layout], className)}>
      {items.map((item) => (
        <ProductCard
          key={item.name}
          name={item.name}
          description={item.description}
          orientation={
            layout === "cols-1" ||
            (layout === "bento" && (item.span ?? 0) >= 4)
              ? "split"
              : "stacked"
          }
          className={
            layout === "bento" && item.span ? SPAN[item.span] : undefined
          }
        />
      ))}
    </div>
  );
}
