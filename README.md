# Skia multiplatform demo 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), and can be built for web, mobile devices (iOS, iPadOS, and Android), and TV devices (Apple TV, Android TV).

You can see the web version at

https://skiamultiplatform.expo.app/

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds
- the [Shopify react-native-skia](https://shopify.github.io/react-native-skia/) package to render high performance 2D graphics.
- the [victory-native](https://commerce.nearform.com/open-source/victory-native/) package, which uses Skia for charting and graphing data.
- the [react-native-bottom-tabs](https://callstackincubator.github.io/react-native-bottom-tabs/) package, which provides a fully native tab navigator for mobile and TV devices. (Web uses the `@react-navigation/bottom-tabs` navigator.)

This app includes the following demos from the `react-native-skia` examples:

- Breathe
- Glassmorphism
- Reanimated

For mobile and TV, this app includes the following demos from the `victory-native` examples:

- Line Chart
- Bar Chart

The demos have been slightly modified to render and size correctly on TV, and resize correctly on iPad screen rotations.

## 🚀 How to use

- `cd` into the project

- Build for mobile devices (including iPad tablet support)

```sh
yarn
yarn prebuild # Executes a clean Expo prebuild to generate iOS and Android native files
yarn ios # Build and run for iOS
yarn android # Build and run for Android
```

- Build for TV devices

```sh
yarn
yarn prebuild:tv # Executes a clean Expo prebuild to generate tvOS and Android TV native files
yarn ios # Build and run for Apple TV
yarn android # Build and run for Android TV
```

- Web (local development)

```sh
yarn
yarn web # Runs the web app as a local development server on port 8081
```

- Web (deploy to EAS hosting)

```sh
yarn
eas init
yarn build:web # Build the web deployment bundle
yarn deploy:web # Deploy to the EAS hosting dev environment
```

> **_NOTE:_**
> Setting the environment variable `EXPO_TV=1` enables the `@react-native-tvos/config-tv` plugin to modify the project for TV.
> This can also be done by setting the parameter `isTV` to true in the `app.json`.
