"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Building2,
  Menu,
  LayoutGrid,
  List,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export type ViewMode = "grid" | "list";

interface DashboardHeaderProps {
  stationName: string;
  unitName: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  availableRescuers: {
    id: string;
    name: string;
    serialNumber: string;
    oxygenLevel: number;
    exitTime: number;
  }[];
}

export function DashboardHeader({
  stationName,
  unitName,
  viewMode,
  onViewModeChange,
  availableRescuers,
}: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isRescuersOpen, setIsRescuersOpen] = useState(false);

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
            <span className="text-sm font-semibold text-foreground">
              {unitName}
            </span>
          </div>

          {/* Ratownicy button */}
          <Dialog open={isRescuersOpen} onOpenChange={setIsRescuersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Users className="h-4 w-4 mr-2" />
                Ratownicy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Lista Ratowników</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-96 px-4">
                <div className="space-y-2">
                  {availableRescuers.map((rescuer) => (
                    <div
                      key={rescuer.id}
                      className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer border border-border"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {rescuer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            S/N: {rescuer.serialNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Pow:</span>
                          <span className="font-mono font-bold">
                            {rescuer.oxygenLevel}
                          </span>
                          <span className="text-muted-foreground">bar</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Wyj:</span>
                          <span className="font-mono font-bold text-foreground">
                            {rescuer.exitTime}
                          </span>
                          <span className="text-muted-foreground">min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

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
