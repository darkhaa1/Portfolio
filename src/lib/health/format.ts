import type { HealthData, HealthMetrics } from "./types";

// Date de mise en service de l'infrastructure (fixe).
export const SERVICE_SINCE = "2026-05-13";

// 'Xj Yh' en sautant les unités à zéro (0 jour → 'Yh', 0 heure → 'Xj').
export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const days = Math.floor(safe / 86400);
  const hours = Math.floor((safe % 86400) / 3600);
  if (days === 0) return `${hours}h`;
  if (hours === 0) return `${days}j`;
  return `${days}j ${hours}h`;
}

// 'il y a Xj' (jours uniquement).
export function formatRelativeDays(fromMs: number, nowMs: number): string {
  const days = Math.max(0, Math.floor((nowMs - fromMs) / 86_400_000));
  return `il y a ${days}j`;
}

// Parse "YYYY-MM-DD HH:mm:ss" comme heure locale (format non-ISO de l'endpoint).
export function parseLocalDateTime(value: string): Date {
  const [datePart, timePart = "00:00:00"] = value.trim().split(/\s+/);
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi, s] = timePart.split(":").map(Number);
  return new Date(y, (mo ?? 1) - 1, d ?? 1, h ?? 0, mi ?? 0, s ?? 0);
}

// 'DD/MM à HH:mm · il y a Xj'.
export function formatLastBoot(value: string, nowMs: number): string {
  const date = parseLocalDateTime(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  const formatted = `${pad(date.getDate())}/${pad(date.getMonth() + 1)} à ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${formatted} · ${formatRelativeDays(date.getTime(), nowMs)}`;
}

// Secondes écoulées depuis SERVICE_SINCE jusqu'à maintenant.
export function serviceSinceSeconds(nowMs: number): number {
  const since = parseLocalDateTime(`${SERVICE_SINCE} 00:00:00`).getTime();
  return (nowMs - since) / 1000;
}

export function computeMetrics(
  data: HealthData,
  nowMs: number = Date.now(),
): HealthMetrics {
  return {
    serviceSince: formatDuration(serviceSinceSeconds(nowMs)),
    uptime: formatDuration(data.uptime_seconds),
    lastBoot: formatLastBoot(data.last_boot, nowMs),
  };
}
