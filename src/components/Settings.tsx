// src/components/Settings.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  DataTable,
  Button,
  IconButton,
  Checkbox,
} from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import NewRaceForm from './NewRaceForm';
import { format } from 'date-fns';

export default function Settings() {
  const {
    races,
    selectedRace,
    selectRace,
    addRace,
    deleteRace,
  } = useRace();

  const [adding, setAdding] = useState(false);

  const handleSave = (r) => {
    addRace(r);
    selectRace(r.id);
    setAdding(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)}>
          Nouvelle course
        </Button>
      )}

      {adding && (
        <NewRaceForm
          onSave={handleSave}
          onCancel={() => setAdding(false)}
        />
      )}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.colCheck} />
          <DataTable.Title style={styles.colName}>Course</DataTable.Title>
          <DataTable.Title style={styles.colType}>Type</DataTable.Title>
          <DataTable.Title numeric style={styles.colDuration}>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={styles.colDate}>Date</DataTable.Title>
          <DataTable.Title numeric style={styles.colActions} />
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRace?.id;
          const duration =
            r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`;

          return (
            <DataTable.Row
              key={r.id}
              style={[styles.row, isSel && styles.selected]}
            >
              <DataTable.Cell style={styles.colCheck}>
                <Checkbox
                  status={isSel ? 'checked' : 'unchecked'}
                  onPress={() => selectRace(r.id)}
                />
              </DataTable.Cell>

              <DataTable.Cell style={styles.colName}>{r.name}</DataTable.Cell>

              <DataTable.Cell style={styles.colType}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>

              <DataTable.Cell numeric style={styles.colDuration}>
                {duration}
              </DataTable.Cell>

              <DataTable.Cell style={styles.colDate}>
                {format(new Date(r.start), 'dd/MM/yyyy HH:mm')}
              </DataTable.Cell>

              <DataTable.Cell numeric style={styles.colActions}>
                <IconButton
                  icon="delete"
                  size={16}
                  onPress={() => deleteRace(r.id)}
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
  container: { padding: 16 },
  row: {},
  selected: { backgroundColor: '#eef' },
  colCheck: { flex: 0.6 },
  colName: { flex: 2 },
  colType: { flex: 1 },
  colDuration: { flex: 1.2 },
  colDate: { flex: 1.6 },
  colActions: { flex: 0.6 },
});
