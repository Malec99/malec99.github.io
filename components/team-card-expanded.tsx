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
    const newFirefighters = [...team.firefighters] as [Firefighter, Firefighter];
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

  return (
    <Card className="bg-card border border-border">
      {/* Header with team type */}
      <div className="bg-secondary/80 px-4 py-2 border-b border-border flex items-center justify-between">
        <Input
          value={team.type}
          onChange={(e) => updateTeam({ type: e.target.value })}
          className="h-8 w-32 text-base font-semibold border-0 bg-transparent p-0 text-card-foreground"
          placeholder="Typ zespołu"
        />
        <Select
          value={team.status}
          onValueChange={(value: TeamStatus) => updateTeam({ status: value })}
        >
          <SelectTrigger className={cn(
            "h-8 w-32 text-sm border-0 font-medium",
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

      <div className="flex">
        {/* Left side - Firefighter data */}
        <div className="flex-1 divide-y divide-border">
          {team.firefighters.map((ff, idx) => (
            <div key={ff.id} className="flex items-stretch">
              {/* Label column */}
              <div className={cn(
                "w-16 flex items-center justify-center text-2xl font-bold shrink-0",
                statusBadgeStyles[team.status]
              )}>
                {idx === 0 ? "A" : "B"}
              </div>
              
              {/* Data columns */}
              <div className="flex-1 grid grid-cols-2 divide-x divide-border">
                {/* S/N and Name */}
                <div className="p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase">S/N:</span>
                    <Input
                      value={ff.serialNumber}
                      onChange={(e) => updateFirefighter(idx as 0 | 1, { serialNumber: e.target.value })}
                      className="h-7 flex-1 text-sm font-mono border-0 bg-secondary/50 px-2"
                    />
                  </div>
                  <Input
                    value={ff.name}
                    onChange={(e) => updateFirefighter(idx as 0 | 1, { name: e.target.value })}
                    placeholder="NAZWA"
                    className="h-8 text-sm border-0 bg-transparent p-0 text-card-foreground uppercase"
                  />
                </div>
                
                {/* Oxygen level */}
                <div className="p-3 flex flex-col justify-center">
                  <span className="text-xs text-muted-foreground uppercase mb-1">Powietrze:</span>
                  <div className="flex items-baseline gap-1">
                    <Input
                      type="number"
                      value={ff.oxygenLevel}
                      onChange={(e) => updateFirefighter(idx as 0 | 1, { oxygenLevel: parseInt(e.target.value) || 0 })}
                      className={cn(
                        "h-9 w-20 text-xl text-center border-0 p-0 font-mono font-bold bg-secondary/50",
                        getOxygenColor(ff.oxygenLevel)
                      )}
                    />
                    <span className="text-sm text-muted-foreground">[BAR]</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Team number and exit times */}
        <div className="w-48 border-l border-border flex flex-col">
          {/* Team number */}
          <div className={cn(
            "flex-1 flex items-center justify-center",
            statusBadgeStyles[team.status]
          )}>
            <span className="text-6xl font-bold">{team.id}</span>
          </div>
          
          {/* Exit times */}
          <div className="divide-y divide-border">
            {team.firefighters.map((ff, idx) => (
              <div key={`time-${ff.id}`} className="p-3 bg-card">
                <span className="text-sm font-medium text-card-foreground">
                  Czas wyjścia:{" "}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <Input
                    type="number"
                    value={ff.exitTime}
                    onChange={(e) => updateFirefighter(idx as 0 | 1, { exitTime: parseInt(e.target.value) || 0 })}
                    className="h-8 w-16 text-lg text-center border-0 p-0 font-mono font-bold bg-secondary/50 text-card-foreground"
                  />
                  <span className="text-base font-medium text-card-foreground">min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
