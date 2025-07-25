import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import { Race, RaceContextType } from '../types';

const RaceContext = createContext<RaceContextType>({} as RaceContextType);

export const RaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState<string | undefined>();

  const addRace = useCallback<RaceContextType['addRace']>((r) => {
    const id = nanoid();
    const race: Race = { id, drivers: [], lapsData: [], ...r };
    setRaces((prev) => [...prev, race]);
    setSelectedRaceId(id);
  }, []);

  const deleteRace = useCallback<RaceContextType['deleteRace']>((id) => {
    setRaces((prev) => prev.filter((r) => r.id !== id));
    setSelectedRaceId((curr) => (curr === id ? undefined : curr));
  }, []);

  const selectRace = useCallback<RaceContextType['selectRace']>((id) => {
    setSelectedRaceId(id);
  }, []);

  const updateDrivers = useCallback<RaceContextType['updateDrivers']>(
    (drivers) => {
      if (!selectedRaceId) return;
      setRaces((prev) =>
        prev.map((r) => (r.id === selectedRaceId ? { ...r, drivers } : r)),
      );
    },
    [selectedRaceId],
  );

  const addLap = useCallback<RaceContextType['addLap']>(
    (lap) => {
      if (!selectedRaceId) return;
      setRaces((prev) =>
        prev.map((r) =>
          r.id === selectedRaceId
            ? { ...r, lapsData: [...r.lapsData, lap] }
            : r,
        ),
      );
    },
    [selectedRaceId],
  );

  const value = useMemo(
    () => ({
      races,
      selectedRaceId,
      addRace,
      deleteRace,
      selectRace,
      updateDrivers,
      addLap,
    }),
    [races, selectedRaceId, addRace, deleteRace, selectRace, updateDrivers, addLap],
  );

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
};

export const useRace = () => useContext(RaceContext);
