"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, Globe, Network, ShieldAlert, BellRing } from "lucide-react";
import {
  CloudflareIcon,
  HetznerIcon,
  ProxmoxIcon,
  CaddyIcon,
  NextjsIcon,
  NestjsIcon,
  PostgresqlIcon,
  PrometheusIcon,
  GrafanaIcon,
  OpnsenseIcon,
  TailscaleIcon,
  TelegramIcon,
} from "@/components/ui/InfraIcons";
import { infraNodes, type InfraNodeId } from "@/lib/content";

type Tone = "web" | "lab" | "admin";

const tone = {
  web: {
    icon: "text-accent",
    iconBg: "border-accent/30 bg-accent/10",
    line: "bg-accent/40",
    chevron: "text-accent/70",
    activeBorder: "border-accent",
    activeGlow: "shadow-[0_0_22px_rgba(56,189,248,0.12)]",
    chip: "border-accent/30 bg-accent/10 text-accent",
  },
  lab: {
    icon: "text-accent-teal",
    iconBg: "border-accent-teal/30 bg-accent-teal/10",
    line: "bg-accent-teal/40",
    chevron: "text-accent-teal/70",
    activeBorder: "border-accent-teal",
    activeGlow: "shadow-[0_0_22px_rgba(93,202,165,0.12)]",
    chip: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
  },
  admin: {
    icon: "text-accent-green",
    iconBg: "border-accent-green/30 bg-accent-green/10",
    line: "bg-accent-green/50",
    chevron: "text-accent-green/70",
    activeBorder: "border-accent-green",
    activeGlow: "shadow-[0_0_22px_rgba(74,222,128,0.12)]",
    chip: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  },
} as const;

/** Petite icône secondaire (stack d'un nœud). */
function MiniIcon({ children, title }: { children: ReactNode; title: string }) {
  return (
    <span
      title={title}
      className="flex h-5 w-5 items-center justify-center rounded border border-border bg-bg-darker/60 text-text-muted"
    >
      {children}
    </span>
  );
}

interface NodeProps {
  id: InfraNodeId;
  icon: ReactNode;
  tone?: Tone;
  stack?: ReactNode;
  active: InfraNodeId | null;
  onActivate: (id: InfraNodeId | null) => void;
}

function Node({ id, icon, tone: t = "web", stack, active, onActivate }: NodeProps) {
  const data = infraNodes[id];
  const c = tone[t];
  const open = active === id;
  const tipId = useId();

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onMouseEnter={() => onActivate(id)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(id)}
        onBlur={() => onActivate(null)}
        onClick={() => onActivate(open ? null : id)}
        className={`group flex w-full items-center gap-3 rounded-lg border bg-surface px-3.5 py-3 text-left transition-all duration-200 ${
          open
            ? `${c.activeBorder} ${c.activeGlow} bg-bg-subtle`
            : "border-border hover:border-text-hint"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${c.iconBg} ${c.icon}`}
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-text-primary">
            {data.name}
          </span>
          <span className="block truncate font-mono text-[11px] text-text-muted">
            {data.role}
          </span>
        </span>
        {stack && <span className="flex shrink-0 items-center gap-1">{stack}</span>}
      </button>

      {open && (
        <div
          id={tipId}
          role="tooltip"
          className="animate-fade-in absolute left-0 right-0 top-full z-20 mt-2 rounded-lg border border-border bg-bg-darker p-3 text-xs leading-relaxed text-text-secondary shadow-xl shadow-black/40"
        >
          {data.detail}
        </div>
      )}
    </div>
  );
}

/** Flèche entre deux nœuds d'une même rangée : verticale en mobile, horizontale ≥ md. */
function RowArrow({ t = "web" }: { t?: Tone }) {
  return (
    <ChevronDown
      size={18}
      aria-hidden
      className={`mx-auto shrink-0 self-center md:-rotate-90 ${tone[t].chevron}`}
    />
  );
}

/** Connecteur vertical entre deux couches. */
function LayerConnector({
  t = "web",
  label,
  dashed = false,
}: {
  t?: Tone;
  label?: string;
  dashed?: boolean;
}) {
  const c = tone[t];
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <span
        className={`h-6 w-px ${dashed ? "border-l border-dashed " + c.activeBorder : c.line}`}
      />
      {label && (
        <span
          className={`my-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${c.chip}`}
        >
          {label}
        </span>
      )}
      <ChevronDown size={16} className={c.chevron} />
    </div>
  );
}

function LayerLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-hint">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function ArchitectureDiagram() {
  const [active, setActive] = useState<InfraNodeId | null>(null);
  const nodeProps = { active, onActivate: setActive };

  return (
    <div className="rounded-2xl border border-border bg-bg-subtle/40 p-4 sm:p-6">
      {/* Légende des flux */}
      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-6 rounded bg-accent" />
          Trafic web public
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0 w-6 rounded border-t-2 border-dashed border-accent-green" />
          Administration hors-bande
        </span>
        <span className="ml-auto hidden font-mono text-[11px] text-text-hint sm:block">
          survol / clic → détails
        </span>
      </div>

      {/* ── EDGE ── */}
      <LayerLabel>Edge — périmètre public</LayerLabel>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-1">
        <div className="md:flex-1">
          <Node id="internet" icon={<Globe size={18} />} {...nodeProps} />
        </div>
        <RowArrow />
        <div className="md:flex-1">
          <Node id="cloudflare" icon={<CloudflareIcon size={18} />} {...nodeProps} />
        </div>
        <RowArrow />
        <div className="md:flex-1">
          <Node id="hetznerFw" icon={<HetznerIcon size={18} />} {...nodeProps} />
        </div>
        <RowArrow />
        <div className="md:flex-1">
          <Node id="server" icon={<HetznerIcon size={18} />} {...nodeProps} />
        </div>
      </div>

      <LayerConnector label="trafic web" />

      {/* ── HYPERVISEUR ── */}
      <LayerLabel>Hyperviseur</LayerLabel>
      <div className="rounded-xl border border-border bg-bg-darker/30 p-3 sm:p-4">
        <div className="mb-4">
          <Node id="proxmox" icon={<ProxmoxIcon size={18} />} {...nodeProps} />
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {/* Production */}
          <div className="rounded-lg border border-accent/20 bg-accent/[0.03] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">
                Production
              </span>
              <span className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                LAN privé
              </span>
            </div>
            <Node id="caddy" icon={<CaddyIcon size={18} />} {...nodeProps} />
            <RowArrow />
            <div className="grid gap-2 sm:grid-cols-2">
              <Node
                id="tusch"
                icon={<NextjsIcon size={18} />}
                stack={
                  <>
                    <MiniIcon title="Next.js">
                      <NextjsIcon size={12} />
                    </MiniIcon>
                    <MiniIcon title="NestJS">
                      <NestjsIcon size={12} />
                    </MiniIcon>
                    <MiniIcon title="PostgreSQL">
                      <PostgresqlIcon size={12} />
                    </MiniIcon>
                  </>
                }
                {...nodeProps}
              />
              <Node id="portfolio" icon={<NextjsIcon size={18} />} {...nodeProps} />
            </div>
            <div className="mt-2">
              <Node
                id="supervision"
                icon={<PrometheusIcon size={18} />}
                stack={
                  <>
                    <MiniIcon title="Prometheus">
                      <PrometheusIcon size={12} />
                    </MiniIcon>
                    <MiniIcon title="Grafana">
                      <GrafanaIcon size={12} />
                    </MiniIcon>
                    <MiniIcon title="Alertmanager">
                      <BellRing size={12} />
                    </MiniIcon>
                    <MiniIcon title="Telegram">
                      <TelegramIcon size={12} />
                    </MiniIcon>
                  </>
                }
                {...nodeProps}
              />
            </div>
          </div>

          {/* Lab */}
          <div className="rounded-lg border border-accent-teal/20 bg-accent-teal/[0.03] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Lab</span>
              <span className="rounded border border-accent-teal/30 bg-accent-teal/10 px-2 py-0.5 font-mono text-[10px] text-accent-teal">
                réseau segmenté
              </span>
            </div>
            <Node id="opnsense" icon={<OpnsenseIcon size={18} />} tone="lab" {...nodeProps} />
            <RowArrow t="lab" />
            <Node id="vlans" icon={<Network size={18} />} tone="lab" {...nodeProps} />
            <RowArrow t="lab" />
            <Node id="suricata" icon={<ShieldAlert size={18} />} tone="lab" {...nodeProps} />
          </div>
        </div>
      </div>

      <LayerConnector t="admin" label="hors-bande" dashed />

      {/* ── ADMINISTRATION ── */}
      <LayerLabel>Administration</LayerLabel>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:max-w-sm sm:flex-1">
          <Node id="tailscale" icon={<TailscaleIcon size={18} />} tone="admin" {...nodeProps} />
        </div>
        <p className="font-mono text-xs leading-relaxed text-text-hint">
          Aucun port d&apos;administration n&apos;est exposé sur Internet — l&apos;accès
          passe uniquement par le tunnel chiffré.
        </p>
      </div>
    </div>
  );
}
