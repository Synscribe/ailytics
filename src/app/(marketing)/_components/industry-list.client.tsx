"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./industry-list.module.css";

export type Industry = {
  label: string;
  hazards: string;
  href: string;
  src: string;
};

/**
 * Industries as a list: the active name is dark, the rest fade back, and the
 * active site's photo shows beside the list in the grey world.
 */
export function IndustryList({ items }: { items: Industry[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.list}>
      <ul>
        {items.map((item, i) => (
          <li key={item.label}>
            <Link
              data-active={i === active ? "true" : undefined}
              href={item.href}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.name}>{item.label}</span>
              <span className={styles.hazards}>{item.hazards}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link className={styles.more} href="/industries">
            <span className={styles.name}>and more</span>
          </Link>
        </li>
      </ul>
      <div className={styles.stage} aria-hidden="true">
        {items.map((item, i) => (
          <Image
            alt=""
            data-active={i === active ? "true" : undefined}
            fill
            key={item.label}
            sizes="(min-width: 1024px) 50vw, 0px"
            src={item.src}
          />
        ))}
        <span className={styles.tint} />
      </div>
    </div>
  );
}
