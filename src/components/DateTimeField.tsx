// src/components/DateTimeField.tsx
import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface Props {
  value: Date;
  onChange: (d: Date) => void;
  label?: string;
}

const DateTimeField: React.FC<Props> = ({ value, onChange, label = 'Date / Heure' }) => {
  const [show, setShow] = useState(false);

  if (Platform.OS === 'web') {
    // Format ISO local compatible input datetime-local
    const toIsoLocal = (d: Date) =>
      format(d, "yyyy-MM-dd'T'HH:mm");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return;
      onChange(new Date(e.target.value));
    };

    return (
      <View style={{ marginTop: 8 }}>
        <Text style={styles.label}>{label}</Text>
        {/* @ts-ignore: le JSX.native autorise les tags web côté RN Web */}
        <input
          type="datetime-local"
          value={toIsoLocal(value)}
          onChange={handleChange}
          style={styles.inputWeb}
        />
      </View>
    );
  }

  // ----------- iOS / Android -----------
  return (
    <View style={{ marginTop: 8 }}>
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

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#6b6b6b',
    marginBottom: 4,
  },
  inputWeb: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
  },
});

export default DateTimeField;
