import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Button, DataTable, Checkbox } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import NewRaceForm from './NewRaceForm';
import { Race } from '../types';
import { format } from 'date-fns';

const COL = { check: 0.08, name: 0.32, type: 0.18, laps: 0.18, date: 0.18, del: 0.06 };

export default function Settings() {
  const { races, selectedRaceId, selectRace, deleteRace, addRace } = useRace();
  const [adding, setAdding] = useState(false);

  function handleSave(r: Omit<Race, 'id' | 'drivers' | 'lapsData'>) {
    addRace(r);
    setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)} style={{ marginBottom: 16 }}>
          NOUVELLE COURSE
        </Button>
      )}

      {adding && <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: COL.check }}>
            <Text>{' '}</Text>
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.name }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: COL.type }}>Type</DataTable.Title>
          <DataTable.Title numeric style={{ flex: COL.laps }}>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title numeric style={{ flex: COL.date }}>
            Date
          </DataTable.Title>
          <DataTable.Title numeric style={{ flex: COL.del }}>
            <Text>{' '}</Text>
          </DataTable.Title>
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRaceId;
          return (
            <DataTable.Row
              key={r.id}
              onPress={() => selectRace(r.id)}
              style={{ backgroundColor: isSel ? '#e6dfff' : undefined }}
            >
              <DataTable.Cell style={{ flex: COL.check }}>
                <Checkbox
                  status={isSel ? 'checked' : 'unchecked'}
                  onPress={() => selectRace(r.id)}
                />
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.name }}>{r.name}</DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.type }}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>

              <DataTable.Cell numeric style={{ flex: COL.laps }}>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>

              <DataTable.Cell numeric style={{ flex: COL.date }}>
                {format(r.start, 'dd/MM/yyyy HH:mm')}
              </DataTable.Cell>

              <DataTable.Cell numeric style={{ flex: COL.del }}>
                <Button compact icon="trash-can" onPress={() => deleteRace(r.id)}>
                  {/* children obligatoires pour le type */}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
