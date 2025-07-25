import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, TextInput, List } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import { Driver } from '../types';
import { nanoid } from 'nanoid';

export default function Registration() {
  const { races, selectedRaceId, updateDrivers } = useRace();
  const race = races.find((r) => r.id === selectedRaceId);
  const [name, setName] = useState('');

  if (!race) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'red' }}>Aucune course sélectionnée.</Text>
      </View>
    );
  }

  const add = () => {
    if (!name.trim()) return;
    const d: Driver = { id: nanoid(), name };
    updateDrivers([...race.drivers, d]);
    setName('');
  };

  const removeDriver = (id: string) => {
    updateDrivers(race.drivers.filter((dr) => dr.id !== id));
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput label="Nom du pilote" value={name} onChangeText={setName} />
      <Button onPress={add} mode="contained">
        Ajouter
      </Button>

      <FlatList
        data={race.drivers}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            right={() => (
              <Button icon="delete" onPress={() => removeDriver(item.id)}>
                Supprimer
              </Button>
            )}
          />
        )}
      />
    </View>
  );
}
