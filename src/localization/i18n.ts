import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar } from './ar';
import { en } from './en';
import type { LangType, LocalizationType } from './types';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

export const initI18n = (lng: LangType) => {
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};

export const i18nChangeLanguage = (lang: LangType) => {
  i18n.changeLanguage(lang);
  // LayoutAnimation.easeInEaseOut();
};

export const t = (key: keyof LocalizationType) => i18n.t(key);
