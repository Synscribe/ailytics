import type { Metadata } from "next";
import Image from "next/image";

import { RotatingWords } from "@/components/rotating-words.client";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

import {
  ProjectCarousel,
  type Project,
} from "./_components/project-carousel.client";

export const metadata: Metadata = createPageMetadata({
  title: "Our Global Projects",
  description:
    "Ailytics projects around the world: airports, hospitals, shipyards, bridges and residential developments monitored with AI video analytics across Asia, Australia, the Middle East and the Americas.",
  path: "/projects",
});

const PROJECTS: readonly Project[] = [
  {
    statement:
      "AI video analytics on over 1,400 cameras at the best airport in the world.",
    site: "Changi Terminal 5",
    country: "Singapore",
    image: {
      src: "/media/projects/changi-terminal-5.webp",
      alt: "Aerial view of Singapore Changi Airport with the Jewel complex and control tower, showing an airplane parked at the terminal.",
    },
    client: {
      name: "Changi Airport Group",
      src: "/brand/projects/changi-airport-group.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement:
      "The future tallest student housing tower near Texas A&M University.",
    site: "250 Church Avenue",
    country: "United States of America",
    image: {
      src: "/media/projects/250-church-avenue.webp",
      alt: "Modern high-rise building with vertical stripes and glass windows situated at an urban street corner with trees and cars.",
    },
    client: {
      name: "Rogers-O'Brien Construction",
      src: "/brand/projects/rogers-obrien.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "Originally founded in 1998.",
    site: "North District Hospital",
    country: "Hong Kong",
    image: {
      src: "/media/projects/north-district-hospital.webp",
      alt: "Large pink and white hospital building behind trees and grassy area under a clear blue sky with scattered clouds.",
    },
    client: {
      name: "Leighton",
      src: "/brand/projects/leighton.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "Originally opened in 1939, now under renovation.",
    site: "Fremantle Bridge",
    country: "Australia",
    image: {
      src: "/media/projects/fremantle-bridge.webp",
      alt: "Long wooden and concrete bridge over water with a grassy shore under a clear blue sky.",
    },
    client: {
      name: "Laing O'Rourke",
      src: "/brand/projects/laing-orourke.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "An integrated project covering 300k sqm",
    site: "Ewan Sedra",
    country: "Saudi Arabia",
    image: {
      src: "/media/projects/ewan-sedra.webp",
      alt: "Modern beige townhouses with large windows, covered parking spaces, trees, and plants along a paved street.",
    },
    client: {
      name: "Retal",
      src: "/brand/projects/retal.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "One of the largest shipyards in the region.",
    site: "PaxOcean Shipyard",
    country: "Indonesia",
    image: {
      src: "/media/projects/paxocean-shipyard.webp",
      alt: "Aerial view of a shipyard with multiple large vessels, cranes, and industrial buildings near calm turquoise water.",
    },
    client: {
      name: "PaxOcean",
      src: "/brand/projects/paxocean.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "Natsteel - One of Singapore's biggest steel manufacturers!",
    site: "Manufacturing Facilities",
    country: "Singapore",
    image: {
      src: "/media/projects/natsteel.webp",
      alt: "Modern white office building with NatSteel logo above entrance and surrounded by palm trees under clear blue sky.",
    },
    client: {
      name: "NatSteel",
      src: "/brand/projects/natsteel.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement:
      "One of the newest residential buildings located in Putra Heights.",
    site: "Damayan Residences",
    country: "Malaysia",
    image: {
      src: "/media/projects/damayan-residences.webp",
      alt: "Tall modern residential building with multiple balconies surrounded by greenery and roads at sunset.",
    },
    client: {
      name: "Sime Darby",
      src: "/brand/projects/sime-darby.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "An ecosystem of schools, parks, shops, and homes.",
    site: "Givat Hashalvah",
    country: "Israel",
    image: {
      src: "/media/projects/givat-hashalvah.webp",
      alt: "Modern urban courtyard with small cascading water features, trees, and seating areas under a clear blue sky.",
    },
    client: {
      name: "Solel Boneh",
      src: "/brand/projects/solel-boneh.webp",
      width: 800,
      height: 600,
    },
  },
  {
    statement: "A trapezoidal dam located in Akita Prefecture.",
    site: "Chokai Dam",
    country: "Japan",
    image: {
      src: "/media/projects/chokai-dam.webp",
      alt: "Snow-capped mountain with green forest below and a pond reflecting the mountain under a clear blue sky.",
    },
    client: {
      name: "Nishimatsu",
      src: "/brand/projects/nishimatsu.webp",
      width: 800,
      height: 600,
    },
  },
];

// Shorter heading names keep every country on one line on a phone.
const HEADING_NAMES: Record<string, string> = {
  "United States of America": "the United States",
};

const COUNTRIES = [
  ...new Set(PROJECTS.map(({ country }) => HEADING_NAMES[country] ?? country)),
];

export default function ProjectsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <section className="brand-hero">
        <div className="mx-auto w-full max-w-7xl px-5 pt-14 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-signal-strong">Projects</p>
            <h1 className="brand-h1 mt-4 max-w-4xl">
              We&apos;re currently in{" "}
              <RotatingWords className="text-signal" words={COUNTRIES} />
            </h1>
          </div>
          <div className="mt-12">
            <ProjectCarousel projects={PROJECTS} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="map-title"
        className="bg-mint/15 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2
            className="brand-h2 text-center text-signal-strong"
            id="map-title"
          >
            Born in Singapore. Made for the world.
          </h2>
          <figure className="mt-12">
            <figcaption className="inline-block rounded-t-xl bg-ink px-5 py-2.5 text-sm font-medium text-paper">
              400+ Active Projects
            </figcaption>
            <div className="overflow-hidden rounded-xl rounded-tl-none border-[6px] border-ink bg-paper">
              <Image
                alt="World map highlighting in teal the countries where Ailytics is deployed: United States, Italy, Saudi Arabia, Japan, Thailand, Malaysia, Indonesia, Papua New Guinea, and Australia."
                className="h-auto w-full"
                height={1460}
                sizes="(min-width: 1280px) 1200px, 100vw"
                src="/media/projects/world-map.webp"
                width={2814}
              />
            </div>
          </figure>
        </div>
      </section>
    </main>
  );
}
