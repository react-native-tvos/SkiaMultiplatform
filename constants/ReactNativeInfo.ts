import { version as rnVersion } from 'react-native/package.json';
import { version as expoVersion } from 'expo/package.json';
import { version as routerVersion } from 'expo-router/package.json';
import { version as skiaVersion } from '@shopify/react-native-skia/package.json';

import { Platform } from 'react-native';

const hermesVersion = (global as any)?.HermesInternal?.getRuntimeProperties();
const jsEngine =
  Platform.OS === 'web' ? 'Browser' : hermesVersion ? `Hermes` : 'JSC';

const uiManager =
  ((global as any)?.nativeFabricUIManager as any) !== undefined
    ? 'Fabric'
    : 'Paper';

export const reactNativeInfo = {
  rnVersion,
  expoVersion,
  routerVersion,
  skiaVersion,
  hermesVersion,
  uiManager,
  jsEngine,
};
