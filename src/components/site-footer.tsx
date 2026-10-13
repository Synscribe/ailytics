import Image from "next/image";
import Link from "next/link";

import { usesDefaultSiteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import { defaultOrganizationLogoPath } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link
            href="/"
            className="inline-flex"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              alt=""
              className="h-8 w-auto"
              height={32}
              src={defaultOrganizationLogoPath}
              width={100}
            />
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-muted md:justify-end">
            <li>
              <Link className="hover:text-ink" href="/uses">
                Use cases
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/industries">
                Industries
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-ink-faint md:col-span-2">
          © {new Date().getFullYear()} {siteConfig.name}.
          {usesDefaultSiteUrl
            ? " Replace this identity before production."
            : ""}
        </p>
      </div>
    </footer>
  );
}
