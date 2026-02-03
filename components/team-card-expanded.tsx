"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Team, TeamStatus, Firefighter } from "./team-card";

interface TeamCardExpandedProps {
  team: Team;
  onUpdate: (team: Team) => void;
}

const statusBadgeStyles: Record<TeamStatus, string> = {
  standby: "bg-muted text-muted-foreground",
  active: "bg-status-safe text-status-safe-foreground",
  warning: "bg-status-warning text-status-warning-foreground",
  danger: "bg-status-danger text-status-danger-foreground",
};

export function TeamCardExpanded({ team, onUpdate }: TeamCardExpandedProps) {
  const updateFirefighter = (index: 0 | 1, updates: Partial<Firefighter>) => {
    const newFirefighters = [...team.firefighters] as [
      Firefighter,
      Firefighter,
    ];
    newFirefighters[index] = { ...newFirefighters[index], ...updates };
    onUpdate({ ...team, firefighters: newFirefighters });
  };

  const updateTeam = (updates: Partial<Team>) => {
    onUpdate({ ...team, ...updates });
  };

  const getOxygenColor = (level: number) => {
    if (level >= 200) return "text-status-safe";
    if (level >= 100) return "text-status-warning";
    return "text-status-danger";
  };

  const getOxygenBgColor = (level: number) => {
    if (level >= 200) return "bg-status-safe text-status-safe-foreground";
    if (level >= 100) return "bg-status-warning text-status-warning-foreground";
    return "bg-status-danger text-status-danger-foreground";
  };

  return (
    <Card className="bg-card border border-border">
      {/* Team Header */}
      <div
        className={cn(
          "px-4 py-2 flex items-center gap-4 border-b-2 border-border",
          statusBadgeStyles[team.status],
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium opacity-70 uppercase">
            Zespół
          </span>
          <span className="text-4xl font-bold leading-none">{team.id}</span>
        </div>

        <div className="h-8 w-px bg-border opacity-30" />

        <Input
          value={team.type}
          onChange={(e) => updateTeam({ type: e.target.value })}
          className="h-8 w-40 text-base font-semibold border-0 bg-black/10 px-3"
          placeholder="Typ zespołu"
        />

        <Select
          value={team.status}
          onValueChange={(value: TeamStatus) => updateTeam({ status: value })}
        >
          <SelectTrigger className="h-8 w-32 text-sm border-0 font-medium bg-black/10 ml-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standby">Gotowy</SelectItem>
            <SelectItem value="active">W środku</SelectItem>
            <SelectItem value="warning">Ostrzeżenie</SelectItem>
            <SelectItem value="danger">Krytyczny</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Firefighter Rows */}
      <div className="bg-card divide-y divide-border">
        {team.firefighters.map((ff, idx) => (
          <div
            key={ff.id}
            className="flex items-center hover:bg-secondary/20 transition-colors"
          >
            {/* Firefighter Label */}
            <div
              className={cn(
                "w-16 h-full flex items-center justify-center text-3xl font-bold border-r border-border py-3",
                getOxygenBgColor(ff.oxygenLevel),
              )}
            >
              {idx === 0 ? "A" : "B"}
            </div>

            {/* Firefighter Data - Horizontal Flow */}
            <div className="flex-1 flex items-center gap-6 px-4 py-3">
              {/* S/N and Name */}
              <div className="flex items-center gap-3 min-w-[240px]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground uppercase font-medium">
                    S/N:
                  </span>
                  <Input
                    value={ff.serialNumber}
                    onChange={(e) =>
                      updateFirefighter(idx as 0 | 1, {
                        serialNumber: e.target.value,
                      })
                    }
                    className="h-7 w-16 text-sm font-mono font-bold border bg-secondary/50 px-2"
                  />
                </div>
                <Input
                  value={ff.name}
                  onChange={(e) =>
                    updateFirefighter(idx as 0 | 1, { name: e.target.value })
                  }
                  placeholder="NAZWA"
                  className="h-8 flex-1 text-sm font-semibold border bg-secondary/30 px-3 text-card-foreground uppercase"
                />
              </div>

              {/* Oxygen Level */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase font-medium">
                  Powietrze:
                </span>
                <Input
                  type="number"
                  value={ff.oxygenLevel}
                  onChange={(e) =>
                    updateFirefighter(idx as 0 | 1, {
                      oxygenLevel: parseInt(e.target.value) || 0,
                    })
                  }
                  className={cn(
                    "h-9 w-20 text-xl text-center border-0 p-0 font-mono font-bold bg-secondary/50",
                    getOxygenColor(ff.oxygenLevel),
                  )}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  [BAR]
                </span>
              </div>

              {/* Exit Time */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase font-medium">
                  Czas wyjścia:
                </span>
                <Input
                  type="number"
                  value={ff.exitTime}
                  onChange={(e) =>
                    updateFirefighter(idx as 0 | 1, {
                      exitTime: parseInt(e.target.value) || 0,
                    })
                  }
                  className="h-9 w-16 text-xl text-center border-0 p-0 font-mono font-bold bg-secondary/50 text-card-foreground"
                />
                <span className="text-sm font-medium text-card-foreground">
                  min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
