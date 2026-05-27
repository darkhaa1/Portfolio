import { Server } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-darker px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="flex items-center gap-2 font-mono text-xs text-text-hint">
          <Server size={12} />
          Auto-hébergé — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
