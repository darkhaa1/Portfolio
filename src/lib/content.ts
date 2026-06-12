export const siteConfig = {
  title: "Darkhansukh G. — Portfolio AIS",
  description:
    "Étudiant systèmes, réseaux et cybersécurité. Je conçois, déploie et sécurise des infrastructures auto-hébergées production-grade.",
  url: "https://darkhaa.dev",
  locale: "fr_FR",
};

export const navLinks = [
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Projet", href: "/#projet" },
  { label: "Compétences", href: "/#competences" },
  { label: "Parcours", href: "/#parcours" },
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

// Teaser affiché sur la page d'accueil, renvoie vers /infrastructure
export const infraTeaser = {
  lead:
    "Du serveur nu au HTTPS A+ : défense en profondeur, segmentation réseau VLAN, supervision temps réel et administration hors-bande. Toute l'architecture est schématisée.",
  cta: "Explorer l'architecture",
  href: "/infrastructure",
};

// En-tête de la page /infrastructure
export const infraPage = {
  eyebrow: "architecture",
  title: "Infrastructure",
  intro:
    "Une infrastructure auto-hébergée production-grade : un serveur dédié, un hyperviseur Proxmox, deux environnements isolés, et une administration qui n'expose aucun port sur Internet. Survole — ou touche — un nœud pour voir son rôle et les choix techniques.",
};

// Description de chaque nœud du diagramme d'architecture.
// Aucune IP, aucun port, aucun identifiant : uniquement des rôles et des flux.
export const infraNodes = {
  internet: {
    name: "Internet",
    role: "Trafic entrant public",
    detail:
      "Point d'entrée public. Tout le trafic web passe par Cloudflare avant d'atteindre l'origine — l'adresse du serveur n'est jamais exposée directement.",
  },
  cloudflare: {
    name: "Cloudflare",
    role: "DNS · CDN · WAF",
    detail:
      "Proxy en amont : résolution DNS, cache CDN, pare-feu applicatif (WAF), mitigation DDoS et terminaison TLS côté edge. Filtre le trafic malveillant avant qu'il n'atteigne le serveur.",
  },
  hetznerFw: {
    name: "Firewall Hetzner",
    role: "Filtrage réseau amont",
    detail:
      "Pare-feu de l'hébergeur, en amont du serveur. Seuls les flux strictement nécessaires au trafic web sont autorisés ; tout le reste est bloqué au niveau réseau.",
  },
  server: {
    name: "Serveur dédié Hetzner",
    role: "Hôte bare-metal",
    detail:
      "Serveur dédié physique qui héberge l'hyperviseur. SSH durci (clés ed25519 uniquement, authentification par mot de passe et login root désactivés) et fail2ban en première ligne.",
  },
  proxmox: {
    name: "Proxmox VE 8",
    role: "Hyperviseur · LXC / KVM",
    detail:
      "Hyperviseur qui isole chaque service dans son propre conteneur ou VM. Pare-feu intégré en politique DROP par défaut. Deux environnements distincts cohabitent : production et lab.",
  },
  caddy: {
    name: "Caddy",
    role: "Reverse proxy · TLS auto",
    detail:
      "Reverse proxy de l'environnement de production. Termine le TLS avec renouvellement automatique des certificats, et route le trafic vers les applications du LAN privé.",
  },
  tusch: {
    name: "tusch.mn",
    role: "Next.js · NestJS · PostgreSQL",
    detail:
      "Marketplace de services — frontend Next.js, API NestJS, base PostgreSQL. Conçue, développée, déployée et sécurisée de bout en bout.",
  },
  portfolio: {
    name: "darkhaa.dev",
    role: "Portfolio · Next.js",
    detail:
      "Ce site. Build statique Next.js servi par Caddy depuis le même environnement de production.",
  },
  supervision: {
    name: "Supervision",
    role: "Prometheus · Grafana · Alertmanager",
    detail:
      "Conteneur dédié : Prometheus collecte les métriques, Grafana les visualise, Alertmanager déclenche les alertes et les pousse en temps réel sur Telegram.",
  },
  opnsense: {
    name: "OPNsense",
    role: "Pare-feu · routage inter-VLAN",
    detail:
      "Pare-feu du laboratoire. Route et filtre le trafic entre les VLANs et applique les règles inter-segments.",
  },
  vlans: {
    name: "VLANs SERVEURS / CLIENTS",
    role: "Segmentation 802.1Q",
    detail:
      "Deux VLANs taggés 802.1Q isolent les serveurs des postes clients. Aucune communication latérale implicite entre les segments.",
  },
  suricata: {
    name: "Suricata",
    role: "IDS / IPS inline",
    detail:
      "Détection et prévention d'intrusion en inline : inspecte le trafic, détecte les signatures malveillantes et bloque en temps réel.",
  },
  tailscale: {
    name: "Tailscale",
    role: "VPN admin chiffré",
    detail:
      "Toute l'administration passe par un réseau maillé WireGuard chiffré. Aucun port d'administration n'est exposé sur Internet : pas de SSH public, aucun panneau ouvert.",
  },
} as const;

export type InfraNodeId = keyof typeof infraNodes;

// Sécurité — défense en profondeur (sous le diagramme)
export const infraSecurity = {
  title: "Sécurité — défense en profondeur",
  intro: "Chaque couche part du principe que la précédente peut tomber.",
  items: [
    {
      name: "Firewall amont",
      detail:
        "Cloudflare WAF puis pare-feu Hetzner filtrent le trafic avant même qu'il n'atteigne le serveur.",
    },
    {
      name: "Hardening SSH",
      detail:
        "Authentification par clés ed25519 uniquement, mot de passe et login root désactivés.",
    },
    {
      name: "fail2ban",
      detail: "Bannissement dynamique des sources qui tentent du brute-force.",
    },
    {
      name: "Firewall hyperviseur",
      detail:
        "Politique DROP par défaut sur Proxmox ; seuls les flux nécessaires sont autorisés.",
    },
    {
      name: "Segmentation VLAN",
      detail:
        "VLANs 802.1Q isolant serveurs et clients — pas de mouvement latéral implicite.",
    },
    {
      name: "IDS / IPS Suricata",
      detail:
        "Inspection inline du trafic, détection et blocage des signatures malveillantes.",
    },
  ],
};

// Supervision (sous le diagramme)
export const infraSupervision = {
  title: "Supervision",
  intro: "Métriques collectées sur 5 nœuds, alerting temps réel.",
  points: [
    "Prometheus scrape les métriques système et applicatives des 5 nœuds.",
    "Grafana centralise les tableaux de bord (CPU, RAM, disque, réseau, services).",
    "Alertmanager déclenche les alertes sur seuils.",
    "Notifications poussées en temps réel sur Telegram.",
  ],
};

export const infraBadges = [
  { label: "SSL Labs A+", variant: "teal" as const },
  { label: "Suricata IDS/IPS", variant: "teal" as const },
  { label: "Prometheus / Grafana", variant: "teal" as const },
  { label: "Caddy", variant: "default" as const },
  { label: "VLANs 802.1Q", variant: "default" as const },
  { label: "NAT/LXC", variant: "default" as const },
  { label: "LVM-thin", variant: "default" as const },
];

export const infraRepo = {
  intro:
    "J'ai documenté toute la mise en place de cette infrastructure — choix techniques, configurations anonymisées, pièges rencontrés et résolus. Le tout est public sur GitHub.",
  cta: "Explorer le dépôt →",
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
      "OPNsense",
      "VLANs 802.1Q",
      "Suricata IDS/IPS",
      "Caddy",
      "Cloudflare",
      "Tailscale",
      "iptables/nftables",
      "SSH hardening",
      "Let's Encrypt",
      "Prometheus",
      "Grafana",
      "Alertmanager",
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
      "Wazuh",
      "Ansible",
      "Loki",
      "Authentik",
    ],
  },
};

export const contact = {
  availability:
    "Disponible pour une alternance AIS à partir de septembre 2026 — région Saint-Étienne",
  links: {
    email: {
      value: "g.darhansuh@gmail.com",
      href: "mailto:g.darhansuh@gmail.com",
    },
    github: {
      value: "github.com/darkhaa1",
      href: "https://github.com/darkhaa1",
    },
    linkedin: {
      value: "linkedin.com/in/darkhansukh",
      href: "https://www.linkedin.com/in/darkhansukh/",
    },
    phone: {
      value: "+33 7 69 69 60 42",
      href: "tel:+33769696042",
    },
  },
};
