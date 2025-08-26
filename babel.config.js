module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@utils': './src/utils/index.ts',
          '@assets': './src/assets/index.ts',
          '@components': './src/components/index.ts',
          '@constants': './src/constants/index.ts',
          '@hooks': './src/hooks/index.ts',
          '@navigation': './src/navigation/index.ts',
          '@screens': './src/screens/index.ts',
          '@store': './src/store/index.ts',
          '@types': './src/types/index.ts',
          '@localization': './src/localization/index.ts',
          '@themes': './src/themes/index.ts',
          '@httpClient': './src/httpClient/index.ts',
          '@services': './src/services/index.ts',
        },
      },
    ],
  ],
};
