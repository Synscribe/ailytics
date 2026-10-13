import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { defaultOrganizationLogoPath } from "@/lib/seo";

import { MobileNav } from "./mobile-nav";

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
          className="group inline-flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            alt=""
            className="h-8 w-auto"
            height={32}
            priority
            src={defaultOrganizationLogoPath}
            width={100}
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-muted">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            href={primaryAction.href}
            className={buttonVariants({
              size: "sm",
              className:
                "h-auto rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink shadow-[0_8px_24px_rgba(52,193,196,0.3)] hover:-translate-y-0.5 hover:bg-mint",
            })}
          >
            {primaryAction.label}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
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
