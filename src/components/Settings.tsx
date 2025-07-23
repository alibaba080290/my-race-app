import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import NewRaceForm from './NewRaceForm';
import { Race } from '../types';

export default function Settings() {
  const { races, addRace, selectRace, selectedRace } = useRace();
  const [adding, setAdding] = useState(false);

  function handleSave(r: Race) {
    addRace(r);
    selectRace(r); // sélection immédiate
    setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!adding && (
        <Button title="Nouvelle course" onPress={() => setAdding(true)} />
      )}

      {adding && (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />
      )}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.col20}>Course</DataTable.Title>
          <DataTable.Title style={styles.col15}>Type</DataTable.Title>
          <DataTable.Title style={styles.col20} numeric>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={styles.col45}>Date</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRace?.id;
          return (
            <DataTable.Row
              key={r.id}
              onPress={() => selectRace(r)}
              style={isSel ? styles.selectedRow : undefined}
            >
              <DataTable.Cell style={styles.col20}>{r.name}</DataTable.Cell>
              <DataTable.Cell style={styles.col15}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>
              <DataTable.Cell style={styles.col20} numeric>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>
              <DataTable.Cell style={styles.col45}>
                {r.start.toLocaleString()}
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
  selectedRow: { backgroundColor: '#eef' },
  col15: { flex: 1 },
  col20: { flex: 1.2 },
  col45: { flex: 0.4 },
});
