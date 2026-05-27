import { SectionHeading } from "@/components/ui/SectionHeading";
import { parcours } from "@/lib/content";

export function Parcours() {
  return (
    <section id="parcours" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="05" title="Parcours" />

        <div className="relative ml-4 border-l border-border pl-8">
          {parcours.map((step, i) => (
            <div key={i} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg-primary" />
              <span className="font-mono text-sm text-accent">
                {step.period}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
