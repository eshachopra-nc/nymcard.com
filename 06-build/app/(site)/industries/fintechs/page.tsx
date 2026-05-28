import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageRenderer } from "@/components/composition";
import { sanityClient } from "@/lib/sanity/client";
import { industryPageBySlugQuery } from "@/lib/sanity/queries";
import type { SanityIndustryPage } from "@/lib/sanity/types";

const SLUG = "fintechs";

async function getDoc(): Promise<SanityIndustryPage | null> {
  return sanityClient.fetch<SanityIndustryPage | null>(
    industryPageBySlugQuery,
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

export default async function FintechsPage() {
  const doc = await getDoc();
  if (!doc) notFound();
  return <IndustryPageRenderer doc={doc} />;
}
