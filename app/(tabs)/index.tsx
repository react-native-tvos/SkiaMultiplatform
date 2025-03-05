import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HomeScreenButton } from '@/components/HomeScreenButton';
import { useScale } from '@/hooks/useScale';

export default function HomeScreen() {
  const { scale } = useScale();
  const styles = useHomeScreenStyles();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Demos using react-native-skia</ThemedText>
      </ThemedView>
      <HomeScreenButton
        title="🧘 Breathe"
        description="Simple declarative example"
        route="/(tabs)/breathe"
      />
      <HomeScreenButton
        title="🪞 Glassmorphism"
        description="Glassmorphism"
        route="/(tabs)/glass"
      />
      <HomeScreenButton
        title="🎥 Reanimated"
        description="Reanimated & Gesture Handler"
        route="/(tabs)/reanimated"
      />
      {Platform.OS !== 'web' && (
        <>
          <HomeScreenButton
            title="📉 Bar Chart"
            description="Bar chart with victory-native"
            route="/(tabs)/barchart"
          />
          <HomeScreenButton
            title="📉 Line Graph"
            description="Line graph with victory-native"
            route="/(tabs)/linechart"
          />
        </>
      )}
      <ThemedView>
        <Link href="/modal" asChild>
          <Pressable>
            {({ focused }) => {
              return (
                <ThemedText
                  type="link"
                  style={{
                    fontSize: 20 * scale,
                    opacity: focused ? 0.6 : 1.0,
                    marginTop: 20 * scale,
                  }}
                >
                  About this app
                </ThemedText>
              );
            }}
          </Pressable>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const useHomeScreenStyles = function () {
  const { width, height, scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
    reactLogo: {
      height: 178 * scale,
      width: 290 * scale,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
};
