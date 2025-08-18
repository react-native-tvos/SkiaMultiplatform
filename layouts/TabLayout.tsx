import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="breathe">
        <Label>Breathe</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="glass">
        <Label>Glassmorphism</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reanimated">
        <Label>Reanimated</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="barchart">
        <Label>Bar Chart</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="linechart">
        <Label>Line Chart</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
