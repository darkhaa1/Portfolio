"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { InfraStatus } from "@/components/InfraStatus";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-bg-darker/80 backdrop-blur-md"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="font-mono text-lg font-semibold">
          <span className="text-accent">~/</span>Darkhansukh
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <InfraStatus />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-md border border-accent px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg-darker md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            <InfraStatus className="mb-2" />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded-md border border-accent px-4 py-2 text-center text-sm font-medium text-accent transition-colors hover:bg-accent/10"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
