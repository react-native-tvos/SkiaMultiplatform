import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
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
