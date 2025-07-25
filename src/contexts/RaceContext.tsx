import React, { createContext, useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type { Driver, Lap, Race, RaceType } from '../types';

type RaceContextType = {
  races: Race[];
  selectedRaceId?: string;
  /** Race pratique — undefined si rien de choisi */
  selectedRace?: Race;
  selectRace: (id: string) => void;
  addRace: (r: Omit<Race, 'id' | 'lapsData'>) => void;
  deleteRace: (id: string) => void;
  updateDrivers: (drivers: Driver[]) => void;
  addLap: (l: Lap) => void;
};

const RaceContext = createContext<RaceContextType>({} as RaceContextType);
export const useRace = () => useContext(RaceContext);

export const RaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, selectRace] = useState<string>();

  /* helpers --------------------------------------------------------------- */
  function addRace(r: Omit<Race, 'id' | 'lapsData'>) {
    setRaces((prev) => [...prev, { ...r, id: nanoid(), drivers: [], lapsData: [] }]);
  }

  function deleteRace(id: string) {
    setRaces((prev) => prev.filter((r) => r.id !== id));
    if (id === selectedRaceId) selectRace(undefined);
  }

  function updateDrivers(drivers: Driver[]) {
    setRaces((prev) =>
      prev.map((r) => (r.id === selectedRaceId ? { ...r, drivers } : r)),
    );
  }

  function addLap(lap: Lap) {
    setRaces((prev) =>
      prev.map((r) =>
        r.id === selectedRaceId ? { ...r, lapsData: [...r.lapsData, lap] } : r,
      ),
    );
  }

  /* memo value ------------------------------------------------------------ */
  const value = useMemo(
    () => ({
      races,
      selectedRaceId,
      selectedRace: races.find((r) => r.id === selectedRaceId),
      selectRace,
      addRace,
      deleteRace,
      updateDrivers,
      addLap,
    }),
    [races, selectedRaceId],
  );

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
};

