import HomePage from "@/app/(en)/(marketing)/page";
import IndustryPage from "@/app/(en)/industries/[slug]/page";
import UseCasePage from "@/app/(en)/use-cases/[slug]/page";
import { SurfacePreview } from "./_components/surface-preview";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; treatment?: string }>;
}) {
  const query = await searchParams;
  const page =
    query.page === "ppe" || query.page === "construction" ? query.page : "home";
  return (
    <SurfacePreview key={page} page={page}>
      {page === "home" ? (
        <HomePage />
      ) : page === "ppe" ? (
        <UseCasePage params={Promise.resolve({ slug: "ppe-detection" })} />
      ) : (
        <IndustryPage params={Promise.resolve({ slug: "construction" })} />
      )}
    </SurfacePreview>
  );
}
