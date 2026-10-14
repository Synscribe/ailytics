"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Project = {
  statement: string;
  site: string;
  country: string;
  image: { src: string; alt: string };
  client: { name: string; src: string; width: number; height: number };
};

/**
 * One project per slide. The track scrolls natively and snaps, so the cards
 * are reachable without JavaScript; the arrows and dots follow the scroll.
 */
export function ProjectCarousel({
  projects,
}: {
  projects: readonly Project[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const slides = [...node.children];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6) {
            setActive(slides.indexOf(entry.target));
          }
        }
      },
      { root: node, threshold: 0.6 },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const node = track.current;
    const slide = node?.children[index] as HTMLElement | undefined;
    if (!node || !slide) return;
    node.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }

  const last = projects.length - 1;

  return (
    <div>
      <ul
        aria-label="Project sites"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={track}
      >
        {projects.map((project) => (
          <li
            className="brand-card grid w-full flex-none snap-start overflow-hidden lg:grid-cols-[1.25fr_1fr]"
            key={project.site}
          >
            <div className="relative aspect-[4/3] bg-muted lg:aspect-auto lg:min-h-[26rem]">
              <Image
                alt={project.image.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                src={project.image.src}
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <h3 className="text-2xl leading-snug font-medium tracking-[-0.02em] text-balance sm:text-3xl">
                {project.statement}
              </h3>
              <div className="mt-8 flex items-end justify-between gap-6">
                <p className="text-sm leading-6">
                  <span className="block font-medium text-ink">
                    {project.site}
                  </span>
                  <span className="text-ink-muted">{project.country}</span>
                </p>
                <Image
                  alt={`${project.client.name} logo`}
                  className="h-9 w-auto max-w-[120px] object-contain"
                  height={project.client.height}
                  src={project.client.src}
                  width={project.client.width}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-6">
        <ol aria-label="Slide" className="flex items-center gap-2.5">
          {projects.map((project, index) => (
            <li key={project.site}>
              <button
                aria-current={active === index ? "true" : undefined}
                aria-label={`Go to ${project.site}`}
                className={`block size-2 rounded-full transition ${
                  active === index ? "scale-125 bg-signal" : "bg-ink/20"
                }`}
                onClick={() => goTo(index)}
                type="button"
              />
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <button
            aria-label="Previous project"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-signal hover:text-signal-strong disabled:opacity-40"
            disabled={active === 0}
            onClick={() => goTo(Math.max(0, active - 1))}
            type="button"
          >
            <ChevronLeftIcon className="size-5" aria-hidden="true" />
          </button>
          <button
            aria-label="Next project"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-signal hover:text-signal-strong disabled:opacity-40"
            disabled={active === last}
            onClick={() => goTo(Math.min(last, active + 1))}
            type="button"
          >
            <ChevronRightIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
