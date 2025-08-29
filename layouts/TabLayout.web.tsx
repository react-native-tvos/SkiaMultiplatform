import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTextStyles } from '@/hooks/useTextStyles';

/**
 * This layout is required for the web platform.
 * We also use this layout for Android.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = useTextStyles();

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
        },
        tabBarPosition: 'top',
        tabBarIconStyle: {
          height: textStyles.title.lineHeight,
          width: 0,
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
      {Platform.OS !== 'web' ? (
        <Tabs.Screen
          name="barchart"
          options={{
            title: 'Bar Chart',
            tabBarButton,
            tabBarLabelStyle: textStyles.default,
            tabBarIcon: () => null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="barchart"
          options={{
            href: null,
          }}
        />
      )}
      {Platform.OS !== 'web' ? (
        <Tabs.Screen
          name="linechart"
          options={{
            title: 'Line Chart',
            tabBarButton,
            tabBarLabelStyle: textStyles.default,
            tabBarIcon: () => null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="linechart"
          options={{
            href: null,
          }}
        />
      )}
    </Tabs>
  );
}
