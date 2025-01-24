import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { TVFocusGuideView, useColorScheme } from 'react-native';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import { Area, CartesianChart, Line, useChartPressState } from 'victory-native';

import { Text as SKText } from '@shopify/react-native-skia';
import { BottomSection } from './components/BottomSection';
import { DATA, DATA2 } from './utils/data';
import { useScale } from '@/hooks/useScale';

const inter = require('@/assets/fonts/roboto.ttf');
const interBold = require('@/assets/fonts/roboto-bold.ttf');

export const LineChart = () => {
  const { scale } = useScale();
  const font = useFont(inter, 12 * scale);
  const chartFont = useFont(interBold, 30 * scale);
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const colorMode = useColorScheme();
  const [chartData, setChartData] = useState(DATA);

  const value = useDerivedValue(() => {
    return '$' + state.y.highTmp.value.value.toFixed(2);
  }, [state]);

  const labelColor = colorMode === 'dark' ? 'white' : 'black';
  const lineColor = colorMode === 'dark' ? 'lightgrey' : 'black';

  return (
    <TVFocusGuideView autoFocus>
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
              if (chartData === DATA) {
                setChartData(DATA2);
              } else {
                setChartData(DATA);
              }
            }}
            style={({ pressed, focused }) => ({
              opacity: pressed || focused ? 0.6 : 1.0,
            })}
          >
            <ThemedText type="defaultSemiBold">Update Chart</ThemedText>
          </Pressable>
        </ThemedView>
        <ThemedView
          style={{
            paddingTop: 10 * scale,
            width: '95%',
            height: '55%',
          }}
        >
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={['highTmp']}
            domainPadding={{ top: 30 * scale }}
            axisOptions={{
              font,
              labelColor,
              lineColor,
            }}
            chartPressState={state}
          >
            {({ points, chartBounds }) => (
              <>
                <SKText
                  x={chartBounds.left + 10 * scale}
                  y={40 * scale}
                  font={chartFont}
                  text={value}
                  color={labelColor}
                  style={'fill'}
                />
                <Line
                  points={points.highTmp}
                  color="lightgreen"
                  strokeWidth={3 * scale}
                  animate={{ type: 'timing', duration: 500 }}
                />
                <Area
                  points={points.highTmp}
                  y0={chartBounds.bottom}
                  animate={{ type: 'timing', duration: 500 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 200 * scale)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={['green', '#90ee9050']}
                  />
                </Area>

                {isActive ? (
                  <ToolTip
                    x={state.x.position}
                    y={state.y.highTmp.position}
                    scale={scale}
                  />
                ) : null}
              </>
            )}
          </CartesianChart>
        </ThemedView>
        <BottomSection />
      </ThemedView>
    </TVFocusGuideView>
  );
};

function ToolTip({
  x,
  y,
  scale,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  scale: number;
}) {
  return <Circle cx={x} cy={y} r={8 * scale} color={'grey'} opacity={0.8} />;
}
