import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  ControlRoomWall,
  MultiSiteWall,
} from "@/components/hub-hero/hub-hero-visuals.client";

export const metadata: Metadata = {
  title: "Hub hero prototypes",
};

const PROTOTYPES: {
  key: string;
  name: string;
  note: string;
  visual: ReactNode;
}[] = [
  {
    key: "a",
    name: "Use cases: security room wall",
    note: "Nine live cameras from one site. Every 3 seconds one camera catches something: a red box on the footage and the alert pops up below, as it does in the product.",
    visual: <ControlRoomWall />,
  },
  {
    key: "c",
    name: "Industries: multi-site wall",
    note: "Four sites in different industries, four cameras each. Alerts move from site to site. Suits Industries best.",
    visual: <MultiSiteWall />,
  },
];

export default function HubHeroPrototypesPage() {
  return (
    <main className="bg-canvas px-5 py-14 sm:px-8" id="main-content">
      <div className="mx-auto max-w-7xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
          href="/dev"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Visual workshop
        </Link>
        <h1 className="mt-8 text-h2">Hub hero prototypes</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          The right column of the Use cases and Industries heroes, reviewed on
          their own. All use real site footage.
        </p>

        <div className="mt-12 space-y-16">
          {PROTOTYPES.map((p) => (
            <div key={p.key}>
              <h2 className="text-h3">{p.name}</h2>
              <p className="mt-2 max-w-2xl text-small text-ink-muted">
                {p.note}
              </p>
              <div className="mt-6">
                <div className="max-w-2xl">{p.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
