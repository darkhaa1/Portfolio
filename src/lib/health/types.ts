export interface HealthData {
  status: string;
  uptime_seconds: number;
  last_boot: string;
}

export type HealthStatus = "loading" | "online" | "offline";

export interface HealthMetrics {
  serviceSince: string;
  uptime: string;
  lastBoot: string;
}

export interface HealthState {
  status: HealthStatus;
  metrics: HealthMetrics | null;
}
