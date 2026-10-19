import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { defaultOrganizationLogoPath } from "@/lib/seo";

import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";

const primaryAction = {
  href: "/contact",
  label: "Request a demo",
} as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-medium tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            alt=""
            className="h-8 w-auto"
            height={32}
            priority
            src={defaultOrganizationLogoPath}
            width={120}
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-muted">
            {siteConfig.navigation.map((item) => (
              <li key={item.label}>
                {"links" in item ? (
                  <NavDropdown group={item} />
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            href={primaryAction.href}
            className="brand-btn-primary h-9 px-4 py-0 text-sm"
          >
            {primaryAction.label}
            <ArrowRightIcon
              className="size-4"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </Link>
        </div>

        <MobileNav
          navigation={siteConfig.navigation}
          primaryAction={primaryAction}
        />
      </div>
    </header>
  );
}
