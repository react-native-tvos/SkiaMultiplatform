import { useScale } from '@/hooks/useScale';
import { Href, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  title: string;
  description: string;
  route: string;
  testId?: string;
};

export const HomeScreenButton: React.FC<Props> = ({
  title,
  description,
  route,
  testId,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const gotoRoute = useCallback(() => {
    router.navigate(route as unknown as Href);
  }, [route, router]);
  return (
    <ThemedView style={styles.container}>
      <Pressable
        style={({ pressed, focused, hovered }: any) => [
          styles.container,
          styles.button,
          (focused || hovered) && styles.focused,
          pressed && styles.pressed,
        ]}
        onPress={gotoRoute}
        testID={testId}
      >
        <ThemedText type="subtitle" style={styles.textContainer}>
          {title}
        </ThemedText>
        <ThemedText type="link" style={styles.textContainer}>
          {description}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const useStyles = () => {
  const { width, height, scale } = useScale();
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: width > height ? 'row' : 'column',
      justifyContent: 'flex-start',
    },
    button: {
      borderRadius: 8 * scale,
      borderWidth: 1,
      borderColor: theme.background,
    },
    focused: {
      borderColor: theme.tint,
    },
    pressed: {
      opacity: 0.7,
    },
    textContainer: {
      fontSize: 20 * scale,
      padding: 8 * scale,
      lineHeight: 24 * scale,
    },
  });
};
