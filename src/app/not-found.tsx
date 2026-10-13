import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="brand-hero grid min-h-[70vh] w-full place-items-center px-5 py-24 text-center sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="brand-h1">We could not find that page</h1>
        <p className="brand-lead mx-auto mt-6 max-w-xl">
          The link may be out of date, or the page may have moved. Try the
          homepage, or browse use cases and industries.
        </p>
        <Link href="/" className="brand-btn-primary mt-9">
          Return home
        </Link>
      </div>
    </main>
  );
}
