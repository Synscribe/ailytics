import type { Metadata } from "next";

import { ContentPage } from "@/components/content-page/content-page";
import {
  assertRouteCopy,
  getPageContent,
  listPageContent,
} from "@/lib/page-content";
import { createPageMetadata } from "@/lib/seo";

import { USE_CASE_ROUTE_COPY } from "./_content";

type SlugPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await listPageContent("uses");
  assertRouteCopy("uses", slugs, USE_CASE_ROUTE_COPY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPageContent("uses", slug);
  return createPageMetadata({
    title: content.hero.seoTitle ?? content.hero.title,
    description: content.hero.description,
    path: `/use-cases/${slug}`,
  });
}

export default async function UseCasePage({ params }: SlugPageProps) {
  const { slug } = await params;
  assertRouteCopy("uses", [slug], USE_CASE_ROUTE_COPY);
  const { name, ...copy } = USE_CASE_ROUTE_COPY[slug];
  const content = await getPageContent("uses", slug);

  return (
    <ContentPage
      {...copy}
      content={content}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Use cases", path: "/use-cases" },
        { name, path: `/use-cases/${slug}` },
      ]}
    />
  );
}
