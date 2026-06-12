import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPanel } from "@/components/status/StatusPanel";
import { infraTeaser, infraBadges } from "@/lib/content";

export function Infrastructure() {
  return (
    <section id="infrastructure" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <StatusPanel className="mb-8 lg:mb-0" />

        <SectionHeading number="02" title="Infrastructure" />

        <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
          {infraTeaser.lead}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {infraBadges.map((badge) => (
            <span
              key={badge.label}
              className={`rounded-md border px-3 py-1 font-mono text-xs ${
                badge.variant === "teal"
                  ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
                  : "border-border bg-bg-subtle text-text-muted"
              }`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        <Link
          href={infraTeaser.href}
          className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-bg-primary transition-colors hover:bg-accent-light"
        >
          {infraTeaser.cta}
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
