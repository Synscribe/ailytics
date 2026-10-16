import Image from "next/image";
import { CountUp } from "@/components/count-up.client";

import styles from "./customer-proof.module.css";
const LOGOS = [
  {
    src: "/brand/customers/cag.png",
    alt: "Changi Airport Group",
    w: 600,
    h: 172,
    height: 40,
  },
  {
    src: "/brand/customers/wohhup.png",
    alt: "Woh Hup",
    w: 480,
    h: 160,
    height: 38,
  },
  { src: "/brand/customers/dhl.png", alt: "DHL", w: 600, h: 132, height: 26 },
  {
    src: "/brand/customers/obayashi.png",
    alt: "Obayashi",
    w: 600,
    h: 150,
    height: 30,
  },
  {
    src: "/brand/customers/laing.png",
    alt: "Laing O’Rourke",
    w: 600,
    h: 276,
    height: 40,
  },
  {
    src: "/brand/customers/lta.png",
    alt: "Land Transport Authority",
    w: 600,
    h: 184,
    height: 40,
  },
  {
    src: "/brand/customers/ro.png",
    alt: "Rogers-O’Brien Construction",
    w: 600,
    h: 122,
    height: 30,
  },
  {
    src: "/brand/customers/natsteel.png",
    alt: "NatSteel",
    w: 600,
    h: 108,
    height: 26,
  },
];

const STATS = [
  { value: "60–80%", label: "reduction in safety non-compliance" },
  {
    value: "50+",
    label: "configurable safety, security and productivity use cases",
  },
  { value: "<2 weeks", label: "to go live on the cameras you already own" },
];

/** `spacious` adds 80px above and below, for the homepage. */
export function CustomerProof({ spacious = false }: { spacious?: boolean }) {
  return (
    <section
      className={styles.proof}
      data-spacious={spacious ? "true" : undefined}
      aria-labelledby="proof-title"
    >
      <h2 id="proof-title" className={styles.proofTitle}>
        Trusted on 400+ projects worldwide
      </h2>
      <div className={styles.marquee}>
        <ul className={styles.track} aria-label="Customers">
          {[0, 1].map((copy) =>
            LOGOS.map((logo) => (
              <li
                key={`${copy}-${logo.alt}`}
                aria-hidden={copy === 1 ? "true" : undefined}
                data-copy={copy === 1 ? "true" : undefined}
              >
                <Image
                  alt={copy === 0 ? logo.alt : ""}
                  height={logo.h}
                  src={logo.src}
                  style={{
                    height: logo.height,
                    width: (logo.height * logo.w) / logo.h,
                  }}
                  width={logo.w}
                />
              </li>
            )),
          )}
        </ul>
      </div>
      <ul className={styles.stats}>
        {STATS.map((s) => (
          <li key={s.value} className={styles.stat}>
            <strong className={styles.statValue}>
              <CountUp value={s.value} />
            </strong>{" "}
            <span className={styles.statLabel}>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
