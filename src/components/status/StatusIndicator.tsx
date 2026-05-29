"use client";

import { useHealth } from "@/lib/health/use-health";
import type { HealthStatus } from "@/lib/health/types";

const dotClass: Record<HealthStatus, string> = {
  loading: "bg-text-hint",
  online: "bg-accent-green",
  offline: "bg-red-400",
};

export function StatusIndicator({ className }: { className?: string }) {
  const { status, metrics } = useHealth();

  const text =
    status === "online"
      ? `infra: online · uptime ${metrics?.uptime ?? "—"}`
      : status === "offline"
        ? "infra: offline"
        : "vérification...";

  const label =
    status === "online"
      ? `Infrastructure en ligne, uptime ${metrics?.uptime ?? ""}`
      : status === "offline"
        ? "Infrastructure hors ligne"
        : "Vérification du statut de l'infrastructure";

  return (
    <span
      className={`flex items-center gap-2 font-mono text-xs text-text-muted ${className ?? ""}`}
      aria-label={label}
    >
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
      {text}
    </span>
  );
}
