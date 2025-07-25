import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { format } from 'date-fns';

import { useRace } from '../contexts/RaceContext';
import NewRaceForm from './NewRaceForm';
import type { Race, RaceType } from '../types';

const COL = { sel: 0.4, type: 0.3, laps: 0.4, date: 0.6, del: 0.2 };

export default function Settings() {
  const { races, selectedRace, selectRace, addRace, deleteRace } = useRace();
  const [adding, setAdding] = useState(false);

  function handleSave(r: Omit<Race, 'id' | 'lapsData'>) {
    addRace(r);
    setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {adding ? (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />
      ) : (
        <Button mode="outlined" onPress={() => setAdding(true)}>
          Nouvelle course
        </Button>
      )}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: COL.sel }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: COL.type }}>Type</DataTable.Title>
          <DataTable.Title numeric style={{ flex: COL.laps }}>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.date }}>Date</DataTable.Title>
          <DataTable.Title style={{ flex: COL.del }} />
        </DataTable.Header>

        {races.map((r) => (
          <DataTable.Row
            key={r.id}
            style={{
              backgroundColor: r.id === selectedRace?.id ? '#e1f5fe' : undefined,
            }}
            onPress={() => selectRace(r.id)}
          >
            <DataTable.Cell style={{ flex: COL.sel }}>{r.name}</DataTable.Cell>
            <DataTable.Cell style={{ flex: COL.type }}>
              {r.type === 'CLASSIC' ? 'Classique' : 'Endurance'}
            </DataTable.Cell>
            <DataTable.Cell numeric style={{ flex: COL.laps }}>
              {r.type === 'CLASSIC' ? `${r.laps} tours` : `${r.duration} min`}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: COL.date }}>
              {format(r.start, 'dd/MM/yyyy HH:mm')}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: COL.del }}>
              <Button
                compact
                icon="trash-can"
                onPress={() => deleteRace(r.id)}
                children=""
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
