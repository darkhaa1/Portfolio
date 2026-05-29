export interface HealthResponse {
  status: string;
  uptime_seconds: number;
  last_boot: string;
}

export const HEALTH_URL =
  process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.darkhaa.dev";

// Date de mise en service de l'infrastructure (fixe).
export const SERVICE_SINCE = "2026-05-13";

export async function fetchHealth(signal: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(HEALTH_URL, { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Health endpoint responded with ${res.status}`);
  }
  return (await res.json()) as HealthResponse;
}

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
export function relativeDays(fromMs: number, nowMs: number): string {
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

// 'DD/MM à HH:mm'.
export function formatBootDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} à ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Secondes écoulées depuis SERVICE_SINCE jusqu'à maintenant.
export function serviceSinceSeconds(nowMs: number): number {
  const since = parseLocalDateTime(`${SERVICE_SINCE} 00:00:00`).getTime();
  return (nowMs - since) / 1000;
}
