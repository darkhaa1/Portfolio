import { Link2, Code2, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/content";

const iconMap = {
  linkedin: Link2,
  github: Code2,
  email: Mail,
} as const;

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading number="06" title="Contact" />

        <div className="mx-auto flex max-w-md flex-col items-center gap-6">
          <div className="flex gap-4">
            {(
              Object.entries(contact.links) as [
                keyof typeof contact.links,
                (typeof contact.links)[keyof typeof contact.links],
              ][]
            ).map(([key, link]) => {
              const Icon = iconMap[key];
              return (
                <a
                  key={key}
                  href={link.url}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              );
            })}
          </div>

          <p className="text-sm text-text-muted">{contact.availability}</p>
        </div>
      </div>
    </section>
  );
}
