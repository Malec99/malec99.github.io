"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type TeamStatus = "standby" | "active" | "warning" | "danger";

export interface Firefighter {
  id: string;
  name: string;
  serialNumber: string;
  oxygenLevel: number;
  exitTime: number;
}

export interface Team {
  id: number;
  name: string;
  type: string;
  exitTime: number;
  status: TeamStatus;
  firefighters: [Firefighter, Firefighter];
}

interface TeamCardProps {
  team: Team;
  onUpdate: (team: Team) => void;
}

const statusBadgeStyles: Record<TeamStatus, string> = {
  standby: "bg-muted text-muted-foreground",
  active: "bg-status-safe text-status-safe-foreground",
  warning: "bg-status-warning text-status-warning-foreground",
  danger: "bg-status-danger text-status-danger-foreground",
};

const getOxygenBgColor = (level: number) => {
  if (level >= 200) return "bg-status-safe text-status-safe-foreground";
  if (level >= 100) return "bg-status-warning text-status-warning-foreground";
  return "bg-status-danger text-status-danger-foreground";
};

export function TeamCard({ team, onUpdate }: TeamCardProps) {
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

  return (
    <Card className="bg-card border border-border">
      <CardHeader
        className={cn("pb-2 pt-3 px-4", statusBadgeStyles[team.status])}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium opacity-70 uppercase leading-none">
                Zespół
              </span>
              <span className="text-2xl font-bold leading-none mt-0.5">
                {team.id}
              </span>
            </div>
            <Input
              value={team.type}
              onChange={(e) => updateTeam({ type: e.target.value })}
              className="h-7 w-24 text-sm font-semibold border-0 bg-black/10 px-2"
              placeholder="Typ"
            />
          </div>
          <Select
            value={team.status}
            onValueChange={(value: TeamStatus) => updateTeam({ status: value })}
          >
            <SelectTrigger className="h-7 w-28 text-xs border-0 font-medium bg-black/10">
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
      </CardHeader>
      <CardContent className="px-4 pb-3 space-y-2">
        {team.firefighters.map((ff, idx) => (
          <FirefighterRow
            key={ff.id}
            firefighter={ff}
            label={idx === 0 ? "A" : "B"}
            onUpdate={(updates) => updateFirefighter(idx as 0 | 1, updates)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface FirefighterRowProps {
  firefighter: Firefighter;
  label: string;
  onUpdate: (updates: Partial<Firefighter>) => void;
}

function FirefighterRow({ firefighter, label, onUpdate }: FirefighterRowProps) {
  const getOxygenColor = (level: number) => {
    if (level >= 200) return "text-status-safe";
    if (level >= 100) return "text-status-warning";
    return "text-status-danger";
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-card hover:bg-secondary/20 transition-colors border border-border">
      <span
        className={cn(
          "w-8 h-8 rounded flex items-center justify-center text-base font-bold shrink-0",
          getOxygenBgColor(firefighter.oxygenLevel),
        )}
      >
        {label}
      </span>

      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground uppercase font-medium">
            S/N:
          </span>
          <Input
            value={firefighter.serialNumber}
            onChange={(e) => onUpdate({ serialNumber: e.target.value })}
            placeholder="S/N"
            className="h-5 w-12 text-xs font-mono font-bold border-0 bg-secondary/50 px-1"
          />
        </div>
        <Input
          value={firefighter.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="NAZWA"
          className="h-6 text-xs font-semibold border-0 bg-secondary/30 px-2 text-card-foreground uppercase"
        />
      </div>

      <div className="flex flex-col gap-1 items-end">
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted-foreground uppercase">
            Pow:
          </span>
          <Input
            type="number"
            value={firefighter.oxygenLevel}
            onChange={(e) =>
              onUpdate({ oxygenLevel: parseInt(e.target.value) || 0 })
            }
            className={cn(
              "h-6 w-14 text-sm text-center border-0 p-0 font-mono font-bold bg-secondary/50",
              getOxygenColor(firefighter.oxygenLevel),
            )}
          />
          <span className="text-[9px] text-muted-foreground">bar</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted-foreground uppercase">
            Wyj:
          </span>
          <Input
            type="number"
            value={firefighter.exitTime}
            onChange={(e) =>
              onUpdate({ exitTime: parseInt(e.target.value) || 0 })
            }
            className="h-6 w-12 text-sm text-center border-0 p-0 font-mono font-bold bg-secondary/50 text-card-foreground"
          />
          <span className="text-[9px] text-muted-foreground">min</span>
        </div>
      </div>
    </div>
  );
}
