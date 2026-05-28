import { School, Briefcase, Download } from "lucide-react";
import {
  formation,
  experience,
  cvUrl,
  type ParcoursEntry,
  type ParcoursStatus,
} from "@/data/parcours";

const dotColor: Record<ParcoursStatus, string> = {
  targeted: "bg-accent",
  current: "bg-accent-green",
  past: "bg-text-faint",
};

function TimelineEntry({ entry }: { entry: ParcoursEntry }) {
  return (
    <div className="relative mb-8 last:mb-0">
      <span
        className={`absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg-primary ${dotColor[entry.status]}`}
        aria-hidden
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h4 className="font-semibold text-text-primary">{entry.title}</h4>
        <span className="whitespace-nowrap font-mono text-xs text-accent">
          {entry.dates}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-text-muted">{entry.place}</p>
      {entry.description && (
        <p className="mt-2 text-sm text-text-hint">{entry.description}</p>
      )}
      {entry.bullets && (
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-text-hint marker:text-text-faint">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TimelineBlock({
  title,
  icon: Icon,
  entries,
}: {
  title: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  entries: ParcoursEntry[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Icon size={16} className="text-accent-green" />
        <span className="font-mono text-sm font-semibold tracking-wider text-accent-green">
          {title}
        </span>
      </div>
      <div className="relative ml-2 border-l border-surface pl-6">
        {entries.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export function Parcours() {
  return (
    <section id="parcours" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-sm text-text-hint">
              {"// "}05
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="font-mono text-accent">$ </span>Parcours
            </h2>
          </div>
          <a
            href={cvUrl}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            <Download size={16} />
            Télécharger mon CV
          </a>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <TimelineBlock title="FORMATION" icon={School} entries={formation} />
          <TimelineBlock
            title="EXPÉRIENCE"
            icon={Briefcase}
            entries={experience}
          />
        </div>
      </div>
    </section>
  );
}
