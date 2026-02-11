import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import WebTabLayout from './TabLayout.web';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const colors = useTheme();
  if (Platform.OS === 'android' && Platform.isTV) {
    return <WebTabLayout />;
  }
  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.tint}
      labelStyle={{ selected: { color: colors.tabIconSelected } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="breathe">
        <NativeTabs.Trigger.Label>Breathe</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="glass">
        <NativeTabs.Trigger.Label>Glassmorphism</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reanimated">
        <NativeTabs.Trigger.Label>Reanimated</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="barchart">
        <NativeTabs.Trigger.Label>Bar Chart</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="linechart">
        <NativeTabs.Trigger.Label>Line Chart</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
