// src/components/DateTimeField.tsx
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface Props {
  value: Date;
  onChange: (d: Date) => void;
  label?: string;
}

/**
 * Un champ de date/heure cross-platform :
 * - Web : input type="datetime-local" (via TextInput de RN Paper)
 * - Mobile : vrai DateTimePicker natif
 */
const DateTimeField: React.FC<Props> = ({ value, onChange, label = 'Date' }) => {
  const [show, setShow] = useState(false);

  if (Platform.OS === 'web') {
    // RN Web transmet la prop "type" aux <input>. On convertit le Date en string ISO local.
    const isoLocal = value
      ? format(value, "yyyy-MM-dd'T'HH:mm")
      : format(new Date(), "yyyy-MM-dd'T'HH:mm");

    return (
      <TextInput
        label={label}
        value={isoLocal}
        onChangeText={(txt) => {
          // Safari peut renvoyer '', donc on garde l'existant si vide
          if (!txt) return;
          onChange(new Date(txt));
        }}
        mode="outlined"
        // @ts-ignore: 'type' est accepté côté web
        type="datetime-local"
      />
    );
  }

  // --- Mobile / natif ---
  return (
    <View>
      <Button
        mode="outlined"
        onPress={() => setShow(true)}
        style={{ marginTop: 8 }}
      >
        {label} : {format(value, 'dd/MM/yyyy HH:mm')}
      </Button>

      {show && (
        <DateTimePicker
          mode="datetime"
          value={value}
          onChange={(e: DateTimePickerEvent, d?: Date) => {
            setShow(false);
            if (d) onChange(d);
          }}
        />
      )}
    </View>
  );
};

export default DateTimeField;
