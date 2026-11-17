"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Reason = { title: string; body: string };
type Photo = { src: string; alt: string };

/**
 * The numbered reasons, with the photo beside them following the reason being
 * read. Every reason and photo is in the server HTML; scrolling only moves the
 * highlight, and reduced motion keeps the photo swap instant.
 */
export function WhyPartner({
  reasons,
  photos,
}: {
  reasons: readonly Reason[];
  photos: readonly Photo[];
}) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const middle = window.innerHeight / 2;
      let closest = 0;
      let distance = Infinity;
      items.current.forEach((item, index) => {
        if (!item) return;
        const box = item.getBoundingClientRect();
        const gap = Math.abs(box.top + box.height / 2 - middle);
        if (gap < distance) {
          distance = gap;
          closest = index;
        }
      });
      setActive(closest);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
      <ol className="flex flex-col gap-10 lg:gap-0">
        {reasons.map((reason, index) => (
          <li
            className={`flex gap-5 transition-opacity duration-300 motion-reduce:transition-none lg:min-h-[45vh] lg:items-center ${index === active ? "" : "lg:opacity-45"}`}
            key={reason.title}
            ref={(node) => {
              items.current[index] = node;
            }}
          >
            <span
              aria-hidden="true"
              className={`grid size-12 shrink-0 place-items-center self-start rounded-lg text-lg font-medium transition-colors duration-300 motion-reduce:transition-none lg:self-center ${index === active ? "bg-ink text-paper" : "bg-signal text-paper"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-title text-ink">{reason.title}</h3>
              <p className="mt-2 max-w-lg leading-7 text-ink-muted">
                {reason.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Phones: the three photos as a collage below the reasons. */}
      <div className="grid gap-4 lg:hidden">
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
          <Image
            alt={photos[0].alt}
            className="object-cover"
            fill
            sizes="100vw"
            src={photos[0].src}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {photos.slice(1).map((photo) => (
            <div
              className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted"
              key={photo.src}
            >
              <Image
                alt={photo.alt}
                className="object-cover"
                fill
                sizes="50vw"
                src={photo.src}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Wide screens: one photo pinned beside the reasons, following them. */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-11rem)] aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
          {photos.map((photo, index) => (
            <Image
              alt={photo.alt}
              className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${index === Math.min(active, photos.length - 1) ? "opacity-100" : "opacity-0"}`}
              fill
              key={photo.src}
              sizes="50vw"
              src={photo.src}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
