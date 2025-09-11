module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    'react-native-vector-icons/(.*)': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
  assets: ['./src/assets/fonts/'],
};