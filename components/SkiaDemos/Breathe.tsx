import React, { useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import {
  BlurMask,
  vec,
  Canvas,
  Circle,
  Fill,
  Group,
  polar2Canvas,
  mix,
} from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';

import { useLoop } from './Animations';

import { useScale } from '@/hooks/useScale';
import { ThemedView } from '@/components/ThemedView';

interface RingProps {
  index: number;
  progress: SharedValue<number>;
  total: number;
}

const Ring = ({ index, progress, total }: RingProps) => {
  const { scale, height: screenHeight, width: screenWidth } = useScale();
  const width = 0.9 * screenWidth;
  const height = screenHeight - 200 * scale;
  const colorScheme = useColorScheme();
  const c1 = colorScheme === 'dark' ? '#61bea2' : '#223344';
  const c2 = colorScheme === 'dark' ? '#529ca0' : '#334455';

  const R = width / 8;
  const center = useMemo(
    () => vec(width / 2 - 150 * scale, height / 2 - 100 * scale),
    [height, width],
  );

  const transform = useDerivedValue(() => {
    const theta = (index * (2 * Math.PI)) / total;
    const { x, y } = polar2Canvas(
      { theta, radius: progress.value * R },
      { x: 0, y: 0 },
    );
    const scale = mix(progress.value, 0.3, 0.6);
    return [{ translateX: x }, { translateY: y }, { scale }];
  });

  return (
    <Circle
      c={center}
      r={R}
      color={index % 2 ? c1 : c2}
      origin={center}
      transform={transform}
    />
  );
};

export const Breathe = () => {
  const { scale, height: screenHeight, width: screenWidth } = useScale();
  const width = 0.9 * screenWidth;
  const height = screenHeight;
  const styles = demoStyles(screenWidth, height);
  const center = useMemo(
    () => vec(0.75 * width, 0.25 * height),
    [height, width],
  );

  const colorScheme = useColorScheme();

  const progress = useLoop({ duration: 3000 });

  const transform = useDerivedValue(() => [
    { rotate: mix(progress.value, -Math.PI / 2, 0) },
  ]);

  return (
    <ThemedView style={styles.container}>
      <Canvas style={{ width, height }} opaque>
        <Fill
          color={
            colorScheme === 'dark' ? 'rgb(20, 30, 40)' : 'rgb(247, 249, 251)'
          }
        />
        <Group origin={center} transform={transform} blendMode="hardLight">
          <BlurMask style="solid" blur={40 * scale} />
          {new Array(6).fill(0).map((_, index) => {
            return (
              <Ring key={index} index={index} progress={progress} total={6} />
            );
          })}
        </Group>
      </Canvas>
    </ThemedView>
  );
};

const demoStyles = (width: number, height: number) => {
  return StyleSheet.create({
    container: {
      width,
      height,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
