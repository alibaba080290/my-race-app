import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, DataTable, IconButton, Text } from 'react-native-paper';
import { nanoid } from 'nanoid';
import { useRace } from '../contexts/RaceContext';
import { Driver } from '../types';

export default function Registration() {
  const { selectedRace: race, updateDrivers } = useRace();
  const [name, setName] = useState('');

  /* ---------- helpers ---------- */
  const addDriver = () => {
    if (!race || !name.trim()) return;
    const newDriver: Driver = { id: nanoid(), name: name.trim() };
    updateDrivers([...(race.drivers ?? []), newDriver]);
    setName('');
  };

  const removeDriver = (id: string) => {
    if (!race) return;
    updateDrivers((race.drivers ?? []).filter((d) => d.id !== id));
  };

  /* ---------- render ---------- */
  if (!race) {
    return (
      <Text style={styles.error}>
        Aucune course sélectionnée.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {/* champ + bouton ajout */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Nom du pilote"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Button mode="contained" onPress={addDriver}>
          Ajouter
        </Button>
      </View>

      {/* tableau des pilotes déjà enregistrés */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pilote</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>

        {(race.drivers ?? []).map((d) => (
          <DataTable.Row key={d.id}>
            <DataTable.Cell>{d.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              <IconButton
                icon="delete"
                size={18}
                onPress={() => removeDriver(d.id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
  error: {
    color: 'red',
    padding: 16,
  },
});
