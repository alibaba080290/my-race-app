import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { Race, Lap, Driver } from '../types';

interface RaceContextValue {
  races: Race[];
  selectedRace: Race | null;
  laps: Record<string, Lap[]>;
  drivers: Record<string, Driver[]>;
  addRace(r: Race): void;
  selectRace(id: string): void;
  addLap(raceId: string, lap: Lap): void;
  setDrivers(raceId: string, list: Driver[]): void;
  deleteRace(id: string): void;
}

const RaceContext = createContext<RaceContextValue | undefined>(undefined);

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);
  const [laps, setLaps] = useState<Record<string, Lap[]>>({});
  const [drivers, setDrivers] = useState<Record<string, Driver[]>>({});

  /* CRUD ------------------------------------------------------ */
  const addRace = (r: Race) => setRaces((prev) => [...prev, r]);
  const selectRace = (id: string) => setSelectedRaceId(id);

  const deleteRace = (id: string) => {
    setRaces((prev) => prev.filter((r) => r.id !== id));
    setLaps(({ [id]: _, ...rest }) => rest);
    setDrivers(({ [id]: _, ...rest }) => rest);
    if (selectedRaceId === id) setSelectedRaceId(null);
  };

  const addLap = (raceId: string, lap: Lap) =>
    setLaps((prev) => ({
      ...prev,
      [raceId]: [...(prev[raceId] ?? []), lap],
    }));

  const setDriversForRace = (raceId: string, list: Driver[]) =>
    setDrivers((prev) => ({ ...prev, [raceId]: list }));

  /* valeur exposée ------------------------------------------- */
  const value: RaceContextValue = {
    races,
    selectedRace: races.find((r) => r.id === selectedRaceId) ?? null,
    laps,
    drivers,
    addRace,
    selectRace,
    addLap,
    setDrivers: setDriversForRace,
    deleteRace,
  };

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
};

export const useRace = () => {
  const ctx = useContext(RaceContext);
  if (!ctx) throw new Error('useRace must be used within <RaceProvider>');
  return ctx;
};
