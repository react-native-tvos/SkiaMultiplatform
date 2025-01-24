import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Canvas, Fill, Rect } from '@shopify/react-native-skia';

import { AnimationDemo, Size } from './Components';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

export const SimpleAnimation = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const barColor = useThemeColor({}, 'icon');
  const { scale, width: fullWindowWidth } = useScale();
  const windowWidth = fullWindowWidth;
  const width = useSharedValue(20);
  const rect = useDerivedValue(() => {
    return { x: 0, y: 10, width: width.value, height: Size };
  });
  useEffect(() => {
    width.value = withRepeat(
      withTiming(windowWidth * 0.8, { duration: 1000 }),
      -1,
    );
  }, [width, windowWidth]);
  return (
    <AnimationDemo title={'Basic animation using derived values'}>
      <Canvas
        style={{
          height: 40 * scale,
          width: windowWidth,
          backgroundColor,
        }}
      >
        <Fill color={backgroundColor} />
        <Rect rect={rect} color={barColor} />
      </Canvas>
    </AnimationDemo>
  );
};
