import React from 'react';
import { View } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import { exportCsv } from '../utils/exportCsv';

export default function Results() {
  const { races, selectedRaceId } = useRace();
  const race = races.find((r) => r.id === selectedRaceId);

  if (!race) {
    return null;
  }

  function onExport() {
    exportCsv(race);
  }

  return (
    <View style={{ padding: 16 }}>
      <Button mode="contained" onPress={onExport} style={{ marginBottom: 16 }}>
        Exporter CSV
      </Button>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pilote</DataTable.Title>
          <DataTable.Title numeric>Tour</DataTable.Title>
          <DataTable.Title numeric>Temps</DataTable.Title>
        </DataTable.Header>

        {race.lapsData.map((l, i) => {
          const driver = race.drivers.find((d) => d.id === l.driverId)?.name || '—';
          return (
            <DataTable.Row key={l.id}>
              <DataTable.Cell>{driver}</DataTable.Cell>
              <DataTable.Cell numeric>{i + 1}</DataTable.Cell>
              <DataTable.Cell numeric>{(l.time / 1000).toFixed(2)} s</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}
