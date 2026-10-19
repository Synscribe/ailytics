"use client";

import { ChevronDownIcon } from "lucide-react";
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

      {/* Top padding bridges the gap to the button so hover does not drop. */}
      <div
        className="absolute top-full -left-3 z-50 pt-3"
        hidden={!open}
        id={panelId}
      >
        <ul className="w-52 rounded-2xl border border-ink/10 bg-paper p-2 shadow-[0_12px_32px_-12px_rgba(39,64,93,0.25)]">
          {group.links.map((link) => (
            <li key={link.href}>
              <Link
                className="block rounded-xl px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
