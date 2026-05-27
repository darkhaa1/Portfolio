import { ShieldCheck, Code, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { competences } from "@/lib/content";

function SkillGroup({
  title,
  items,
  icon: Icon,
  highlight,
}: {
  title: string;
  items: readonly string[];
  icon: React.ComponentType<{ size: number; className?: string }>;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        highlight
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-surface"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon
          size={20}
          className={highlight ? "text-accent" : "text-text-muted"}
        />
        <h3
          className={`font-semibold ${
            highlight ? "text-accent" : "text-text-primary"
          }`}
        >
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-bg-subtle px-3 py-1 font-mono text-xs text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Competences() {
  return (
    <section id="competences" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="04" title="Compétences" />

        <div className="flex flex-col gap-6">
          <SkillGroup
            title={competences.infra.title}
            items={competences.infra.items}
            icon={ShieldCheck}
            highlight
          />
          <SkillGroup
            title={competences.dev.title}
            items={competences.dev.items}
            icon={Code}
          />
          <SkillGroup
            title={competences.learning.title}
            items={competences.learning.items}
            icon={BookOpen}
          />
        </div>
      </div>
    </section>
  );
}
