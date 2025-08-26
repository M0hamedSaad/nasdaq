module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'babel-jest',
      { presets: ['module:metro-react-native-babel-preset'] },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native' +
      '|@react-navigation' +
      '|react-native' +
      '|react-clone-referenced-element' +
      '|react-native-safe-area-context' +
      '|@react-native-community' +
      '|@react-native-masked-view' +
      '|react-native-gesture-handler' +
      '|react-native-reanimated' +
      '|react-native-screens' +
      '|react-native-vector-icons' +
      '|@tanstack/query-core' +
      '|@tanstack/react-query' +
      '|@react-navigation/native' + // <--- explicitly include this
      '|react-native/src' + // 👈🏽 explicitly include this
      ')',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
