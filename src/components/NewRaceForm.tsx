// src/components/NewRaceForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, RadioButton, HelperText } from 'react-native-paper';
import { Race } from '../types';
import { nanoid } from 'nanoid';
import DateTimeField from './DateTimeField';

interface Props {
  onSave: (r: Race) => void;
  onCancel: () => void;
}

export default function NewRaceForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<Race['type']>('classic');
  const [laps, setLaps] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  const invalid =
    !name.trim() ||
    (type === 'classic' ? !Number(laps) : !Number(duration));

  const save = () =>
    onSave({
      id: nanoid(),
      name,
      type,
      laps: type === 'classic' ? Number(laps) : undefined,
      duration: type === 'endurance' ? Number(duration) : undefined,
      start: date.toISOString(),
    });

  return (
    <View>
      <TextInput label="Nom" value={name} onChangeText={setName} />

      <RadioButton.Group onValueChange={(v) => setType(v as any)} value={type}>
        <RadioButton.Item label="Classique" value="classic" />
        <RadioButton.Item label="Endurance" value="endurance" />
      </RadioButton.Group>

      {type === 'classic' ? (
        <TextInput
          label="Nombre de tours"
          value={laps}
          onChangeText={setLaps}
          keyboardType="numeric"
        />
      ) : (
        <TextInput
          label="Durée (min)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      )}

      <HelperText type="info">
        {`Départ : ${date.toLocaleString()}`}
      </HelperText>

      <DateTimeField value={date} onChange={setDate} />

      <Button
        mode="contained"
        onPress={save}
        disabled={invalid}
        style={{ marginTop: 8 }}
      >
        Enregistrer
      </Button>
      <Button onPress={onCancel}>Annuler</Button>
    </View>
  );
}
