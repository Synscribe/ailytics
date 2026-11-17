import type { Metadata } from "next";

import { ContentPage } from "@/components/content-page/content-page";
import {
  assertRouteCopy,
  getPageContent,
  listPageContent,
} from "@/lib/page-content";
import { createPageMetadata } from "@/lib/seo";

import { INDUSTRY_ROUTE_COPY } from "./_content";

type SlugPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await listPageContent("industries");
  assertRouteCopy("industries", slugs, INDUSTRY_ROUTE_COPY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPageContent("industries", slug);
  return createPageMetadata({
    title: content.hero.seoTitle ?? content.hero.title,
    description: content.hero.description,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  assertRouteCopy("industries", [slug], INDUSTRY_ROUTE_COPY);
  const { name, ...copy } = INDUSTRY_ROUTE_COPY[slug];
  const content = await getPageContent("industries", slug);

  return (
    <ContentPage
      {...copy}
      content={content}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
        { name, path: `/industries/${slug}` },
      ]}
    />
  );
}
