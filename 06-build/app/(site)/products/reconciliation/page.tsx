import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageRenderer } from "@/components/composition";
import { sanityClient } from "@/lib/sanity/client";
import { productPageBySlugQuery } from "@/lib/sanity/queries";
import type { SanityProductPage } from "@/lib/sanity/types";

const SLUG = "reconciliation";

async function getDoc(): Promise<SanityProductPage | null> {
  return sanityClient.fetch<SanityProductPage | null>(
    productPageBySlugQuery,
    { slug: SLUG },
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getDoc();
  return {
    // metaTitle already carries the brand suffix; use absolute so the
    // root title template does not append a second "| NymCard".
    title: doc?.metaTitle ? { absolute: doc.metaTitle } : undefined,
    description: doc?.metaDescription,
    alternates: { canonical: "/products/reconciliation" },
  };
}

export default async function ReconciliationPage() {
  const doc = await getDoc();
  if (!doc) notFound();
  return <ProductPageRenderer doc={doc} />;
}
