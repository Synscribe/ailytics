"use client";

import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { NavigationGroup } from "@/config/site";

/**
 * A top-nav label that opens its links on hover or click. The links stay in
 * the server HTML while closed, so crawlers and no-JS visitors still get them.
 */
export function NavDropdown({ group }: { group: NavigationGroup }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      className="relative"
      ref={rootRef}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      {group.href ? (
        // The label goes to the hub page. The chevron opens the links for
        // keyboard and touch visitors, who cannot hover.
        <span className="inline-flex items-center gap-1">
          <Link
            className={`transition-colors hover:text-ink ${open ? "text-ink" : ""}`}
            href={group.href}
            onClick={() => setOpen(false)}
          >
            {group.label}
          </Link>
          <button
            aria-controls={panelId}
            aria-expanded={open}
            aria-label={`Show ${group.label.toLowerCase()}`}
            className="-m-1 inline-grid place-items-center p-1 transition-colors hover:text-ink aria-expanded:text-ink"
            onClick={() => setOpen((current) => !current)}
            ref={triggerRef}
            type="button"
          >
            <ChevronDownIcon
              aria-hidden="true"
              className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </span>
      ) : (
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className="inline-flex items-center gap-1 transition-colors hover:text-ink aria-expanded:text-ink"
          onClick={() => setOpen((current) => !current)}
          ref={triggerRef}
          type="button"
        >
          {group.label}
          <ChevronDownIcon
            aria-hidden="true"
            className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Top padding bridges the gap to the button so hover does not drop. */}
      <div
        className="absolute top-full -left-3 z-50 pt-3"
        hidden={!open}
        id={panelId}
      >
        <div className="w-[340px] overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_18px_44px_-16px_rgba(39,64,93,0.28)] animate-in duration-200 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none">
          <ul className="p-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  className="group/item flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-muted focus-visible:bg-muted"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="relative h-11 w-14 flex-none overflow-hidden rounded-[10px] bg-muted ring-1 ring-ink/10">
                    <Image
                      alt=""
                      className="object-cover transition-transform duration-300 group-hover/item:scale-105 motion-reduce:transition-none"
                      fill
                      sizes="56px"
                      src={link.image}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
                      {link.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {group.footer ? (
            <Link
              className="group/footer flex items-center justify-between bg-muted px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mint/60"
              href={group.footer.href}
              onClick={() => setOpen(false)}
            >
              {group.footer.label}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 transition-transform group-hover/footer:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
