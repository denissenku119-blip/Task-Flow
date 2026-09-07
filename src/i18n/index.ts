import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import zh from './locales/zh/translation.json';
import hi from './locales/hi/translation.json';
import ar from './locales/ar/translation.json';
import fr from './locales/fr/translation.json';
import bn from './locales/bn/translation.json';
import pt from './locales/pt/translation.json';
import id from './locales/id/translation.json';
import ur from './locales/ur/translation.json';
import ru from './locales/ru/translation.json';
import de from './locales/de/translation.json';
import ja from './locales/ja/translation.json';
import tr from './locales/tr/translation.json';
import ko from './locales/ko/translation.json';

const LANGUAGE_KEY = 'taskflow_language';
export const RTL_LANGUAGES = ['ar', 'ur'] as const;
export type SupportedLanguage =
  | 'en' | 'es' | 'zh' | 'hi' | 'ar' | 'fr' | 'bn' | 'pt'
  | 'id' | 'ur' | 'ru' | 'de' | 'ja' | 'tr' | 'ko';

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; name: string; nativeName: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English',    nativeName: 'English',          flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Spanish',    nativeName: 'Español',          flag: '🇪🇸', dir: 'ltr' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文（简体）',     flag: '🇨🇳', dir: 'ltr' },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',           flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية',         flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'French',     nativeName: 'Français',         flag: '🇫🇷', dir: 'ltr' },
  { code: 'bn', name: 'Bengali',    nativeName: 'বাংলা',            flag: '🇧🇩', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português',        flag: '🇵🇹', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'ur', name: 'Urdu',       nativeName: 'اردو',            flag: '🇵🇰', dir: 'rtl' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский',          flag: '🇷🇺', dir: 'ltr' },
  { code: 'de', name: 'German',     nativeName: 'Deutsch',          flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja', name: 'Japanese',   nativeName: '日本語',           flag: '🇯🇵', dir: 'ltr' },
  { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe',           flag: '🇹🇷', dir: 'ltr' },
  { code: 'ko', name: 'Korean',     nativeName: '한국어',            flag: '🇰🇷', dir: 'ltr' },
];

// Get saved language or default to 'en'
const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANGUAGE_KEY) || 'en';
};

const isSupported = (lng: string): lng is SupportedLanguage =>
  SUPPORTED_LANGUAGES.some(l => l.code === lng);

export const isRtl = (lng: string): boolean =>
  (RTL_LANGUAGES as readonly string[]).includes(lng);

const applyDocumentDirection = (lng: string) => {
  if (typeof document === 'undefined') return;
  const dir = isRtl(lng) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lng);
};

const resources = {
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  hi: { translation: hi },
  ar: { translation: ar },
  fr: { translation: fr },
  bn: { translation: bn },
  pt: { translation: pt },
  id: { translation: id },
  ur: { translation: ur },
  ru: { translation: ru },
  de: { translation: de },
  ja: { translation: ja },
  tr: { translation: tr },
  ko: { translation: ko },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES.map(l => l.code),
    nonExplicitSupportedLngs: false,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  }, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.warn('i18n initialization warning:', err);
    }
    // Apply initial direction
    applyDocumentDirection(i18n.language);
  });

// Listen for language changes and save to localStorage + update document direction
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, lng);
    applyDocumentDirection(lng);
  }
});

export const changeLanguage = async (lang: string): Promise<void> => {
  const target = isSupported(lang) ? lang : 'en';
  await i18n.changeLanguage(target);
  applyDocumentDirection(target);
};

export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

export const hasSelectedLanguage = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(LANGUAGE_KEY) !== null;
};

export const setLanguageSelected = async (lang: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  const target = isSupported(lang) ? lang : 'en';
  localStorage.setItem(LANGUAGE_KEY, target);
  await i18n.changeLanguage(target);
  applyDocumentDirection(target);
};

export default i18n;
