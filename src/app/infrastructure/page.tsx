import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Activity } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ArchitectureDiagram } from "@/components/infra/ArchitectureDiagram";
import {
  siteConfig,
  infraPage,
  infraSecurity,
  infraSupervision,
  infraBadges,
  infraRepo,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Infrastructure — Darkhansukh G.",
  description:
    "Architecture d'une infrastructure auto-hébergée production-grade : Cloudflare, Proxmox VE, Caddy, segmentation VLAN OPNsense/Suricata, supervision Prometheus/Grafana et administration hors-bande Tailscale.",
  alternates: { canonical: `${siteConfig.url}/infrastructure` },
};

export default function InfrastructurePage() {
  return (
    <>
      <Nav />
      <main className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            retour
          </Link>

          <header className="mt-8 mb-10">
            <span className="font-mono text-sm text-text-hint">
              {"// "}
              {infraPage.eyebrow}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="font-mono text-accent">$ </span>
              {infraPage.title}
            </h1>
            <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
              {infraPage.intro}
            </p>
          </header>

          {/* Diagramme d'architecture */}
          <ArchitectureDiagram />

          {/* Badges techniques */}
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

          {/* Sécurité + supervision */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-5 flex items-center gap-2">
                <ShieldCheck size={20} className="text-accent" />
                <h2 className="text-lg font-semibold">{infraSecurity.title}</h2>
              </div>
              <p className="mb-5 text-sm text-text-muted">{infraSecurity.intro}</p>
              <ul className="flex flex-col gap-3">
                {infraSecurity.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-0.5">
                    <span className="font-mono text-sm text-text-primary">
                      {item.name}
                    </span>
                    <span className="text-sm leading-relaxed text-text-muted">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-5 flex items-center gap-2">
                <Activity size={20} className="text-accent" />
                <h2 className="text-lg font-semibold">{infraSupervision.title}</h2>
              </div>
              <p className="mb-5 text-sm text-text-muted">
                {infraSupervision.intro}
              </p>
              <ul className="flex flex-col gap-3">
                {infraSupervision.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Lien dépôt */}
          <div className="mt-12 rounded-xl border border-border bg-bg-subtle p-6">
            <p className="max-w-2xl leading-relaxed text-text-muted">
              {infraRepo.intro}
            </p>
            <a
              href={infraRepo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
              aria-label={`Voir le dépôt GitHub ${infraRepo.label}`}
            >
              <ExternalLink size={16} />
              {infraRepo.label}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
