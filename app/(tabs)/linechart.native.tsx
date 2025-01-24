import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';
import { ThemedText } from '@/components/ThemedText';

import { LineChart } from '@/components/VictoryDemos/LineChart/LineChart';
import { Platform } from 'react-native';

export default function BarChartScreen() {
  return (
    <SkiaDemoScreen title={`Victory Line Chart`}>
      {Platform.OS === 'web' ? (
        <ThemedText>This demo is not available on web.</ThemedText>
      ) : (
        <LineChart />
      )}
    </SkiaDemoScreen>
  );
}
