"use client";

import { TeamCard, type Team } from "./team-card";
import { TeamCardExpanded } from "./team-card-expanded";
import type { ViewMode } from "./dashboard-header";

interface TeamsGridProps {
  teams: Team[];
  onUpdateTeam: (team: Team) => void;
  viewMode: ViewMode;
}

export function TeamsGrid({ teams, onUpdateTeam, viewMode }: TeamsGridProps) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground">W akcji</h1>
        <p className="text-sm text-muted-foreground">
          Monitorowanie zespołów ratowniczych
        </p>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} onUpdate={onUpdateTeam} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl">
          {teams.map((team) => (
            <TeamCardExpanded key={team.id} team={team} onUpdate={onUpdateTeam} />
          ))}
        </div>
      )}
    </div>
  );
}
