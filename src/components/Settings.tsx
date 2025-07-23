// src/components/Settings.tsx
import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { format } from 'date-fns';

import NewRaceForm from './NewRaceForm';
import { Race } from '../types';
import { useRace } from '../contexts/RaceContext';

export default function Settings() {
  const { races, addRace, selectRace, selectedRace } = useRace();
  const [adding, setAdding] = useState(false);

  // ─────────────────────────── helpers
  function handleSave(r: Race) {
    addRace(r);
    selectRace(r.id);   // on sélectionne aussitôt la nouvelle course
    setAdding(false);
  }

  // ─────────────────────────── rendu
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
          <DataTable.Title style={{ flex: 2 }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}>Type</DataTable.Title>
          <DataTable.Title style={{ flex: 1.2 }} numeric>
            Durée / Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.8 }}>Date</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRace?.id;
          return (
            <DataTable.Row
              key={r.id}
              style={isSel ? styles.selectedRow : undefined}
              onPress={() => selectRace(r.id)}
            >
              <DataTable.Cell style={{ flex: 2 }}>{r.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: 1.2 }} numeric>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>

              <DataTable.Cell style={{ flex: 1.8 }}>
                {format(new Date(r.start), 'dd/MM/yyyy HH:mm')}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  selectedRow: {
    backgroundColor: '#cfe2ff',
  },
});
