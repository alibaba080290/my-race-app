import React, { useMemo } from 'react';
import { View, Text, Button as RNButton } from 'react-native';
import { useRace } from '../contexts/RaceContext';
import { exportCsv } from '../utils/exportCsv';
import { Lap, Race } from '../types';

/**
 * Petit utilitaire groupBy pour éviter les soucis de TS avec Object.groupBy
 */
function groupByLap(arr: Lap[], key: (l: Lap) => string): Record<string, Lap[]> {
  const out: Record<string, Lap[]> = {};
  for (const item of arr) {
    const k = key(item);
    (out[k] ||= []).push(item);
  }
  return out;
}

export default function Results() {
  // Ton context expose encore selectedRace (et pas race)
  const { selectedRace } = useRace();

  // Hooks TOUJOURS en haut, jamais dans un if
  const lapsByDriver = useMemo(() => {
    const laps = selectedRace?.lapsData ?? [];
    return groupByLap(laps, (l) => l.driverId);
  }, [selectedRace?.lapsData]);

  // Rendu si pas de course
  if (!selectedRace) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'red' }}>Aucune course sélectionnée.</Text>
      </View>
    );
  }

  const handleExport = () => {
    // selectedRace est défini ici
    exportCsv(selectedRace as Race);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Résultats – {selectedRace.name}
      </Text>

      <RNButton title="Exporter CSV" onPress={handleExport} />

      <View style={{ marginTop: 16 }}>
        {selectedRace.drivers.map((d) => {
          const laps = lapsByDriver[d.id] ?? [];
          return (
            <View key={d.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: '600' }}>
                {d.name} – {laps.length} tours
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

