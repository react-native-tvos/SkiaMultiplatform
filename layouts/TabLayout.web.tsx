import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTextStyles } from '@/hooks/useTextStyles';
import { useScale } from '@/hooks/useScale';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = useTextStyles();
  const { scale } = useScale();

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    const style: any = props.style ?? {};
    return (
      <Pressable
        {...props}
        style={({ pressed, focused }) => [
          style,
          {
            opacity: pressed || focused ? 0.6 : 1.0,
          },
        ]}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        tabBarStyle: {
          width: '100%',
          // maxWidth: Platform.OS === 'android' ? 200 * scale : 150 * scale,
        },
        tabBarPosition: 'top',
        tabBarIconStyle: {
          height: textStyles.title.lineHeight,
          width: 0,
        },
        tabBarItemStyle: {
          width: 150 * scale,
          marginLeft: Platform.OS === 'android' ? 180 * scale : 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="breathe"
        options={{
          title: 'Breathe',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="glass"
        options={{
          title: 'Glassmorphism',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="reanimated"
        options={{
          title: 'Reanimated',
          tabBarButton,
          tabBarLabelStyle: textStyles.default,
          tabBarIcon: () => null,
        }}
      />
      {/* Victory-native hidden on web */}
      <Tabs.Screen
        name="barchart"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="linechart"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
