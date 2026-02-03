"use client";

import { Users, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  availableRescuers: {
    id: string;
    name: string;
    serialNumber: string;
    oxygenLevel: number;
    exitTime: number;
  }[];
}

const getOxygenColor = (level: number) => {
  if (level >= 200) return "text-status-safe";
  if (level >= 100) return "text-status-warning";
  return "text-status-danger";
};

export function Sidebar({ availableRescuers }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-80 border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 text-foreground">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Ratownicy</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Lista dostępnych ratowników
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {availableRescuers.map((rescuer) => (
            <div
              key={rescuer.id}
              className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer border border-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {rescuer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    S/N: {rescuer.serialNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Pow:</span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      getOxygenColor(rescuer.oxygenLevel),
                    )}
                  >
                    {rescuer.oxygenLevel}
                  </span>
                  <span className="text-muted-foreground">bar</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Wyj:</span>
                  <span className="font-mono font-bold text-foreground">
                    {rescuer.exitTime}
                  </span>
                  <span className="text-muted-foreground">min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Przeciągnij ratownika do zespołu
        </p>
      </div>
    </aside>
  );
}
