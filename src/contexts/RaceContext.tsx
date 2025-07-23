import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Race, Driver, Lap } from '../types';
import { nanoid } from 'nanoid';

interface State {
  races: Race[];
  selectedRace?: Race;
  addRace(r: Omit<Race, 'id' | 'drivers' | 'lapsData'>): void;
  select(id: string): void;
  updateDrivers(drivers: Driver[]): void;
  addLap(lap: Omit<Lap, 'id'>): void;
}

const Ctx = createContext<State | undefined>(undefined);
export const useRace = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('RaceProvider absent');
  return c;
};

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  const selectedRace = races.find((r) => r.id === selectedId);

  const addRace: State['addRace'] = (r) =>
    setRaces((prev) => [...prev, { ...r, id: nanoid(), drivers: [], lapsData: [] }]);

  const select: State['select'] = (id) => setSelectedId(id);

  const updateDrivers: State['updateDrivers'] = (drivers) =>
    setRaces((rs) =>
      rs.map((r) => (r.id === selectedId ? { ...r, drivers } : r))
    );

  const addLap: State['addLap'] = ({ driverId, timeMs, lapNo }) =>
    setRaces((rs) =>
      rs.map((r) =>
        r.id === selectedId
          ? { ...r, lapsData: [...r.lapsData, { id: nanoid(), driverId, timeMs, lapNo }] }
          : r
      )
    );

  return (
    <Ctx.Provider value={{ races, selectedRace, addRace, select, updateDrivers, addLap }}>
      {children}
    </Ctx.Provider>
  );
};
