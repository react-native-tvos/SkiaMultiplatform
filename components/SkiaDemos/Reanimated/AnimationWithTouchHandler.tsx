import React from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withDecay, withTiming } from 'react-native-reanimated';

import { AnimationDemo, Size, Padding } from './Components';
import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';

export const AnimationWithTouchHandler = () => {
  const { width: windowWidth, scale } = useScale();
  const width = windowWidth * 0.9;
  const backgroundColor = useThemeColor({}, 'background');
  const linkColor = useThemeColor({}, 'link');

  const translateX = useSharedValue((width - Size - Padding) / 2);

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
    })
    .onEnd((e) => {
      const leftBoundary = Size;
      const rightBoundary = width - Size - Padding;
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  const pressGesture = () => {
    const oldValue = translateX.value;
    const leftBoundary = oldValue;
    const rightBoundary = oldValue;
    translateX.value = withTiming(oldValue + 100 * scale, {
      duration: 1000,
    });
    setTimeout(
      () =>
        (translateX.value = withDecay({
          velocity: -500,
          clamp: [leftBoundary, rightBoundary],
          rubberBandEffect: true,
          rubberBandFactor: 2,
        })),
      2000,
    );
  };
  return (
    <AnimationDemo
      title="Decay animation with touch handler"
      button={{
        title: 'Press center button to trigger animation',
        actions: {
          onPress: pressGesture,
        },
      }}
    >
      <GestureDetector gesture={gesture}>
        <Canvas
          style={{
            height: 80 * scale,
            width: '80%' as const,
            backgroundColor,
          }}
        >
          <Fill color={backgroundColor} />
          <Circle
            cx={translateX}
            cy={20 * scale}
            r={10 * scale}
            color={linkColor}
          />
          <Circle
            cx={translateX}
            cy={20 * scale}
            r={8 * scale}
            color={linkColor}
          />
        </Canvas>
      </GestureDetector>
    </AnimationDemo>
  );
};
