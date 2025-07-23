export type RaceType = 'classic' | 'endurance';

export interface Driver {
  id: string;
  name: string;
  kart: number;
  team?: string;
}

export interface Lap {
  id: string;
  driverId: string;
  timeMs: number;
  lapNo: number;
}

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  laps?: number;     // classic
  duration?: number; // endurance (minutes)
  start?: Date;
  drivers: Driver[];
  lapsData: Lap[];
}
