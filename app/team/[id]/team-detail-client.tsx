"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import type { Team, TeamStatus, Firefighter } from "@/components/team-card";

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

// Mock available rescuers data
const availableRescuers = [
  { id: "1A", serialNumber: "1A", oxygenLevel: 300, exitTime: 40 },
  { id: "1B", serialNumber: "1B", oxygenLevel: 300, exitTime: 40 },
  { id: "1C", serialNumber: "1C", oxygenLevel: 300, exitTime: 40 },
  { id: "1D", serialNumber: "1D", oxygenLevel: 300, exitTime: 40 },
  { id: "1E", serialNumber: "1E", oxygenLevel: 300, exitTime: 40 },
  { id: "1F", serialNumber: "1F", oxygenLevel: 300, exitTime: 40 },
  { id: "1G", serialNumber: "1G", oxygenLevel: 300, exitTime: 40 },
];

export default function TeamDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Loading team with id:", id);

    // Load team data from localStorage or state management
    const storedTeams = localStorage.getItem("teams");
    console.log(
      "StoredTeams from localStorage:",
      storedTeams ? "exists" : "null",
    );

    let foundTeam: Team | undefined;

    if (storedTeams) {
      try {
        const teams: Team[] = JSON.parse(storedTeams);
        console.log(
          "Parsed teams:",
          teams.map((t) => ({ id: t.id, name: t.name })),
        );
        foundTeam = teams.find((t) => t.id === parseInt(id));
        console.log("Found team:", foundTeam ? foundTeam.id : "not found");
      } catch (e) {
        console.error("Failed to parse teams from localStorage", e);
      }
    }

    if (foundTeam) {
      setTeam(foundTeam);
    } else {
      console.log("Team not found, id:", id, "type:", typeof id);
    }

    setIsLoading(false);
  }, [id]);

  const updateFirefighter = (index: 0 | 1, updates: Partial<Firefighter>) => {
    if (!team) return;
    const newFirefighters = [...team.firefighters] as [
      Firefighter,
      Firefighter,
    ];
    newFirefighters[index] = { ...newFirefighters[index], ...updates };
    const updatedTeam = { ...team, firefighters: newFirefighters };
    setTeam(updatedTeam);

    // Update localStorage
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      const teams: Team[] = JSON.parse(storedTeams);
      const teamIndex = teams.findIndex((t) => t.id === team.id);
      if (teamIndex !== -1) {
        teams[teamIndex] = updatedTeam;
        localStorage.setItem("teams", JSON.stringify(teams));
      }
    }
  };

  const updateTeam = (updates: Partial<Team>) => {
    if (!team) return;
    const updatedTeam = { ...team, ...updates };
    setTeam(updatedTeam);

    // Update localStorage
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      const teams: Team[] = JSON.parse(storedTeams);
      const teamIndex = teams.findIndex((t) => t.id === team.id);
      if (teamIndex !== -1) {
        teams[teamIndex] = updatedTeam;
        localStorage.setItem("teams", JSON.stringify(teams));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Ładowanie...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Nie znaleziono zespołu</p>
        <Button onClick={() => router.push("/")}>
          Powrót do strony głównej
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button and station info */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground uppercase">
                  Stacja Bazowa
                </span>
                <div className="h-4 w-px bg-border" />
                <span className="text-lg font-semibold">JRG 3 Kraków</span>
              </div>
            </div>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              size="lg"
              className="h-12 px-6"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              POWRÓT
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left side - Team details */}
          <div className="flex-1">
            <Card className="bg-card border border-border">
              {/* Team Header */}
              <div
                className={cn(
                  "px-6 py-6 border-b-4 border-border",
                  statusBadgeStyles[team.status],
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium opacity-70 uppercase">
                        Zespół
                      </span>
                      <span className="text-6xl font-bold leading-none">
                        {team.id}
                      </span>
                    </div>

                    <div className="h-12 w-px bg-border opacity-30" />

                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 uppercase block">
                        Typ
                      </label>
                      <Input
                        value={team.type}
                        onChange={(e) => updateTeam({ type: e.target.value })}
                        className="h-10 w-48 text-lg font-bold border-0 bg-black/10 px-3"
                        placeholder="Typ zespołu"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium opacity-70 uppercase block">
                        Czas wyjścia
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={team.exitTime}
                          onChange={(e) =>
                            updateTeam({
                              exitTime: parseInt(e.target.value) || 0,
                            })
                          }
                          className="h-10 w-24 text-lg font-bold border-0 bg-black/10 px-3 text-center"
                        />
                        <span className="text-sm font-medium">min</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium opacity-70 uppercase block text-right">
                      Status
                    </label>
                    <Select
                      value={team.status}
                      onValueChange={(value: TeamStatus) =>
                        updateTeam({ status: value })
                      }
                    >
                      <SelectTrigger className="h-10 w-40 text-sm border-0 font-medium bg-black/10">
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
                </div>
              </div>

              {/* Firefighters Section */}
              <div className="divide-y divide-border">
                {team.firefighters.map((ff, idx) => (
                  <div
                    key={ff.id}
                    className="p-6 hover:bg-secondary/10 transition-colors"
                  >
                    {/* 3 Column Layout: A/B box | Fields | Wykres */}
                    <div className="flex gap-6">
                      {/* Column 1: Section Label (A/B box) */}
                      <div
                        className={cn(
                          "w-24 h-24 rounded-lg flex items-center justify-center shrink-0",
                          getOxygenBgColor(ff.oxygenLevel),
                        )}
                      >
                        <span className="text-5xl font-bold">
                          {idx === 0 ? "A" : "B"}
                        </span>
                      </div>

                      {/* Column 2: Fields - 2 rows (narrower) */}
                      <div className="w-[280px] shrink-0 space-y-3">
                        {/* Row 1: S/N, Powietrze [BAR], Czas wyjścia */}
                        <div className="flex gap-2">
                          {/* S/N Field */}
                          <div className="space-y-1 w-16">
                            <label className="text-[10px] font-medium text-muted-foreground uppercase block">
                              S/N
                            </label>
                            <Input
                              value={ff.serialNumber}
                              onChange={(e) =>
                                updateFirefighter(idx as 0 | 1, {
                                  serialNumber: e.target.value,
                                })
                              }
                              placeholder="S/N"
                              className="h-10 text-sm font-mono font-bold border-2 px-1"
                            />
                          </div>

                          {/* Air Pressure */}
                          <div className="space-y-1 flex-1">
                            <label className="text-[10px] font-medium text-muted-foreground uppercase block">
                              Powietrze [BAR]
                            </label>
                            <Input
                              type="number"
                              value={ff.oxygenLevel}
                              onChange={(e) =>
                                updateFirefighter(idx as 0 | 1, {
                                  oxygenLevel: parseInt(e.target.value) || 0,
                                })
                              }
                              className="h-10 text-sm text-center border-2 font-mono font-bold"
                            />
                          </div>

                          {/* Exit Time */}
                          <div className="space-y-1 flex-1">
                            <label className="text-[10px] font-medium text-muted-foreground uppercase block">
                              Czas wyjścia
                            </label>
                            <Input
                              type="number"
                              value={ff.exitTime}
                              onChange={(e) =>
                                updateFirefighter(idx as 0 | 1, {
                                  exitTime: parseInt(e.target.value) || 0,
                                })
                              }
                              className="h-10 text-sm text-center border-2 font-mono font-bold"
                            />
                          </div>
                        </div>

                        {/* Row 2: Nazwa Ratownika (full width) */}
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground uppercase block">
                            Nazwa Ratownika
                          </label>
                          <Input
                            value={ff.name}
                            onChange={(e) =>
                              updateFirefighter(idx as 0 | 1, {
                                name: e.target.value,
                              })
                            }
                            placeholder="NAZWA RATOWNIKA"
                            className="h-11 text-base font-bold border-2 px-3 uppercase"
                          />
                        </div>
                      </div>

                      {/* Column 3: WYKRES chart (wider, takes remaining space) */}
                      <div className="flex-1 min-w-0">
                        <div className="border-2 border-border rounded-lg p-4 bg-muted/20 h-full flex flex-col">
                          <span className="text-xs font-medium text-muted-foreground uppercase mb-3">
                            WYKRES
                          </span>
                          <div className="flex-1 flex items-end gap-1 px-2 pb-2">
                            {/* Mock decreasing air level bars */}
                            {[
                              100, 95, 90, 82, 78, 72, 68, 62, 58, 52, 48, 42,
                              38, 32, 28,
                            ].map((height, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-status-safe via-status-warning to-status-danger rounded-sm opacity-80"
                                style={{ height: `${height}%` }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-2">
                            <span>0 min</span>
                            <span>{ff.exitTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right side - Available PM table */}
          <div className="w-80 shrink-0">
            <Card className="bg-card border border-border h-full">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-semibold uppercase">Dostępne PM</h3>
              </div>
              <div className="p-4">
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
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
