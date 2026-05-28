import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageRenderer } from "@/components/composition";
import { sanityClient } from "@/lib/sanity/client";
import { productPageBySlugQuery } from "@/lib/sanity/queries";
import type { SanityProductPage } from "@/lib/sanity/types";

const SLUG = "money-movement";

async function getDoc(): Promise<SanityProductPage | null> {
  return sanityClient.fetch<SanityProductPage | null>(
    productPageBySlugQuery,
    { slug: SLUG },
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getDoc();
  return {
    title: doc?.metaTitle,
    description: doc?.metaDescription,
  };
}

export default async function MoneyMovementPage() {
  const doc = await getDoc();
  if (!doc) notFound();
  return <ProductPageRenderer doc={doc} />;
}
