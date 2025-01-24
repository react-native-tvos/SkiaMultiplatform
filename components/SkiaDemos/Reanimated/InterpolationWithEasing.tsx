import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { AnimationDemo, Size, Padding } from './Components';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

function mix(value: number, x: number, y: number) {
  'worklet';
  return x * (1 - value) + y * value;
}

export const InterpolationWithEasing = () => {
  const { width: windowWidth, scale } = useScale();
  const backgroundColor = useThemeColor({}, 'background');
  const circleColor = useThemeColor({}, 'link');
  const width = windowWidth;
  const progress = useSharedValue(0);
  const position = useDerivedValue(() => {
    return mix(progress.value, 10, width * 0.85 - (Size + Padding));
  });
  const radius = useDerivedValue(() => {
    return 5 + progress.value * 20 * scale;
  });
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true,
    );
  }, [progress]);
  return (
    <AnimationDemo title={'Interpolating value using an easing'}>
      <Canvas
        style={{
          height: 120 * scale,
          width,
          backgroundColor,
        }}
      >
        <Fill color={backgroundColor} />
        <Circle cx={position} cy={50 * scale} r={radius} color={circleColor} />
      </Canvas>
    </AnimationDemo>
  );
};
