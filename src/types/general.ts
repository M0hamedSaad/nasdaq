import type { FONTS } from '@assets';
import type { LangType } from '@localization';
import type { Theme } from '@themes';
import type { EdgeInsets } from 'react-native-safe-area-context';

export interface StyleFnParams {
  theme: Theme;
  isRtl: boolean;
  lang: LangType;
  insets?: EdgeInsets;
  fonts: typeof FONTS;
}

export interface StockItem {
  name: string;
  ticker: string;
  lastPrice?: number;
  volume?: number;
  updatedAt?: number;
}
