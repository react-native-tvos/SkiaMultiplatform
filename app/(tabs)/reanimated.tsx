import { ReanimatedExample } from '@/components/SkiaDemos/Reanimated/index';
import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';

export default function ReanimatedScreen() {
  return (
    <SkiaDemoScreen title={`Reanimated examples`}>
      <ReanimatedExample />
    </SkiaDemoScreen>
  );
}
