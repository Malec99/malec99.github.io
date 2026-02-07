"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function FirefighterDetailClient({
  teamId,
  firefighterId,
}: {
  teamId: string;
  firefighterId: string;
}) {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [firefighter, setFirefighter] = useState<Firefighter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    let foundTeam: Team | undefined;
    let foundFirefighter: Firefighter | undefined;

    if (storedTeams) {
      try {
        const teams: Team[] = JSON.parse(storedTeams);
        foundTeam = teams.find((t) => t.id === parseInt(teamId));

        if (foundTeam) {
          const fIndex = parseInt(firefighterId);
          foundFirefighter = foundTeam.firefighters[fIndex as 0 | 1];
        }
      } catch (e) {
        console.error("Failed to parse teams from localStorage", e);
      }
    }

    if (foundTeam && foundFirefighter) {
      setTeam(foundTeam);
      setFirefighter(foundFirefighter);
    }

    setIsLoading(false);
  }, [teamId, firefighterId]);

  const updateFirefighter = (updates: Partial<Firefighter>) => {
    if (!team || !firefighter) return;

    const updatedFirefighter = { ...firefighter, ...updates };
    setFirefighter(updatedFirefighter);

    // Update localStorage
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      const teams: Team[] = JSON.parse(storedTeams);
      const teamIndex = teams.findIndex((t) => t.id === team.id);
      if (teamIndex !== -1) {
        const fIndex = parseInt(firefighterId) as 0 | 1;
        teams[teamIndex].firefighters[fIndex] = updatedFirefighter;
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

  if (!team || !firefighter) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Nie znaleziono ratownika</p>
        <Button onClick={() => router.push("/")}>
          Powrót do strony głównej
        </Button>
      </div>
    );
  }

  const firefighterLabel = parseInt(firefighterId) === 0 ? "A" : "B";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          {/* Left side - Firefighter details */}
          <div className="flex-1">
            <Card className="bg-card border border-border">
              {/* Team Header */}
              <div
                className={cn(
                  "px-6 py-4 border-b-4 border-border flex items-center justify-between",
                  statusBadgeStyles[team.status],
                )}
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium opacity-70 uppercase">
                      Zespół
                    </span>
                    <span className="text-4xl font-bold leading-none">
                      {team.id}
                    </span>
                  </div>

                  <div className="h-8 w-px bg-border opacity-30" />

                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">{team.type}</span>
                    <span className="text-sm opacity-70">czas wyjścia:</span>
                    <span className="text-lg font-bold">
                      {team.exitTime} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Firefighter Section */}
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Large A/B box */}
                  <div
                    className={cn(
                      "w-40 h-40 rounded-lg flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity",
                      firefighter.pmIdentificationActive
                        ? "bg-blue-400 text-white"
                        : getOxygenBgColor(firefighter.oxygenLevel),
                    )}
                    onClick={() => {
                      updateFirefighter({
                        pmIdentificationActive:
                          !firefighter.pmIdentificationActive,
                      });
                    }}
                    title={
                      firefighter.pmIdentificationActive
                        ? "Identyfikacja PM aktywna - kliknij aby wyłączyć"
                        : "Kliknij aby aktywować identyfikację PM"
                    }
                  >
                    <span className="text-7xl font-bold">
                      {firefighterLabel}
                    </span>
                  </div>

                  {/* Fields section */}
                  <div className="flex-1 space-y-4">
                    {/* Row 1: S/N, Powietrze, Czas wyjścia */}
                    <div className="flex gap-4">
                      <div className="space-y-1 w-48">
                        <label className="text-xs font-medium text-muted-foreground uppercase block">
                          S/N
                        </label>
                        <Input
                          value={firefighter.serialNumber}
                          onChange={(e) =>
                            updateFirefighter({ serialNumber: e.target.value })
                          }
                          placeholder="S/N"
                          className="h-11 text-base font-mono font-bold border-2 px-3"
                        />
                      </div>

                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase block">
                          Powietrze [BAR]
                        </label>
                        <Input
                          type="number"
                          value={firefighter.oxygenLevel}
                          onChange={(e) =>
                            updateFirefighter({
                              oxygenLevel: parseInt(e.target.value) || 0,
                            })
                          }
                          className="h-11 text-base text-center border-2 font-mono font-bold"
                        />
                      </div>

                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase block">
                          Czas wyjścia
                        </label>
                        <Input
                          type="number"
                          value={firefighter.exitTime}
                          onChange={(e) =>
                            updateFirefighter({
                              exitTime: parseInt(e.target.value) || 0,
                            })
                          }
                          className="h-11 text-base text-center border-2 font-mono font-bold"
                        />
                      </div>
                    </div>

                    {/* QRcode field */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase block">
                        QRcode
                      </label>
                      <Button
                        variant="outline"
                        className="w-full h-16 border-2 text-base font-medium"
                        onClick={() => {
                          // TODO: Open camera for QR code scanning
                          console.log("QR code scanner clicked");
                        }}
                      >
                        Skanuj QR kod
                      </Button>
                    </div>

                    {/* NFC field */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase block">
                        NFC
                      </label>
                      <Button
                        variant="outline"
                        className="w-full h-16 border-2 text-base font-medium"
                        onClick={() => {
                          // TODO: Activate NFC reader
                          console.log("NFC reader clicked");
                        }}
                      >
                        Odczytaj NFC
                      </Button>
                    </div>

                    {/* Search from database */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase block">
                        Wyszukaj w bazie
                      </label>
                      <Input
                        placeholder="Wyszukaj ratownika..."
                        className="h-11 text-base border-2"
                        onChange={(e) => {
                          // TODO: Filter available rescuers list
                          console.log("Search query:", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
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
