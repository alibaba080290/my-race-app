import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { Button, List, IconButton } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import { Driver } from '../types';
import { nanoid } from 'nanoid';

export default function Registration() {
  const { selectedRace, updateDrivers } = useRace();
  const [name, setName] = useState('');
  const [kart, setKart] = useState('');

  if (!selectedRace) return <List.Item title="Aucune course sélectionnée" />;

  function add() {
    if (!name) return;
    const driver: Driver = { id: nanoid(), name, kart: Number(kart) || 0 };
    updateDrivers([...selectedRace.drivers, driver]);
    setName('');
    setKart('');
  }
  function remove(id: string) {
    updateDrivers(selectedRace.drivers.filter((d) => d.id !== id));
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} style={styles.inp} />
      <TextInput placeholder="Kart #" keyboardType="number-pad" value={kart} onChangeText={setKart} style={styles.inp} />
      <Button mode="contained" onPress={add} disabled={!name}>Ajouter</Button>

      <FlatList
        data={selectedRace.drivers}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.kart} – ${item.name}`}
            right={() => <IconButton icon="delete" onPress={() => remove(item.id)} />}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ inp: { borderBottomWidth: 1, marginBottom: 8, padding: 4 } });
