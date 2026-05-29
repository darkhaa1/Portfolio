"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { computeMetrics } from "./format";
import type { HealthData, HealthState } from "./types";

const HEALTH_URL =
  process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.darkhaa.dev";
const FETCH_TIMEOUT_MS = 5000;
const POLL_INTERVAL_MS = 60_000;

const HealthContext = createContext<HealthState>({
  status: "loading",
  metrics: null,
});

export function HealthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HealthState>({
    status: "loading",
    metrics: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      try {
        const res = await fetch(HEALTH_URL, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Health endpoint responded ${res.status}`);
        const data = (await res.json()) as HealthData;
        if (!active) return;
        if (data.status === "ok") {
          setState({ status: "online", metrics: computeMetrics(data) });
        } else {
          setState((prev) => ({ status: "offline", metrics: prev.metrics }));
        }
      } catch {
        if (active) {
          setState((prev) => ({ status: "offline", metrics: prev.metrics }));
        }
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

  return createElement(HealthContext.Provider, { value: state }, children);
}

export function useHealth(): HealthState {
  return useContext(HealthContext);
}
