import React from 'react';
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTextStyles } from '@/hooks/useTextStyles';

import TabLayoutJS from './TabLayout.web';
import { Platform } from 'react-native';
export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator,
);

export default function TabLayout() {
  if (Platform.OS === 'android') {
    return <TabLayoutJS />;
  }
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const textStyles = useTextStyles();

  return (
    <Tabs
      tabBarActiveTintColor={colors.tabIconSelected}
      tabBarInactiveTintColor={colors.tabIconDefault}
      rippleColor={colors.tint}
      labeled={true}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="breathe"
        options={{
          title: 'Breathe',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="glass"
        options={{
          title: 'Glassmorphism',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="reanimated"
        options={{
          title: 'Reanimated',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="barchart"
        options={{
          title: 'Bar Chart',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="linechart"
        options={{
          title: 'Line Graph',
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
