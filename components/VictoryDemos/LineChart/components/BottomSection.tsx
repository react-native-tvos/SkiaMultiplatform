import React from 'react';
import { useScale } from '@/hooks/useScale';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const BottomSection = () => {
  const { scale } = useScale();
  return (
    <>
      <ThemedView
        style={{
          marginTop: 5 * scale,
          paddingTop: 10 * scale,
          width: '95%',
          height: '30%',
          justifyContent: 'center',
        }}
      >
        <ThemedView>
          <ThemedView>
            <ThemedText type="subtitle">Apple Computers</ThemedText>
            <ThemedText type="subtitle">NASDAQ</ThemedText>
            <ThemedText type="default">Past Year</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
};
