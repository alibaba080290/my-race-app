import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import { Button, RadioButton, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Race } from '../types';
import uuid from 'react-native-uuid';

export default function NewRaceForm({
  onSave,
  onCancel,
}: {
  onSave: (r: Race) => void;
  onCancel: () => void;
}) {
  /* … états inchangés … */
  /* -- coupé pour concision -- */
  const [start, setStart] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  /* … handleSave identique … */

  // Helper : format ISO court pour <input datetime-local>
  const isoLocal = (d: Date) =>
    d.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

  return (
    <View style={styles.wrapper}>
      {/* … nom + type + tours/minutes identiques … */}

      {/* Sélecteur date/heure */}
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

      {/* Boutons Enregistrer / Annuler inchangés */}
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
  htmlInput: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: 6,
    width: '100%',
  },
});
