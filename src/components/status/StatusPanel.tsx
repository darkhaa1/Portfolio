"use client";

import { CalendarClock, Activity, RefreshCw } from "lucide-react";
import { useHealth } from "@/lib/health/use-health";
import type { HealthStatus } from "@/lib/health/types";

const dotClass: Record<HealthStatus, string> = {
  loading: "bg-text-hint",
  online: "bg-accent-green",
  offline: "bg-red-400",
};

const stateLabel: Record<HealthStatus, string> = {
  loading: "vérification...",
  online: "online",
  offline: "offline",
};

const stateColor: Record<HealthStatus, string> = {
  loading: "text-text-hint",
  online: "text-accent-green",
  offline: "text-red-400",
};

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={14} className="mt-0.5 shrink-0 text-accent" />
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wider text-text-hint">
          {label}
        </div>
        <div className="text-sm text-text-primary">{value}</div>
      </div>
    </div>
  );
}

export function StatusPanel({ className }: { className?: string }) {
  const { status, metrics } = useHealth();

  return (
    <aside
      aria-label="Statut de l'infrastructure en temps réel"
      aria-live="polite"
      className={`relative w-full rounded-lg border border-surface bg-bg-primary p-4 shadow-xl shadow-black/30 lg:fixed lg:top-20 lg:right-6 lg:z-40 lg:w-80 ${className ?? ""}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-sm text-text-primary">
          <span className="text-accent">$ </span>statut infra
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            {status === "online" && (
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-dot ${dotClass[status]}`}
              />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${dotClass[status]}`}
            />
          </span>
          <span className={stateColor[status]}>{stateLabel[status]}</span>
        </span>
      </div>

      <div className="space-y-3">
        <MetricRow
          icon={CalendarClock}
          label="En service depuis"
          value={metrics?.serviceSince ?? "—"}
        />
        <MetricRow
          icon={Activity}
          label="Uptime (depuis dernier boot)"
          value={metrics?.uptime ?? "—"}
        />
        <MetricRow
          icon={RefreshCw}
          label="Dernier redémarrage"
          value={metrics?.lastBoot ?? "—"}
        />
      </div>

      <p className="mt-4 border-t border-surface pt-3 font-mono text-[11px] leading-relaxed text-text-faint">
        Redémarrages planifiés à 04:00 pour appliquer les mises à jour de
        sécurité du noyau.
      </p>
    </aside>
  );
}
