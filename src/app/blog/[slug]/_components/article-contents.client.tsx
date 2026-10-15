"use client";

import { useEffect, useRef, useState } from "react";

import type { BlogTableOfContentsItem } from "@/lib/blog-content";

type Section = {
  item: BlogTableOfContentsItem;
  children: BlogTableOfContentsItem[];
};

// Headings this far below the top of the viewport still count as current, so
// the sticky header never hides the section the reader is in.
const ACTIVE_OFFSET = 140;

function groupSections(items: BlogTableOfContentsItem[]): Section[] {
  const sections: Section[] = [];
  for (const item of items) {
    const parent = sections.at(-1);
    if (item.level === 3 && parent?.item.level === 2) {
      parent.children.push(item);
    } else {
      sections.push({ item, children: [] });
    }
  }
  return sections;
}

/**
 * Desktop contents list. Every section heading is server-rendered; the
 * subheadings of the section being read open as the reader scrolls.
 */
export function ArticleContents({
  items,
}: {
  items: BlogTableOfContentsItem[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const sections = groupSections(items);

  // Keep the current entry visible inside the scrolling panel without moving
  // the page itself.
  useEffect(() => {
    const panel = navRef.current?.parentElement;
    const link = navRef.current?.querySelector<HTMLElement>("[aria-current]");
    if (!panel || !link) return;
    const top = link.offsetTop - panel.offsetTop;
    if (
      top < panel.scrollTop ||
      top + link.offsetHeight > panel.scrollTop + panel.clientHeight
    ) {
      panel.scrollTop = top - panel.clientHeight / 3;
    }
  }, [activeId]);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    let frame = 0;

    function update() {
      frame = 0;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > ACTIVE_OFFSET) break;
        current = heading.id;
      }
      setActiveId(current);
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
  }, [items]);

  return (
    <nav aria-label="Article contents" ref={navRef}>
      <ol className="space-y-1 border-l border-ink/10">
        {sections.map(({ item, children }) => {
          const isOpen =
            item.id === activeId ||
            children.some((child) => child.id === activeId);
          return (
            <li key={item.id}>
              <ContentsLink active={item.id === activeId} item={item} />
              {children.length > 0 && isOpen ? (
                <ol className="mt-1 mb-2 space-y-1">
                  {children.map((child) => (
                    <li key={child.id}>
                      <ContentsLink
                        active={child.id === activeId}
                        item={child}
                        nested
                      />
                    </li>
                  ))}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ContentsLink({
  item,
  active,
  nested = false,
}: {
  item: BlogTableOfContentsItem;
  active: boolean;
  nested?: boolean;
}) {
  return (
    <a
      aria-current={active ? "location" : undefined}
      className={`-ml-px block border-l-2 py-1 text-sm leading-5 transition-colors ${nested ? "pl-8" : "pl-4"} ${active ? "border-mint-strong font-medium text-ink" : "border-transparent text-ink-muted hover:text-ink"}`}
      href={`#${item.id}`}
    >
      {item.text}
    </a>
  );
}
