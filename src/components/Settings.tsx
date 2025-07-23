import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';

import NewRaceForm from './NewRaceForm';
import { useRace } from '../contexts/RaceContext';
import { Race } from '../types';

export default function Settings() {
  // ─────────────────────────── contexte global
  const { races, addRace, selectedRace, selectRace } = useRace();

  // ─────────────────────────── état local
  const [adding, setAdding] = useState(false);

  // ─────────────────────────── rendu
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {adding ? (
        <NewRaceForm
          onCancel={() => setAdding(false)}
          onSave={(race) => {
            addRace(race);
            setAdding(false);
          }}
        />
      ) : (
        <Button mode="contained" onPress={() => setAdding(true)}>
          Nouvelle course
        </Button>
      )}

      {races.length === 0 ? (
        <View style={{ marginTop: 24 }}>
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            Aucune course enregistrée.
          </Text>
        </View>
      ) : (
        <DataTable style={{ marginTop: 16 }}>
          <DataTable.Header>
            <DataTable.Title style={styles.colName}>Course</DataTable.Title>
            <DataTable.Title style={styles.colType}>Type</DataTable.Title>
            <DataTable.Title style={styles.colDur} numeric>
              Durée / Tours
            </DataTable.Title>
            <DataTable.Title style={styles.colDate}>Date</DataTable.Title>
          </DataTable.Header>

          {races.map((r: Race) => {
            const isSel = r.id === selectedRace?.id;
            return (
              <TouchableOpacity key={r.id} onPress={() => selectRace(r.id)}>
                <DataTable.Row
                  style={[
                    styles.row,
                    isSel && { backgroundColor: '#eef' },
                  ]}
                >
                  <DataTable.Cell style={styles.colName}>{r.name}</DataTable.Cell>
                  <DataTable.Cell style={styles.colType}>
                    {r.type === 'endurance' ? 'Endurance' : 'Classique'}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colDur} numeric>
                    {r.type === 'endurance'
                      ? `${r.duration} min`
                      : `${r.laps} tours`}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colDate}>
                    {r.start.toLocaleDateString()} {'\n'}
                    {r.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          })}
        </DataTable>
      )}
    </ScrollView>
  );
}

// ─────────────────────────── styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    height: 48,
  },
  colName: {
    flex: 2,
  },
  colType: {
    flex: 1,
  },
  colDur: {
    flex: 1.2,
  },
  colDate: {
    flex: 1.4,
  },
});
