import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Button, Checkbox, Text } from 'react-native-paper';
import { format } from 'date-fns';
import NewRaceForm from './NewRaceForm';
import { useRace } from '../contexts/RaceContext';
import { Race, RaceType } from '../types';

const COL = {
  check: 0.5,
  name: 2.5,
  type: 1.2,
  laps: 1.4,
  date: 2,
  del: 0.8,
} as const;

export default function Settings() {
  const { races, selectedRace, selectRace, addRace, deleteRace } = useRace();
  const [adding, setAdding] = useState(false);

  const handleSave = (r: Omit<Race, 'id'>) => {
    addRace(r);
    setAdding(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)}>
          Nouvelle course
        </Button>
      )}

      {adding && (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />
      )}

      <DataTable style={{ marginTop: 16 }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: COL.check }}>{' '}</DataTable.Title>
          <DataTable.Title style={{ flex: COL.name }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: COL.type }}>Type</DataTable.Title>
          <DataTable.Title style={{ flex: COL.laps }} numeric>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.date }}>Date</DataTable.Title>
          <DataTable.Title style={{ flex: COL.del }}>{' '}</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => {
          const isSel = selectedRace?.id === r.id;
          return (
            <DataTable.Row
              key={r.id}
              onPress={() => selectRace(r.id)}
              style={{ backgroundColor: isSel ? '#e0f2ff' : undefined }}
            >
              <DataTable.Cell style={{ flex: COL.check }}>
                <Checkbox status={isSel ? 'checked' : 'unchecked'} />
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.name }}>
                {r.name}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.type }}>
                {r.type === RaceType.CLASSIC ? 'Classique' : 'Endurance'}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.laps }} numeric>
                {r.type === RaceType.CLASSIC ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.date }}>
                {r.start ? format(r.start, 'dd/MM/yyyy HH:mm') : ''}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.del }}>
                <Button
                  compact
                  icon="trash-can"
                  onPress={() => deleteRace(r.id)}
                >
                  Suppr
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
