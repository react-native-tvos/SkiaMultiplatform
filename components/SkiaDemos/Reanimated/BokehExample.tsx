import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';

import { AnimationDemo } from './Components';
import { useScale } from '@/hooks/useScale';

const width = 600;
const exampleHeight = 300;

function getRandomWidth(scale: number) {
  return Math.random() * width * scale;
}

function getRandomHeight(scale: number) {
  return Math.random() * exampleHeight * scale;
}

function getRandomHue() {
  return 100 + Math.random() * 100;
}

function getRandomPositionDiff(scale: number) {
  return -100 + Math.random() * 200 * scale;
}

function getRandomHueDiff() {
  return Math.random() * 100;
}

function MovingCircle({ scale }: { scale: number }) {
  const x = useSharedValue(getRandomWidth(scale));
  const y = useSharedValue(getRandomHeight(scale));
  const hue = useSharedValue(getRandomHue());

  const duration = 2000 + Math.random() * 1000;
  const power = Math.random();
  const config = { duration, easing: Easing.linear };
  const size = 50 * scale + power * exampleHeight * 0.3;

  const update = () => {
    x.value = withTiming(x.value + getRandomPositionDiff(scale), config);
    y.value = withTiming(y.value + getRandomPositionDiff(scale), config);
    hue.value = withTiming(hue.value + getRandomHueDiff(), config);
  };

  React.useEffect(() => {
    update();
    const id = setInterval(update, duration);
    return () => clearInterval(id);
  });

  const color = useDerivedValue(() => {
    return `hsl(${hue.value}, 100%, 50%)`;
  });

  return (
    <Circle
      cx={x}
      cy={y}
      r={size}
      color={color}
      opacity={0.1 + (1 - power) * 0.1}
    />
  );
}

interface BokehProps {
  count: number;
  scale: number;
}

function Bokeh({ count, scale }: BokehProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <MovingCircle scale={scale} key={i} />
      ))}
    </>
  );
}

export function BokehExample() {
  const { scale } = useScale();
  return (
    <AnimationDemo
      title={"Reanimated's bokeh"}
      button={{
        title: '',
        actions: {},
      }}
    >
      <Canvas
        style={{
          height: exampleHeight * scale,
          width: '100%' as const,
          backgroundColor: 'black' as const,
        }}
      >
        <Fill color="black" />
        <Bokeh scale={scale} count={100} />
      </Canvas>
    </AnimationDemo>
  );
}
