"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, Activity, RefreshCw } from "lucide-react";
import {
  fetchHealth,
  formatDuration,
  formatBootDate,
  parseLocalDateTime,
  relativeDays,
  serviceSinceSeconds,
  type HealthResponse,
} from "@/lib/infra-status";

type Status = "loading" | "online" | "offline";

const FETCH_TIMEOUT_MS = 5000;
const POLL_INTERVAL_MS = 60_000;

interface Metrics {
  service: string;
  uptime: string;
  boot: string;
}

function computeMetrics(data: HealthResponse): Metrics {
  const now = Date.now();
  const bootDate = parseLocalDateTime(data.last_boot);
  return {
    service: formatDuration(serviceSinceSeconds(now)),
    uptime: formatDuration(data.uptime_seconds),
    boot: `${formatBootDate(bootDate)} · ${relativeDays(bootDate.getTime(), now)}`,
  };
}

const dotClass: Record<Status, string> = {
  loading: "bg-text-hint",
  online: "bg-accent-green",
  offline: "bg-red-500",
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
        <div className="text-sm text-text-secondary">{value}</div>
      </div>
    </div>
  );
}

export function InfraStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      try {
        const data = await fetchHealth(controller.signal);
        if (!active) return;
        if (data.status === "ok") {
          setMetrics(computeMetrics(data));
          setStatus("online");
        } else {
          setStatus("offline");
        }
      } catch {
        if (active) setStatus("offline");
      } finally {
        clearTimeout(timeout);
      }
    };

    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      active = false;
      clearInterval(poll);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const dot = dotClass[status];
  const compactText =
    status === "online"
      ? `infra: online · uptime ${metrics?.uptime ?? "—"}`
      : status === "offline"
        ? "infra: offline"
        : "vérification...";
  const stateLabel =
    status === "online"
      ? "Infrastructure en ligne"
      : status === "offline"
        ? "Infrastructure hors ligne"
        : "Vérification du statut de l'infrastructure";

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
        }
      }}
    >
      <span className="sr-only" role="status" aria-live="polite">
        {stateLabel}
      </span>

      <button
        ref={buttonRef}
        type="button"
        className="flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${stateLabel}. Voir le détail.`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="relative flex h-2 w-2">
          {status === "online" && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-dot ${dot}`}
            />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
        </span>
        {compactText}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Détail du statut de l'infrastructure"
          tabIndex={-1}
          className="absolute left-0 top-full z-50 mt-2 w-72 origin-top rounded-lg border border-border bg-bg-darker p-4 shadow-xl shadow-black/40 animate-fade-in"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-sm text-text-primary">
              <span className="text-accent">$ </span>statut infra
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <span className={`h-2 w-2 rounded-full ${dot}`} />
              <span
                className={
                  status === "online"
                    ? "text-accent-green"
                    : status === "offline"
                      ? "text-red-400"
                      : "text-text-hint"
                }
              >
                {status === "online"
                  ? "online"
                  : status === "offline"
                    ? "offline"
                    : "..."}
              </span>
            </span>
          </div>

          <div className="space-y-3">
            <MetricRow
              icon={Calendar}
              label="En service depuis"
              value={metrics?.service ?? "—"}
            />
            <MetricRow
              icon={Activity}
              label="Uptime (depuis dernier boot)"
              value={metrics?.uptime ?? "—"}
            />
            <MetricRow
              icon={RefreshCw}
              label="Dernier redémarrage (MAJ auto)"
              value={metrics?.boot ?? "—"}
            />
          </div>

          <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-text-hint">
            Redémarrages planifiés à 04:00 pour appliquer les mises à jour de
            sécurité du noyau.
          </p>
        </div>
      )}
    </div>
  );
}
