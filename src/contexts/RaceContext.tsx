// src/contexts/RaceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Race, RaceType } from '../types';
import { nanoid } from 'nanoid';

type RaceContextType = {
  races: Race[];
  selectedRaceId?: string;
  addRace: (r: Omit<Race, 'id'>) => boolean;
  selectRace: (id: string) => void;
  removeRace: (id: string) => void;
};

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState<string | undefined>();

  const addRace = (r: Omit<Race, 'id'>) => {
    const id = nanoid();
    const newRace: Race = { id, ...r };
    setRaces((prev) => [...prev, newRace]);
    setSelectedRaceId(id);
    return true;
  };

  const selectRace = (id: string) => setSelectedRaceId(id);

  const removeRace = (id: string) => {
    setRaces((prev) => prev.filter((x) => x.id !== id));
    if (selectedRaceId === id) setSelectedRaceId(undefined);
  };

  return (
    <RaceContext.Provider
      value={{ races, selectedRaceId, addRace, selectRace, removeRace }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export const useRace = () => {
  const ctx = useContext(RaceContext);
  if (!ctx) throw new Error('useRace must be used within RaceProvider');
  return ctx;
};
