import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { BannerFootage } from "./banner-footage.client";
import styles from "./cta-banner.module.css";

/**
 * The closing call to action on every page: a light banner with real site
 * footage, greyscale and graded to the brand teal, fading in on the right.
 * Pass `footage={null}` where construction footage would be off-topic.
 */
export function CtaBanner({
  title,
  description,
  href,
  buttonText,
  footage = "detection-machinery-proximity",
}: {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  footage?: string | null;
}) {
  return (
    <div className={styles.banner}>
      {footage ? (
        <BannerFootage
          className={styles.footage}
          media={footage}
          videoClassName={styles.video}
        />
      ) : null}
      <div className={styles.copy}>
        <h2 className="brand-h2 max-w-3xl">{title}</h2>
        <p>{description}</p>
      </div>
      <Link className={`brand-btn-primary ${styles.action}`} href={href}>
        {buttonText}
        <ArrowRightIcon className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
