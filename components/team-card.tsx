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

const statusBorderStyles: Record<TeamStatus, string> = {
  standby: "border-border",
  active: "border-l-status-safe",
  warning: "border-l-status-warning",
  danger: "border-l-status-danger",
};

const statusBadgeStyles: Record<TeamStatus, string> = {
  standby: "bg-muted text-muted-foreground",
  active: "bg-status-safe text-status-safe-foreground",
  warning: "bg-status-warning text-status-warning-foreground",
  danger: "bg-status-danger text-status-danger-foreground",
};

export function TeamCard({ team, onUpdate }: TeamCardProps) {
  const updateFirefighter = (index: 0 | 1, updates: Partial<Firefighter>) => {
    const newFirefighters = [...team.firefighters] as [Firefighter, Firefighter];
    newFirefighters[index] = { ...newFirefighters[index], ...updates };
    onUpdate({ ...team, firefighters: newFirefighters });
  };

  const updateTeam = (updates: Partial<Team>) => {
    onUpdate({ ...team, ...updates });
  };

  return (
    <Card className={cn(
      "transition-all duration-300 border-l-4 bg-card",
      statusBorderStyles[team.status]
    )}>
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-lg bg-primary text-primary-foreground">
              {team.id}
            </span>
            <Input
              value={team.type}
              onChange={(e) => updateTeam({ type: e.target.value })}
              className="h-7 w-24 text-sm font-medium border-0 bg-transparent p-0 text-card-foreground"
              placeholder="Typ"
            />
          </div>
          <Select
            value={team.status}
            onValueChange={(value: TeamStatus) => updateTeam({ status: value })}
          >
            <SelectTrigger className={cn(
              "h-7 w-28 text-xs border-0 font-medium",
              statusBadgeStyles[team.status]
            )}>
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
        <div className="text-xs mt-1 text-muted-foreground">
          Czas wyjścia: <span className="font-medium text-card-foreground">{team.exitTime} min</span>
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
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
      <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 bg-primary text-primary-foreground">
        {label}
      </span>
      
      <div className="flex-1 grid grid-cols-3 gap-2 items-center min-w-0">
        <Input
          value={firefighter.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Nazwa"
          className="h-6 text-xs border-0 bg-transparent p-1 text-card-foreground"
        />
        
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={firefighter.oxygenLevel}
            onChange={(e) => onUpdate({ oxygenLevel: parseInt(e.target.value) || 0 })}
            className={cn(
              "h-6 w-14 text-xs text-center border-0 p-0 font-mono font-bold bg-secondary",
              getOxygenColor(firefighter.oxygenLevel)
            )}
          />
          <span className="text-xs text-muted-foreground">bar</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={firefighter.exitTime}
            onChange={(e) => onUpdate({ exitTime: parseInt(e.target.value) || 0 })}
            className="h-6 w-12 text-xs text-center border-0 p-0 font-mono bg-secondary text-card-foreground"
          />
          <span className="text-xs text-muted-foreground">min</span>
        </div>
      </div>
    </div>
  );
}
