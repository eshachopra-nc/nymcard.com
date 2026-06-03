import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageRenderer } from "@/components/composition";
import { sanityClient } from "@/lib/sanity/client";
import { industryPageBySlugQuery } from "@/lib/sanity/queries";
import type { SanityIndustryPage } from "@/lib/sanity/types";

const SLUG = "government";

async function getDoc(): Promise<SanityIndustryPage | null> {
  return sanityClient.fetch<SanityIndustryPage | null>(
    industryPageBySlugQuery,
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
    alternates: { canonical: "/solutions/government" },
  };
}

export default async function GovernmentPage() {
  const doc = await getDoc();
  if (!doc) notFound();
  return <IndustryPageRenderer doc={doc} />;
}
