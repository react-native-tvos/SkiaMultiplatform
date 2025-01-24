import { useScale } from '@/hooks/useScale';
import { Href, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

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
    <TouchableOpacity onPress={gotoRoute} testID={testId}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.textContainer}>
          {title}
        </ThemedText>
        <ThemedText type="link" style={styles.textContainer}>
          {description}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { width, height, scale } = useScale();
  return StyleSheet.create({
    container: {
      flexDirection: width > height ? 'row' : 'column',
      justifyContent: 'flex-start',
    },
    textContainer: {
      fontSize: 20 * scale,
      padding: 8 * scale,
      lineHeight: 24 * scale,
    },
  });
};
