import React from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, Fill, Line } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { AnimationDemo, Size, Padding } from './Components';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

export const SpringBackTouchAnimation = () => {
  const { width: windowWidth, scale } = useScale();
  const width = windowWidth * 0.9;
  const FgColor = useThemeColor({}, 'link');
  const BgColor = useThemeColor({}, 'background');

  const startX = width / 2 - (Size * 2 - Padding) + Size;
  const startY = 2 * Size;
  const centerX = useSharedValue(startX);
  const centerY = useSharedValue(startY);
  const savedCenterX = useSharedValue(startX);

  const rectCenter = useDerivedValue(() => {
    return { x: centerX.value, y: centerY.value };
  });

  const gesture = Gesture.Pan()
    .onChange((e) => {
      centerX.value += e.changeX;
      centerY.value += e.changeY;
    })
    .onEnd(() => {
      centerX.value = withSpring(startX);
      centerY.value = withSpring(startY);
    });

  const pressInGesture = () => {
    savedCenterX.value = centerX.value;
    centerX.value = withTiming(savedCenterX.value + 200 * scale, {
      duration: 1000,
    });
  };

  const pressOutGesture = () => {
    centerX.value = withSpring(savedCenterX.value);
  };

  return (
    <AnimationDemo
      title={'Spring back animation'}
      button={{
        title: 'Press and hold to pull right, let go to spring back',
        actions: {
          onPressIn: pressInGesture,
          onPressOut: pressOutGesture,
        },
      }}
    >
      <GestureDetector gesture={gesture}>
        <Canvas
          style={{
            height: 80 * scale,
            width: '80%' as const,
            backgroundColor: BgColor,
          }}
        >
          <Fill color={BgColor} />
          <Line
            p1={{ x: width / 2 - (Size - Padding), y: 0 }}
            p2={rectCenter}
            color={BgColor}
            strokeWidth={2}
            style="fill"
          />
          <Circle c={rectCenter} r={Size} color={FgColor} />
          <Circle
            c={rectCenter}
            r={Size}
            color={BgColor}
            strokeWidth={5}
            style="stroke"
          />
        </Canvas>
      </GestureDetector>
    </AnimationDemo>
  );
};
