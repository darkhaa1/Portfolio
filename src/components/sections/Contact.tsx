import { Link2, Code2, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  linkedin: Link2,
  github: Code2,
  email: Mail,
  telephone: Phone,
};

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading number="06" title="Contact" />

        <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            {Object.entries(contact.links).map(([key, link]) => {
              const Icon = iconMap[key];
              const isExternal = key !== "email" && key !== "telephone";
              return (
                <a
                  key={key}
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
                  aria-label={link.label}
                >
                  {Icon && <Icon size={18} />}
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
