import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  mix,
  BackdropFilter,
  Blur,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

import { useLoop } from '../Animations';
import { ThemedView } from '../../ThemedView';
import { useScale } from '@/hooks/useScale';

export const Glassmorphism = () => {
  const { width: screenWidth, scale, height: screenHeight } = useScale();
  const width = 0.9 * screenWidth;
  const height = screenHeight - 200 * scale;
  const c = vec(width / 2, height / 2);
  const r = c.x - 32;
  const rect = useMemo(() => ({ x: 0, y: c.y, width, height }), [c.y, width]);

  const progress = useLoop({ duration: 2000 });
  const start = useDerivedValue(
    () => sub(c, vec(0, mix(progress.value, r, r / 2))),
    [progress],
  );
  const end = useDerivedValue(
    () => add(c, vec(0, mix(progress.value, r, r / 2))),
    [],
  );
  const radius = useDerivedValue(
    () => mix(progress.value, r, r / 2),
    [progress],
  );

  const styles = demoStyles(screenWidth, height);
  return (
    <ThemedView style={styles.container}>
      <Canvas style={{ width, height }} opaque>
        <Fill color="rgb(128,128,128)" />
        <Circle c={c} r={radius}>
          <LinearGradient
            start={start}
            end={end}
            colors={['#FFF723', '#E70696']}
          />
        </Circle>
        <BackdropFilter filter={<Blur blur={10 * scale} />} clip={rect}>
          <Fill color="rgba(0, 0, 0, 0.3)" />
        </BackdropFilter>
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
