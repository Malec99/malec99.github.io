"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Building2, Menu, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ViewMode = "grid" | "list";

interface DashboardHeaderProps {
  stationName: string;
  unitName: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function DashboardHeader({ stationName, unitName, viewMode, onViewModeChange }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-lg font-bold text-primary tabular-nums">
              {formatTime(currentTime)}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{stationName}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{unitName}</span>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-none ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onViewModeChange("grid")}
              title="Widok siatki"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Widok siatki</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-none ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onViewModeChange("list")}
              title="Widok listy"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Widok listy</span>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              <DropdownMenuItem>Lista ratowników</DropdownMenuItem>
              <DropdownMenuItem>Eksport danych</DropdownMenuItem>
              <DropdownMenuItem>Zakończ akcję</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
