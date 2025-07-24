// src/components/DateTimeField.tsx
import React from 'react';
import { Platform, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: Date;
  onChange: (d: Date) => void;
};

export default function DateTimeField({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  if (Platform.OS === 'web') {
    // Fallback DOM natif pour le web
    return (
      <View style={{ marginTop: 8 }}>
        <TextInput
          label="Date / Heure"
          value={format(value, 'dd/MM/yyyy HH:mm')}
          editable={false}
          right={<TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />}
        />
        {open && (
          // eslint-disable-next-line jsx-a11y/no-onchange
          <input
            type="datetime-local"
            // ISO sans secondes, ex: 2025-07-24T14:30
            value={format(value, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => {
              const d = new Date(e.target.value);
              if (!isNaN(d.getTime())) onChange(d);
              setOpen(false);
            }}
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: 48,
              cursor: 'pointer',
            }}
            autoFocus
          />
        )}
      </View>
    );
  }

  // Mobile / natif
  return (
    <View style={{ marginTop: 8 }}>
      <Button
        icon="calendar"
        mode="outlined"
        onPress={() => setOpen(true)}
      >
        {`Départ : ${format(value, 'dd/MM/yyyy HH:mm')}`}
      </Button>

      {open && (
        <DateTimePicker
          value={value}
          mode="datetime"
          onChange={(_, d) => {
            if (d) onChange(d);
            setOpen(false);
          }}
        />
      )}
    </View>
  );
}
