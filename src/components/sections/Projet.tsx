import { Globe, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projet } from "@/lib/content";

export function Projet() {
  return (
    <section id="projet" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="03" title="Projet" />

        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <Globe size={24} className="text-accent" />
            <h3 className="text-2xl font-bold">{projet.title}</h3>
          </div>

          <p className="mb-6 leading-relaxed text-text-muted">
            {projet.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {projet.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-bg-subtle px-3 py-1 font-mono text-xs text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={projet.links.site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-bg-primary transition-colors hover:bg-accent-light"
            aria-label={`Voir le site ${projet.title}`}
          >
            <ExternalLink size={16} />
            Voir le site
          </a>
        </div>
      </div>
    </section>
  );
}
