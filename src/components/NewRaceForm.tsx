import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import {
  Button,
  RadioButton,
  HelperText,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Race } from '../types';
import uuid from 'react-native-uuid';

interface Props {
  onSave: (r: Race) => void;
  onCancel: () => void;
}

export default function NewRaceForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<Race['type']>('classic');
  const [laps, setLaps] = useState<string>('');      // string → number au save
  const [duration, setDuration] = useState<string>(''); // idem
  const [start, setStart] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const canSave =
    name.trim().length > 1 &&
    ((type === 'classic' && /^\d+$/.test(laps)) ||
      (type === 'endurance' && /^\d+$/.test(duration)));

  function handleSave() {
    if (!canSave) return;
    const race: Race = {
      id: uuid.v4().toString(),
      name: name.trim(),
      type,
      laps: type === 'classic' ? Number(laps) : undefined,
      duration: type === 'endurance' ? Number(duration) : undefined,
      start,
    };
    onSave(race);
  }

  const isoLocal = (d: Date) => d.toISOString().slice(0, 16);

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Nom de la course"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* type + valeurs */}
      <RadioButton.Group onValueChange={(v) => setType(v as any)} value={type}>
        <View style={styles.row}>
          <RadioButton value="classic" />
          <Text style={styles.radioLbl}>Classique</Text>
          <RadioButton value="endurance" />
          <Text style={styles.radioLbl}>Endurance</Text>
        </View>
      </RadioButton.Group>

      {type === 'classic' ? (
        <>
          <TextInput
            placeholder="Nombre de tours"
            keyboardType="numeric"
            style={styles.input}
            value={laps}
            onChangeText={setLaps}
          />
          <HelperText type="info">ex : 15</HelperText>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Durée (min)"
            keyboardType="numeric"
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
          />
          <HelperText type="info">ex : 60</HelperText>
        </>
      )}

      {/* date / heure */}
      {Platform.OS === 'web' ? (
        <View style={{ marginBottom: 8 }}>
          <Text style={{ marginBottom: 4, fontWeight: '600' }}>
            Date / heure
          </Text>
          <input
            type="datetime-local"
            value={isoLocal(start)}
            onChange={(e) => setStart(new Date(e.target.value))}
            style={styles.htmlInput}
          />
        </View>
      ) : (
        <>
          <Button
            mode="outlined"
            onPress={() => setShowPicker(true)}
            style={{ marginBottom: 8 }}
          >
            {start.toLocaleString()}
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
        </>
      )}

      {/* actions */}
      <Button
        mode="contained"
        onPress={handleSave}
        disabled={!canSave}
        style={{ marginTop: 8 }}
      >
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
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  radioLbl: { marginRight: 16 },
  htmlInput: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: 6,
    width: '100%',
  },
});
