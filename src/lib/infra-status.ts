// TODO: Replace with a real fetch to /health endpoint when available
export function getInfraStatus(): { online: boolean; uptime: string } {
  return {
    online: true,
    uptime: "99.9%",
  };
}
