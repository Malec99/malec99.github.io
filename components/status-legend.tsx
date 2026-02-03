"use client";

import { cn } from "@/lib/utils";

const statuses = [
  { key: "standby", label: "Gotowy", color: "bg-muted" },
  { key: "active", label: "W środku", color: "bg-status-safe" },
  { key: "warning", label: "Ostrzeżenie", color: "bg-status-warning" },
  { key: "danger", label: "Krytyczny", color: "bg-status-danger" },
];

export function StatusLegend() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-card/50">
      <span className="text-xs text-muted-foreground font-medium">Legenda:</span>
      <div className="flex items-center gap-3 flex-wrap">
        {statuses.map((status) => (
          <div key={status.key} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded", status.color)} />
            <span className="text-xs text-muted-foreground">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
