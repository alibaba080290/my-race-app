import React from 'react';
import { View } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import { exportCsv } from '../utils/exportCsv';

export default function Results() {
  const { selectedRace } = useRace();

  if (!selectedRace) return <Text>Aucune course sélectionnée</Text>;

  const lapsByDriver = Object.groupBy(selectedRace.lapsData, (l) => l.driverId);

  return (
    <View style={{ padding: 16 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pilote</DataTable.Title>
          <DataTable.Title numeric>Tours</DataTable.Title>
        </DataTable.Header>
        {selectedRace.drivers.map((d) => (
          <DataTable.Row key={d.id}>
            <DataTable.Cell>{d.name}</DataTable.Cell>
            <DataTable.Cell numeric>{lapsByDriver[d.id]?.length ?? 0}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Button mode="contained" style={{ marginTop: 16 }} onPress={() => exportCsv(selectedRace)}>
        Exporter CSV
      </Button>
    </View>
  );
}
