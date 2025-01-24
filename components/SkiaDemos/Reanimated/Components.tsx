import { useScale } from '@/hooks/useScale';
import type { ReactNode } from 'react';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export const Size = 20;
export const Padding = 10;

type ButtonActionProps = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

type ButtonProps = {
  title: string;
  actions?: ButtonActionProps;
};

export const AnimationDemo: React.FC<{
  title: string;
  button?: ButtonProps;
  children: ReactNode | ReactNode[];
}> = ({ title, button, children }) => {
  const styles = useDemoStyles();
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      {button && (
        <Pressable
          onPress={() => button?.actions?.onPress && button?.actions?.onPress()}
          onPressIn={() =>
            button?.actions?.onPressIn && button?.actions?.onPressIn()
          }
          onPressOut={() =>
            button?.actions?.onPressOut && button?.actions?.onPressOut()
          }
        >
          {({ pressed, focused }) => (
            <ThemedText
              type={pressed || focused ? 'link' : 'default'}
              style={{ opacity: pressed ? 0.6 : 1.0 }}
            >
              {button.title}
            </ThemedText>
          )}
        </Pressable>
      )}
      {children}
    </View>
  );
};

const useDemoStyles = () => {
  const { scale } = useScale();
  const plainColor = useThemeColor({}, 'text');
  const focusedColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      paddingHorizontal: Padding / 2,
      backgroundColor,
    },
    text: {
      fontSize: 16 * scale,
      marginBottom: 8,
      color: plainColor,
    },
    textTitle: {
      fontWeight: 'bold',
    },
    textFocused: {
      color: focusedColor,
    },
  });
};
