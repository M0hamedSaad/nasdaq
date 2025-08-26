import type { LangType } from '@localization';
import type { ThemeType } from '@themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppConfigState {
  isRtl: boolean;
  theme: ThemeType;
  language: LangType;
  setTheme: (theme: ThemeType) => void;
  setLanguage: (lang: LangType) => void;
}
export const useAppConfigStore = create<AppConfigState>()(
  persist(
    set => ({
      isRtl: false,
      theme: 'light',
      language: 'en',
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language, isRtl: language === 'ar' }),
    }),
    {
      name: 'app-config',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
