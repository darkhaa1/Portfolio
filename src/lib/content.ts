export const siteConfig = {
  title: "Darkhansukh G. — Portfolio AIS",
  description:
    "Étudiant systèmes, réseaux et cybersécurité. Je conçois, déploie et sécurise des infrastructures auto-hébergées production-grade.",
  url: "https://darkhaa.dev",
  locale: "fr_FR",
};

export const navLinks = [
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Projet", href: "#projet" },
  { label: "Compétences", href: "#competences" },
  { label: "Parcours", href: "#parcours" },
] as const;

export const hero = {
  badge: "Disponible — alternance AIS · septembre 2026",
  whoami: "Darkhansukh G.",
  headline: "Je construis et sécurise des infrastructures",
  pitch:
    "Étudiant systèmes, réseaux et cybersécurité — je conçois, déploie et protège des infrastructures auto-hébergées production-grade, du serveur nu au HTTPS A+.",
  selfHostedNote:
    "Ce site est auto-hébergé sur ma propre infrastructure Proxmox + Caddy.",
};

export const infraLayers = [
  {
    number: "01",
    name: "Cloudflare",
    details: "WAF · CDN · DDoS · TLS edge",
  },
  {
    number: "02",
    name: "Firewall hébergeur",
    details: "Filtrage réseau en amont",
  },
  {
    number: "03",
    name: "Firewall Proxmox",
    details: "DROP par défaut",
  },
  {
    number: "04",
    name: "SSH hardening",
    details: "Clés ed25519 uniquement",
  },
  {
    number: "05",
    name: "fail2ban",
    details: "Ban dynamique des IP",
  },
  {
    number: "06",
    name: "Tailscale",
    details: "Accès admin privé chiffré",
  },
] as const;

export const infraBadges = [
  { label: "SSL Labs A+", variant: "teal" as const },
  { label: "Caddy", variant: "default" as const },
  { label: "NAT/LXC", variant: "default" as const },
  { label: "LVM-thin", variant: "default" as const },
];

export const infraRepo = {
  label: "tusch-infra",
  url: "https://github.com/darkhaa1/tusch-infra",
};

export const projet = {
  title: "tusch.mn",
  description:
    "Marketplace de services pour la Mongolie — conçue, développée, déployée et sécurisée de A à Z. Pas juste codé une app, géré tout le cycle jusqu'à la prod sécurisée.",
  stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "pnpm monorepo"],
  links: {
    site: "https://tusch.mn",
  },
};

export const competences = {
  infra: {
    title: "Systèmes / Réseau / Sécurité",
    items: [
      "Linux",
      "Debian",
      "Proxmox VE",
      "LXC",
      "Caddy",
      "Cloudflare",
      "Tailscale",
      "iptables/nftables",
      "SSH hardening",
      "Let's Encrypt",
    ],
  },
  dev: {
    title: "Développement",
    items: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Node.js",
      "React",
      "TailwindCSS",
    ],
  },
  learning: {
    title: "En cours d'acquisition",
    items: [
      "OPNsense",
      "Suricata",
      "Wazuh",
      "Ansible",
      "Prometheus/Grafana/Loki",
      "Authentik",
    ],
  },
};

export const contact = {
  availability:
    "Disponible pour une alternance AIS à partir de septembre 2026 — région Saint-Étienne",
  links: {
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/darkhansukh-ganburel-7398a5311/",
    },
    github: {
      label: "GitHub",
      url: "https://github.com/darkhaa1",
    },
    email: {
      label: "g.darhansuh@gmail.com",
      url: "mailto:g.darhansuh@gmail.com",
    },
    telephone: {
      label: "+33 7 69 69 60 42",
      url: "tel:+33769696042",
    },
  },
};
