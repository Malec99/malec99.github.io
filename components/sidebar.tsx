"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  availableRescuers: {
    id: string;
    name: string;
    serialNumber: string;
    oxygenLevel: number;
    exitTime: number;
  }[];
}

export function Sidebar({ availableRescuers }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-80 border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold uppercase">Dostępne PM</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs font-medium text-muted-foreground">
                SN
              </th>
              <th className="text-right py-2 text-xs font-medium text-muted-foreground">
                Powietrze [L]
              </th>
              <th className="text-right py-2 text-xs font-medium text-muted-foreground">
                Czas wyjścia
              </th>
            </tr>
          </thead>
          <tbody>
            {availableRescuers.map((rescuer) => (
              <tr
                key={rescuer.id}
                className="border-b border-border last:border-0 hover:bg-secondary/20 cursor-pointer"
              >
                <td className="py-2 font-mono font-bold">
                  {rescuer.serialNumber}
                </td>
                <td className="py-2 text-right font-mono">
                  {rescuer.oxygenLevel}
                </td>
                <td className="py-2 text-right font-mono">
                  {rescuer.exitTime} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </aside>
  );
}
