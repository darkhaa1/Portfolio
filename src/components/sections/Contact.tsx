import { Mail, Phone, FileText, ArrowUpRight, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { contact } from "@/lib/content";
import { cvUrl } from "@/data/parcours";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

interface ContactEntry {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: IconComponent;
  action: IconComponent;
  external: boolean;
  download: boolean;
  accent: "cyan" | "green";
  ariaLabel: string;
}

const entries: ContactEntry[] = [
  {
    key: "email",
    label: "Email",
    value: contact.links.email.value,
    href: contact.links.email.href,
    icon: Mail,
    action: ArrowUpRight,
    external: false,
    download: false,
    accent: "cyan",
    ariaLabel: `Envoyer un email à ${contact.links.email.value}`,
  },
  {
    key: "github",
    label: "GitHub",
    value: contact.links.github.value,
    href: contact.links.github.href,
    icon: GithubIcon,
    action: ArrowUpRight,
    external: true,
    download: false,
    accent: "cyan",
    ariaLabel: `Voir mon profil GitHub (${contact.links.github.value})`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: contact.links.linkedin.value,
    href: contact.links.linkedin.href,
    icon: LinkedinIcon,
    action: ArrowUpRight,
    external: true,
    download: false,
    accent: "cyan",
    ariaLabel: "Voir mon profil LinkedIn",
  },
  {
    key: "phone",
    label: "Téléphone",
    value: contact.links.phone.value,
    href: contact.links.phone.href,
    icon: Phone,
    action: ArrowUpRight,
    external: false,
    download: false,
    accent: "cyan",
    ariaLabel: `Appeler le ${contact.links.phone.value}`,
  },
  {
    key: "cv",
    label: "CV (PDF)",
    value: "Télécharger mon CV",
    href: cvUrl,
    icon: FileText,
    action: Download,
    external: false,
    download: true,
    accent: "green",
    ariaLabel: "Télécharger mon CV au format PDF",
  },
];

function ContactCard({ entry }: { entry: ContactEntry }) {
  const { icon: Icon, action: Action } = entry;
  const isGreen = entry.accent === "green";

  return (
    <a
      href={entry.href}
      {...(entry.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...(entry.download ? { download: "" } : {})}
      aria-label={entry.ariaLabel}
      className="group flex items-center gap-3 rounded-[10px] border border-surface bg-bg-subtle p-3 transition-colors hover:border-accent/40"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
          isGreen
            ? "border-accent-green/30 bg-accent-green/8 text-accent-green"
            : "border-accent/30 bg-accent/8 text-accent"
        }`}
      >
        <Icon size={18} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-text-hint">
          {entry.label}
        </span>
        <span
          className={`block text-sm text-text-primary ${
            entry.key === "email" ? "break-all" : "wrap-break-word"
          }`}
        >
          {entry.value}
        </span>
      </span>

      <Action
        size={16}
        className={`shrink-0 ${
          isGreen ? "text-accent-green" : "text-text-faint group-hover:text-accent"
        }`}
      />
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-nav px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="06" title="Contact" />

        <div className="mx-auto flex max-w-md flex-col gap-1">
          {entries.map((entry) => (
            <ContactCard key={entry.key} entry={entry} />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm text-text-muted">
          {contact.availability}
        </p>
      </div>
    </section>
  );
}
