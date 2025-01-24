import { Platform, StyleSheet, View } from 'react-native';

const TVFocusGuideView = Platform.isTV
  ? require('react-native').TVFocusGuideView
  : View;

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export const SkiaDemoScreen = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  const styles = useDemoStyles();
  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
      </ThemedView>
      {children}
    </TVFocusGuideView>
  );
};

const useDemoStyles = function () {
  const { width, height, scale } = useScale();
  const backgroundColor = useThemeColor({}, 'background');
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      paddingTop: height > width ? 100 * scale : 0,
      backgroundColor,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
      margin: 20 * scale,
      marginTop:
        Platform.OS === 'ios' && (Platform.isTV || Platform.isPad)
          ? 100 * scale
          : 20 * scale,
    },
  });
};
