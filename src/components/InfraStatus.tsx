"use client";

import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/infra-status";

type Status = "loading" | "online" | "offline";

const FETCH_TIMEOUT_MS = 5000;

export function InfraStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [uptimeDays, setUptimeDays] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    fetchHealth(controller.signal)
      .then((data) => {
        if (!active) return;
        if (data.status === "ok") {
          setUptimeDays(data.uptime_days);
          setStatus("online");
        } else {
          setStatus("offline");
        }
      })
      .catch(() => {
        if (active) setStatus("offline");
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const config = {
    loading: {
      dot: "bg-text-hint",
      pulse: false,
      text: "vérification...",
      label: "Statut de l'infrastructure : vérification en cours",
    },
    online: {
      dot: "bg-accent-green",
      pulse: true,
      text: `infra: online · ${uptimeDays ?? 0}j`,
      label: `Statut de l'infrastructure : en ligne, ${uptimeDays ?? 0} jours d'activité`,
    },
    offline: {
      dot: "bg-red-500",
      pulse: false,
      text: "infra: offline",
      label: "Statut de l'infrastructure : hors ligne",
    },
  }[status];

  return (
    <span
      className={`flex items-center gap-2 font-mono text-xs text-text-muted ${className ?? ""}`}
      role="status"
      aria-label={config.label}
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-dot ${config.dot}`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`}
        />
      </span>
      {config.text}
    </span>
  );
}
