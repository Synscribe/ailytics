import IndustriesPage from "@/app/(en)/industries/page";
import UsesPage from "@/app/(en)/use-cases/page";

import { HubTuner } from "./tuner";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = page === "industries" ? "industries" : "use-cases";
  return (
    <>
      {current === "industries" ? <IndustriesPage /> : <UsesPage />}
      <HubTuner current={current} />
    </>
  );
}
