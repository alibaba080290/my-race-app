// src/components/NewRaceForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { RaceType } from '../types';
import DateTimeField from './DateTimeField';

interface Props {
  onSave: (race: {
    name: string;
    type: RaceType;
    laps?: number;
    duration?: number;
    start: Date;
  }) => void;
  onCancel: () => void;
}

const NewRaceForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<RaceType>('classic');
  const [laps, setLaps] = useState('10');
  const [duration, setDuration] = useState('20');
  const [start, setStart] = useState(new Date());

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      type,
      laps: type === 'classic' ? Number(laps) || 0 : undefined,
      duration: type === 'endurance' ? Number(duration) || 0 : undefined,
      start,
    });
  }

  return (
    <View style={{ padding: 12, gap: 12 }}>
      <TextInput
        label="Nom de la course"
        mode="outlined"
        value={name}
        onChangeText={setName}
      />

      <RadioButton.Group onValueChange={(v) => setType(v as RaceType)} value={type}>
        <RadioButton.Item label="Classique (nb de tours)" value="classic" />
        <RadioButton.Item label="Endurance (durée min)" value="endurance" />
      </RadioButton.Group>

      {type === 'classic' ? (
        <TextInput
          label="Nombre de tours"
          mode="outlined"
          keyboardType="numeric"
          value={laps}
          onChangeText={setLaps}
        />
      ) : (
        <TextInput
          label="Durée (minutes)"
          mode="outlined"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
      )}

      <DateTimeField value={start} onChange={setStart} label="Date / Heure" />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
        <Button onPress={onCancel}>Annuler</Button>
        <Button mode="contained" onPress={handleSave}>
          Enregistrer
        </Button>
      </View>
    </View>
  );
};

export default NewRaceForm;
