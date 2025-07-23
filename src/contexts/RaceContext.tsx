import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Race } from '../types';

interface RaceCtx {
  races: Race[];
  selectedRace: Race | null;
  addRace: (r: Race) => void;
  selectRace: (r: Race) => void;
}

const Ctx = createContext<RaceCtx | undefined>(undefined);

export function RaceProvider({ children }: { children: ReactNode }) {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  function addRace(r: Race) {
    setRaces((prev) => [...prev, r]);
  }

  function selectRace(r: Race) {
    setSelectedRace(r);
  }

  return (
    <Ctx.Provider value={{ races, selectedRace, addRace, selectRace }}>
      {children}
    </Ctx.Provider>
  );
}

export function useRace() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRace must be inside <RaceProvider>');
  return ctx;
}
