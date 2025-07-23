import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Race } from '../types';

function row(...c: (string | number | undefined)[]) {
  return c.map((v) => `"${String(v ?? '')}"`).join(',') + '\n';
}

export async function exportCsv(race: Race) {
  const header = row('kart', 'pilote', 'lap', 'time(ms)');
  const body = race.lapsData
    .map((l) => {
      const d = race.drivers.find((d) => d.id === l.driverId);
      return row(d?.kart, d?.name, l.lapNo, l.timeMs);
    })
    .join('');
  const csv = header + body;

  const uri = FileSystem.documentDirectory + `${race.name}.csv`;
  await FileSystem.writeAsStringAsync(uri, csv, { encoding: FileSystem.EncodingType.UTF8 });
  await Sharing.shareAsync(uri);
}
