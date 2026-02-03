"use client";

import { useState, useCallback } from "react";
import { DashboardHeader, type ViewMode } from "@/components/dashboard-header";
import { Sidebar } from "@/components/sidebar";
import { TeamsGrid } from "@/components/teams-grid";
import { StatusLegend } from "@/components/status-legend";
import type { Team, TeamStatus, Firefighter } from "@/components/team-card";

const availableRescuers = [
  { id: "r1", name: "Kowalski Jan", serialNumber: "1A" },
  { id: "r2", name: "Nowak Piotr", serialNumber: "1B" },
  { id: "r3", name: "Wiśniewski Adam", serialNumber: "1C" },
  { id: "r4", name: "Wójcik Tomasz", serialNumber: "1D" },
  { id: "r5", name: "Kamiński Marcin", serialNumber: "1E" },
  { id: "r6", name: "Lewandowski Paweł", serialNumber: "1F" },
  { id: "r7", name: "Zieliński Krzysztof", serialNumber: "1G" },
  { id: "r8", name: "Szymański Michał", serialNumber: "2A" },
];

const createFirefighter = (id: string, label: string): Firefighter => ({
  id,
  name: "",
  serialNumber: label,
  oxygenLevel: 300,
  exitTime: 40,
});

const createTeam = (id: number): Team => ({
  id,
  name: `Zespół ${id}`,
  type: id === 1 ? "ROTA" : id === 2 ? "Drabina" : "",
  exitTime: 40,
  status: "standby" as TeamStatus,
  firefighters: [
    createFirefighter(`${id}-a`, `${id}A`),
    createFirefighter(`${id}-b`, `${id}B`),
  ],
});

// Initial 8 teams (4x2 grid)
const initialTeams: Team[] = [
  {
    ...createTeam(1),
    type: "ROTA",
    status: "standby",
  },
  {
    ...createTeam(2),
    type: "Drabina",
    status: "active",
    firefighters: [
      { id: "2-a", name: "Kowalski J.", serialNumber: "2A", oxygenLevel: 280, exitTime: 40 },
      { id: "2-b", name: "Nowak P.", serialNumber: "2B", oxygenLevel: 260, exitTime: 40 },
    ],
  },
  {
    ...createTeam(3),
    type: "Wsparcie",
    status: "active",
    firefighters: [
      { id: "3-a", name: "Wiśniewski A.", serialNumber: "3A", oxygenLevel: 180, exitTime: 35 },
      { id: "3-b", name: "Wójcik T.", serialNumber: "3B", oxygenLevel: 220, exitTime: 38 },
    ],
  },
  {
    ...createTeam(4),
    type: "Rezerwa",
    status: "warning",
    firefighters: [
      { id: "4-a", name: "Kamiński M.", serialNumber: "4A", oxygenLevel: 120, exitTime: 25 },
      { id: "4-b", name: "Lewandowski P.", serialNumber: "4B", oxygenLevel: 150, exitTime: 28 },
    ],
  },
  {
    ...createTeam(5),
    type: "",
    status: "standby",
  },
  {
    ...createTeam(6),
    type: "RIT",
    status: "danger",
    firefighters: [
      { id: "6-a", name: "Zieliński K.", serialNumber: "6A", oxygenLevel: 80, exitTime: 15 },
      { id: "6-b", name: "Szymański M.", serialNumber: "6B", oxygenLevel: 95, exitTime: 18 },
    ],
  },
  {
    ...createTeam(7),
    type: "",
    status: "standby",
  },
  {
    ...createTeam(8),
    type: "",
    status: "standby",
  },
];

export default function Dashboard() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const handleUpdateTeam = useCallback((updatedTeam: Team) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        stationName="Stacja Bazowa A4T"
        unitName="JRG 3 Kraków"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar availableRescuers={availableRescuers} />

        <main className="flex-1 overflow-auto">
          <TeamsGrid teams={teams} onUpdateTeam={handleUpdateTeam} viewMode={viewMode} />
        </main>
      </div>

      <StatusLegend />
    </div>
  );
}
