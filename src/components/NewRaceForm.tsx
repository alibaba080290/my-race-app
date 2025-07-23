import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { Race } from '../types';
import uuid from 'react-native-uuid';

interface Props {
  onSave: (r: Race) => void;
  onCancel: () => void;
}

export default function NewRaceForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'endurance' | 'classique'>('classique');
  const [laps, setLaps] = useState('10');
  const [duration, setDuration] = useState('60');
  const [start, setStart] = useState(
    new Date().toISOString().substring(0, 16),
  ); // yyyy‑MM‑ddTHH:mm (HTML datetime‑local)

  return (
    <View>
      <TextInput label="Nom" value={name} onChangeText={setName} />
      <RadioButton.Group onValueChange={(v) => setType(v as any)} value={type}>
        <RadioButton.Item label="Classique" value="classique" />
        <RadioButton.Item label="Endurance" value="endurance" />
      </RadioButton.Group>
      {type === 'classique' ? (
        <TextInput
          label="Nombre de tours"
          keyboardType="numeric"
          value={laps}
          onChangeText={setLaps}
        />
      ) : (
        <TextInput
          label="Durée (min)"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
      )}
      <TextInput
        label="Départ (YYYY‑MM‑DDThh:mm)"
        value={start}
        onChangeText={setStart}
      />

      <Button
        mode="contained"
        onPress={() =>
          onSave({
            id: uuid.v4().toString(),
            name,
            type,
            laps: type === 'classique' ? Number(laps) : undefined,
            duration: type === 'endurance' ? Number(duration) : undefined,
            start: new Date(start),
            drivers: [],
            lapsEvents: [],
          })
        }
        style={{ marginTop: 8 }}
      >
        Enregistrer
      </Button>
      <Button onPress={onCancel}>Annuler</Button>
    </View>
  );
}
