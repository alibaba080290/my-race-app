import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import { exportCsv } from '../utils/exportCsv';
import { useRace } from '../contexts/RaceContext';
import type { Lap } from '../types';

export default function Results() {
  const { selectedRace: race } = useRace();

  if (!race) {
    return (
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text variant="titleMedium" style={{ textAlign: 'center' }}>
          Aucune course sélectionnée
        </Text>
      </ScrollView>
    );
  }

  /** mémo : on l’appelle toujours, pas dans un `if` */
  const lapsByDriver = useMemo(
    () =>
      Object.groupBy<Lap>(race.lapsData, (l) => l.driverId) as Record<
        string,
        Lap[]
      >,
    [race.lapsData],
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button
        mode="contained"
        onPress={() => exportCsv(race)}
        icon="download"
        style={{ alignSelf: 'flex-start', marginBottom: 12 }}
      >
        Exporter CSV
      </Button>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pilote</DataTable.Title>
          <DataTable.Title numeric>Nb tours</DataTable.Title>
        </DataTable.Header>

        {race.drivers.map((d) => {
          const laps = lapsByDriver[d.id] ?? [];
          return (
            <DataTable.Row key={d.id}>
              <DataTable.Cell>{d.name}</DataTable.Cell>
              <DataTable.Cell numeric>{laps.length}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
