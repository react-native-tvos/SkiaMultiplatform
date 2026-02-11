import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import WebTabLayout from './TabLayout.web';

export default function TabLayout() {
  if (Platform.OS === 'android' && Platform.isTV) {
    return <WebTabLayout />;
  }
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="breathe">
        <NativeTabs.Trigger.Label>Breathe</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="lungs.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="glass">
        <NativeTabs.Trigger.Label>Glassmorphism</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="window.vertical.open" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reanimated">
        <NativeTabs.Trigger.Label>Reanimated</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="atom" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="barchart">
        <NativeTabs.Trigger.Label>Bar Chart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.bar.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="linechart">
        <NativeTabs.Trigger.Label>Line Chart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.line.uptrend.xyaxis" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
