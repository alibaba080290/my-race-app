import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, RadioButton, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Race } from '../types';
import uuid from 'react-native-uuid';

interface Props {
  onSave: (r: Race) => void;
  onCancel: () => void;
}

export default function NewRaceForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'classic' | 'endurance'>('classic');
  const [laps, setLaps] = useState('10');
  const [duration, setDuration] = useState('60');
  const [start, setStart] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const canSave =
    name.trim() &&
    (type === 'classic'
      ? parseInt(laps, 10) > 0
      : parseInt(duration, 10) > 0);

  function handleSave() {
    const race: Race = {
      id: uuid.v4().toString(),
      name: name.trim(),
      type,
      laps: type === 'classic' ? parseInt(laps, 10) : undefined,
      duration: type === 'endurance' ? parseInt(duration, 10) : undefined,
      start,
    };
    onSave(race);
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Nom de la course"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <RadioButton.Group
        onValueChange={(v) => setType(v as 'classic' | 'endurance')}
        value={type}
      >
        <View style={styles.row}>
          <RadioButton value="classic" />
          <HelperText type="info">Classique (tours)</HelperText>
        </View>
        <View style={styles.row}>
          <RadioButton value="endurance" />
          <HelperText type="info">Endurance (minutes)</HelperText>
        </View>
      </RadioButton.Group>

      {type === 'classic' ? (
        <TextInput
          placeholder="Nombre de tours"
          keyboardType="number-pad"
          value={laps}
          onChangeText={setLaps}
          style={styles.input}
        />
      ) : (
        <TextInput
          placeholder="Durée (min)"
          keyboardType="number-pad"
          value={duration}
          onChangeText={setDuration}
          style={styles.input}
        />
      )}

      <Button
        mode="outlined"
        onPress={() => setShowPicker(true)}
        style={{ marginBottom: 8 }}
      >
        {`Date / heure : ${start.toLocaleString()}`}
      </Button>

      {showPicker && (
        <DateTimePicker
          mode="datetime"
          value={start}
          onChange={(_, d) => {
            if (d) setStart(d);
            setShowPicker(false);
          }}
        />
      )}

      <Button mode="contained" onPress={handleSave} disabled={!canSave}>
        Enregistrer
      </Button>
      <Button onPress={onCancel} style={{ marginTop: 4 }}>
        Annuler
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});
