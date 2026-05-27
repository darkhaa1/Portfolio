"use client";

import { Shield, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { infraLayers, infraBadges, infraRepo } from "@/lib/content";

function LayerCard({
  number,
  name,
  details,
}: {
  number: string;
  name: string;
  details: string;
}) {
  return (
    <div className="group relative flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-4 transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.08)]">
      <span className="font-mono text-sm text-text-hint transition-colors group-hover:text-accent">
        {number}
      </span>
      <div className="flex-1">
        <span className="font-semibold text-text-primary transition-colors group-hover:text-accent">
          {name}
        </span>
        <span className="ml-2 text-sm text-text-muted">{details}</span>
      </div>
      <Shield
        size={18}
        className="text-text-faint transition-colors group-hover:text-accent"
      />
    </div>
  );
}

export function Infrastructure() {
  return (
    <section id="infrastructure" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="02" title="Infrastructure" />

        <p className="mb-8 text-text-muted">
          Défense en profondeur — survole une couche
        </p>

        <div className="flex flex-col gap-3">
          {infraLayers.map((layer) => (
            <LayerCard key={layer.number} {...layer} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
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

        <a
          href={infraRepo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
          aria-label={`Voir le dépôt GitHub ${infraRepo.label}`}
        >
          <ExternalLink size={16} />
          {infraRepo.label}
        </a>
      </div>
    </section>
  );
}
