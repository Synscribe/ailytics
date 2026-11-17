"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type TeamPhoto = { src: string; alt: string };

const arrowClass =
  "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-ink text-paper shadow-md transition hover:bg-signal-strong focus-visible:outline-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-0";

/**
 * A horizontal strip of team photos. The strip scrolls natively, so it works
 * without JavaScript; the buttons only nudge it along and hide at each end.
 */
export function TeamCarousel({ photos }: { photos: readonly TeamPhoto[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const node = track.current;
    if (!node) return;

    function update() {
      if (!node) return;
      const max = node.scrollWidth - node.clientWidth;
      setEdges({
        start: node.scrollLeft <= 4,
        end: node.scrollLeft >= max - 4,
      });
    }

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function nudge(direction: -1 | 1) {
    const node = track.current;
    if (!node) return;
    node.scrollBy({
      left: direction * Math.round(node.clientWidth * 0.8),
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <ul
        aria-label="Photos of the Ailytics team"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
        ref={track}
      >
        {photos.map((photo) => (
          <li
            className="relative aspect-[2/3] w-[68vw] max-w-[300px] flex-none snap-center overflow-hidden rounded-2xl bg-muted sm:w-[300px]"
            key={photo.src}
          >
            <Image
              alt={photo.alt}
              className="object-cover"
              fill
              sizes="(min-width: 640px) 300px, 68vw"
              src={photo.src}
            />
          </li>
        ))}
      </ul>
      <button
        aria-label="Previous photos"
        className={`${arrowClass} left-3 sm:left-6`}
        disabled={edges.start}
        onClick={() => nudge(-1)}
        type="button"
      >
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
      </button>
      <button
        aria-label="Next photos"
        className={`${arrowClass} right-3 sm:right-6`}
        disabled={edges.end}
        onClick={() => nudge(1)}
        type="button"
      >
        <ChevronRightIcon className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
