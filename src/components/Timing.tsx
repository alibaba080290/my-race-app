import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import type { Lap } from '../types';

export default function Timing() {
  const { selectedRace: race, addLap } = useRace();
  const timer = useRef<NodeJS.Timeout>();
  const [elapsed, setElapsed] = useState(0);

  /* --- helpers ---------------------------------------------------------- */
  function handleStart() {
    if (!race || timer.current) return;
    const start = Date.now();
    timer.current = setInterval(() => setElapsed(Date.now() - start), 1000);
  }
  function handleStop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
  }
  function registerLap() {
    if (!race) return;
    addLap({
      driverId: race.drivers[0]?.id ?? 'unknown',
      timestamp: Date.now(),
    } as Lap);
  }

  /* ---------------------------------------------------------------------- */
  if (!race) {
    return (
      <View style={styles.center}>
        <Text style={styles.warn}>Aucune course sélectionnée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{race.name}</Text>
      <Text style={styles.timer}>{(elapsed / 1000).toFixed(0)} s</Text>

      <Button mode="contained" onPress={handleStart} style={{ marginBottom: 8 }}>
        Démarrer
      </Button>
      <Button mode="outlined" onPress={handleStop} style={{ marginBottom: 8 }}>
        Stop
      </Button>
      <Button mode="outlined" onPress={registerLap}>
        Lap +
      </Button>

      <FlatList
        data={race.lapsData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Text>
            Tour {index + 1} – {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        )}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  warn: { color: 'red', fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold' },
  timer: { fontSize: 32, marginVertical: 12 },
});
