import type { Metadata } from "next";
import Link from "next/link";

import { chromeCopy } from "@/config/chrome-copy";

const copy = chromeCopy("ja-jp").notFound;

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="brand-hero grid min-h-[70vh] w-full place-items-center px-5 py-24 text-center sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="brand-h1">{copy.heading}</h1>
        <p className="brand-lead mx-auto mt-6 max-w-xl">{copy.body}</p>
        <Link href="/ja-jp" className="brand-btn-primary mt-9">
          {copy.action}
        </Link>
      </div>
    </main>
  );
}
