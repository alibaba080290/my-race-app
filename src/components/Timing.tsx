import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';

function fmt(ms: number) {
  const c = (n: number, l = 2) => n.toString().padStart(l, '0');
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${c(m)}:${c(s)}.${c(cs)}`;
}

export default function Timing() {
  const { selectedRace, addLap } = useRace();
  const [running, setRunning] = useState(false);
  const [globalMs, setGlobalMs] = useState(0);
  const timer = useRef<NodeJS.Timeout>();

  if (!selectedRace) return <List.Item title="Aucune course sélectionnée" />;

  function start() {
    const t0 = Date.now();
    setRunning(true);
    timer.current = setInterval(() => setGlobalMs(Date.now() - t0), 30);
  }
  function stop() {
    clearInterval(timer.current);
    setRunning(false);
  }
  function lap() {
    // pour la démo : premier pilote seulement
    const d0 = selectedRace.drivers[0];
    if (!d0) return;
    const lapNo = selectedRace.lapsData.filter((l) => l.driverId === d0.id).length + 1;
    addLap({ driverId: d0.id, lapNo, timeMs: globalMs });
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.big}>{fmt(globalMs)}</Text>
      {!running ? (
        <Button mode="contained" onPress={start}>DÉMARRER</Button>
      ) : (
        <Button onPress={stop}>Stop</Button>
      )}
      <Button mode="outlined" onPress={lap} disabled={!running}>Enregistrer un tour</Button>
    </View>
  );
}

const styles = StyleSheet.create({ big: { fontSize: 48, textAlign: 'center', marginVertical: 16 } });
