import React, { createContext, useContext, useState } from 'react';
import { Race } from '../types';

interface RaceCtx {
  races: Race[];
  selectedRace: Race | null;
  addRace: (r: Race) => void;
  /** Nouvelle API : sélectionne (ou désélectionne) une course */
  selectRace: (r: Race | null) => void;
}

const Ctx = createContext<RaceCtx | undefined>(undefined);

export const RaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  function addRace(r: Race) {
    setRaces((prev) => [...prev, r]);
  }
  function selectRace(r: Race | null) {
    setSelectedRace(r);
  }

  return (
    <Ctx.Provider value={{ races, selectedRace, addRace, selectRace }}>
      {children}
    </Ctx.Provider>
  );
};

export function useRace() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRace must be used inside <RaceProvider>');
  return ctx;
}
