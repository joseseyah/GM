module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-neomorph-shadows': {
      platforms: {
        android: null, // Disable autolinking for Android
      },
    },
  },
};
