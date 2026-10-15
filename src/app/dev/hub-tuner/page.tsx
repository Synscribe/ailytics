import IndustriesPage from "@/app/industries/page";
import UsesPage from "@/app/use-cases/page";

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
