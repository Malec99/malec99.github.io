"use client";

import { Users, Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  availableRescuers: { id: string; name: string; serialNumber: string }[];
}

export function Sidebar({ availableRescuers }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card">
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
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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
