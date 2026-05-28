export interface HealthResponse {
  status: string;
  uptime_seconds: number;
  uptime_days: number;
}

export const HEALTH_URL =
  process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.darkhaa.dev";

export async function fetchHealth(signal: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(HEALTH_URL, { signal });
  if (!res.ok) {
    throw new Error(`Health endpoint responded with ${res.status}`);
  }
  return (await res.json()) as HealthResponse;
}
