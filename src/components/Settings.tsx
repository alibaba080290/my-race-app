// src/components/Settings.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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

// Largeurs uniformes
const COL = {
  check: 0.6,
  name: 2.0,
  type: 1.4,
  laps: 1.4,
  date: 1.8,
  del: 0.6,
};

export default function Settings() {
  const theme = useTheme();
  const { races, addRace, selectRace, selectedRaceId, removeRace } = useRace();
  const [adding, setAdding] = useState(false);

  function handleSave(r: Omit<Race, 'id'>) {
    addRace(r);
    setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)}>
          NOUVELLE COURSE
        </Button>
      )}

      {adding && <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />}

      <DataTable style={{ marginTop: 12 }}>
        {/* HEADER */}
        <DataTable.Header>
          <DataTable.Title style={{ flex: COL.check }} />
          <DataTable.Title style={{ flex: COL.name }} textStyle={styles.headerCenter}>
            Course
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.type }} textStyle={styles.headerCenter}>
            Type
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.laps }} textStyle={styles.headerCenter}>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.date }} textStyle={styles.headerCenter}>
            Date
          </DataTable.Title>
          <DataTable.Title style={{ flex: COL.del }} />
        </DataTable.Header>

        {/* ROWS */}
        {races.map((r) => {
          const isSel = r.id === selectedRaceId;
          return (
            <DataTable.Row
              key={r.id}
              style={[
                styles.row,
                isSel && { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => selectRace(r.id)}
            >
              <DataTable.Cell style={{ flex: COL.check }}>
                <Checkbox
                  status={isSel ? 'checked' : 'unchecked'}
                  onPress={() => selectRace(r.id)}
                />
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.name }} textStyle={styles.cellCenter}>
                {r.name}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.type }} textStyle={styles.cellCenter}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.laps }} textStyle={styles.cellCenter}>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: COL.date }} textStyle={styles.cellCenter}>
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
  headerCenter: {
    textAlign: 'center',
    fontWeight: '600',
  },
  cellCenter: {
    textAlign: 'center',
  },
});
