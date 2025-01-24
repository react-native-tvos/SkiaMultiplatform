import React, { useState } from 'react';

import { CartesianChart, Bar, useChartPressState } from 'victory-native';
import { Circle, useFont, vec } from '@shopify/react-native-skia';
import { useColorScheme, Pressable } from 'react-native';
import { LinearGradient, Text as SKText } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import { useScale } from '@/hooks/useScale';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const inter = require('@/assets/fonts/roboto.ttf');

const DATA = (length: number = 10) =>
  Array.from({ length }, (_, index) => ({
    month: index + 1,
    listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }));

export const BarChart = () => {
  const { scale } = useScale();
  const [data, setData] = useState(DATA(5));
  const font = useFont(inter, 12 * scale);
  const toolTipFont = useFont(inter, 24 * scale);
  const colorMode = useColorScheme();
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { listenCount: 0 },
  });

  const isDark = colorMode === 'dark';

  const value = useDerivedValue(() => {
    return '$' + state.y.listenCount.value.value;
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.listenCount.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!toolTipFont) {
      return 0;
    }
    return (
      state.x.position.value - toolTipFont.measureText(value.value).width / 2
    );
  }, [value, toolTipFont]);

  return (
    <ThemedView
      style={{
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 5 * scale,
      }}
    >
      <ThemedView
        style={{
          alignItems: 'flex-start',
          paddingHorizontal: 5 * scale,
          width: '95%',
        }}
      >
        <Pressable
          onPress={() => {
            setData(DATA(5));
          }}
        >
          <ThemedText type="defaultSemiBold">Update Chart</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView
        style={{
          paddingTop: 10 * scale,
          width: '95%',
          height: '75%',
        }}
      >
        <CartesianChart
          xKey="month"
          padding={5 * scale}
          yKeys={['listenCount']}
          domain={{ y: [0, 100] }}
          domainPadding={{
            left: 50 * scale,
            right: 50 * scale,
            top: 30 * scale,
          }}
          axisOptions={{
            font,
            tickCount: 5,
            formatXLabel: (value) => {
              const date = new Date(2023, value - 1);
              return date.toLocaleString('default', { month: 'short' });
            },
            lineColor: isDark ? '#71717a' : '#d4d4d8',
            labelColor: isDark ? 'white' : 'black',
          }}
          chartPressState={state}
          data={data}
        >
          {({ points, chartBounds }) => {
            return (
              <>
                <Bar
                  points={points.listenCount}
                  chartBounds={chartBounds}
                  animate={{ type: 'timing', duration: 1000 }}
                  roundedCorners={{
                    topLeft: 10 * scale,
                    topRight: 10 * scale,
                  }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400 * scale)}
                    colors={['green', '#90ee9050']}
                  />
                </Bar>

                {isActive ? (
                  <>
                    <SKText
                      font={toolTipFont}
                      color={isDark ? 'white' : 'black'}
                      x={textXPosition}
                      y={textYPosition}
                      text={value}
                    />
                    <Circle
                      cx={state.x.position}
                      cy={state.y.listenCount.position}
                      r={8}
                      color={'grey'}
                      opacity={0.8}
                    />
                  </>
                ) : null}
              </>
            );
          }}
        </CartesianChart>
      </ThemedView>
    </ThemedView>
  );
};
