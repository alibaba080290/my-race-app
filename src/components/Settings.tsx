// src/components/Settings.tsx
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import {
  DataTable,
  Button,
  Checkbox,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { format } from 'date-fns';

import NewRaceForm from './NewRaceForm';
import { Race } from '../types';
import { useRace } from '../contexts/RaceContext';

const COL = {
  check: 0.5,
  name: 2.4,
  type: 1.3,
  lapsDur: 1.4,
  date: 1.8,
  del: 0.6,
};

export default function Settings() {
  const theme = useTheme();
  const { races, addRace, selectRace, selectedRaceId, removeRace } = useRace();

  const [adding, setAdding] = useState(false);

  function handleSave(r: Omit<Race, 'id'>) {
    const ok = addRace(r);
    if (ok) setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)}>
          NOUVELLE COURSE
        </Button>
      )}

      {adding && (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />
      )}

      <DataTable style={{ marginTop: 12 }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: COL.check }} />
          <DataTable.Title style={{ flex: COL.name }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: COL.type }}>Type</DataTable.Title>
          <DataTable.Title style={{ flex: COL.lapsDur }} numeric>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.date }}>Date</DataTable.Title>
          <DataTable.Title style={{ flex: COL.del }} numeric />
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRaceId;
          const bg = isSel ? theme.colors.primaryContainer : undefined;

          return (
            <DataTable.Row
              key={r.id}
              style={[styles.row, bg && { backgroundColor: bg }]}
              onPress={() => selectRace(r.id)}
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

              <DataTable.Cell style={{ flex: COL.lapsDur }} numeric>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.date }}>
                {format(r.start, 'dd/MM/yyyy HH:mm')}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.del }} numeric>
                <IconButton
                  icon="delete"
                  size={18}
                  onPress={() => removeRace(r.id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 48,
  },
});
