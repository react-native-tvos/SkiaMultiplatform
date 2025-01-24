import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';
import { Platform } from 'react-native';

import { BarChart } from '@/components/VictoryDemos/BarChart/BarChart';
import { ThemedText } from '@/components/ThemedText';

export default function BarChartScreen() {
  return (
    <SkiaDemoScreen title={`Victory Bar Chart`}>
      {Platform.OS === 'web' ? (
        <ThemedText>This demo is not available on web.</ThemedText>
      ) : (
        <BarChart />
      )}
    </SkiaDemoScreen>
  );
}
