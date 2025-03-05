import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { reactNativeInfo } from '@/constants/ReactNativeInfo';
import { useScale } from '@/hooks/useScale';
import { ExternalLink } from '@/components/ExternalLink';

export default function Modal() {
  const { scale } = useScale();
  const styles = useModalStyles();
  const { rnVersion, routerVersion, skiaVersion } = reactNativeInfo;
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Ionicons
          size={scale * 120}
          name="logo-react"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedText style={{ marginBottom: 10 * scale }} type="title">
          About this demo
        </ThemedText>
        <ThemedText>{`expo-router: ${routerVersion}`}</ThemedText>
        <ThemedText>{`react-native-tvos: ${rnVersion}`}</ThemedText>
        <ThemedText>{`react-native-skia: ${skiaVersion}`}</ThemedText>
        <ExternalLink href="https://github.com/react-native-tvos/SkiaMultiplatform">
          <ThemedView style={{ flexDirection: 'row' }}>
            <ThemedText style={{ marginRight: 10 * scale }}>
              Repository:
            </ThemedText>
            <ThemedText type="link">
              https://github.com/react-native-tvos/SkiaMultiplatform
            </ThemedText>
          </ThemedView>
        </ExternalLink>
      </ThemedView>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      <Link href="../" asChild>
        <Pressable>
          {({ focused }) => (
            <ThemedText
              type="defaultSemiBold"
              style={{ opacity: focused ? 0.6 : 1.0 }}
            >
              Dismiss
            </ThemedText>
          )}
        </Pressable>
      </Link>
    </ParallaxScrollView>
  );
}

const useModalStyles = () => {
  const { scale } = useScale();
  return {
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
    headerImage: {
      color: '#1D3D47',
    },
  };
};
