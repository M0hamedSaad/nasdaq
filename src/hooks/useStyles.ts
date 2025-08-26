import { FONTS } from '@assets';
import { useAppConfigStore } from '@store';
import { PALETTE } from '@themes';
import type { StyleFnParams } from '@types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = <T>(styleFn: (params: StyleFnParams) => T): T => {
  const insets = useSafeAreaInsets();

  const config = useAppConfigStore(state => state);

  const _params: StyleFnParams = {
    theme: PALETTE[config?.theme || 'light'],
    isRtl: config?.isRtl,
    lang: config?.language,
    insets,
    fonts: FONTS,
  };
  return styleFn(_params);
};
