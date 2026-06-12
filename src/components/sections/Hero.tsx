import Link from "next/link";
import { Server, ArrowRight, Mail } from "lucide-react";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-4 py-1.5 text-sm text-accent-green">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75 animate-pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          {hero.badge}
        </div>

        <p className="mb-4 font-mono text-sm text-text-muted">
          <span className="text-accent">$ </span>whoami →{" "}
          <span className="text-text-primary">{hero.whoami}</span>
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {hero.headline}
          <span className="ml-1 inline-block w-0.75 bg-accent align-baseline animate-blink">
            &nbsp;
          </span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
          {hero.pitch}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/infrastructure"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-bg-primary transition-colors hover:bg-accent-light"
          >
            <ArrowRight size={18} />
            Voir mon infrastructure
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <Mail size={18} />
            Me contacter
          </a>
        </div>

        <p className="mt-16 flex items-center gap-2 font-mono text-xs text-text-hint">
          <Server size={14} className="text-text-faint" />
          {hero.selfHostedNote}
        </p>
      </div>
    </section>
  );
}
