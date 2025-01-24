import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AnimateTextOnPath } from './AnimateTextOnPath';
import { AnimationWithTouchHandler } from './AnimationWithTouchHandler';
import { BokehExample } from './BokehExample';
import { InterpolationWithEasing } from './InterpolationWithEasing';
import { SimpleAnimation } from './SimpleAnimation';
import { SpringBackTouchAnimation } from './SpringBackTouch';

export const ReanimatedExample: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnimationWithTouchHandler />
      <SimpleAnimation />
      <InterpolationWithEasing />
      <AnimateTextOnPath />
      <SpringBackTouchAnimation />
      <BokehExample />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
});
