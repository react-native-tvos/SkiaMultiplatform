import { NativeTabs } from 'expo-router/build/native-tabs';
import { Label } from 'expo-router';
import { Icon } from 'expo-router';
import { Platform } from 'react-native';

import WebTabLayout from './TabLayout.web';

export default function TabLayout() {
  if (Platform.OS === 'android' && Platform.isTV) {
    return <WebTabLayout />;
  }
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="breathe">
        <Label>Breathe</Label>
        <Icon sf="lungs.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="glass">
        <Label>Glassmorphism</Label>
        <Icon sf="window.vertical.open" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reanimated">
        <Label>Reanimated</Label>
        <Icon sf="atom" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="barchart">
        <Label>Bar Chart</Label>
        <Icon sf="chart.bar.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="linechart">
        <Label>Line Chart</Label>
        <Icon sf="chart.line.uptrend.xyaxis" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
