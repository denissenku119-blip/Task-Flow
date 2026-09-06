import { useTranslation } from 'react-i18next';
import i18n, { changeLanguage as i18nChangeLanguage, hasSelectedLanguage, setLanguageSelected } from '../i18n';

const LANGUAGE_KEY = 'taskflow_language';

export const useLanguage = () => {
  const { t, i18n: i18nInstance } = useTranslation();

  const currentLanguage = i18nInstance.language;

  const changeLanguage = (lang: string) => {
    i18nChangeLanguage(lang);
    setLanguageSelected(lang);
  };

  const isEnglish = currentLanguage === 'en';
  const isSpanish = currentLanguage === 'es';

  return {
    t,
    i18n: i18nInstance,
    currentLanguage,
    changeLanguage,
    isEnglish,
    isSpanish,
    setLanguageSelected,
    hasSelectedLanguage,
  };
};

export const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANGUAGE_KEY) || 'en';
};

export const changeLanguage = (lang: string) => {
  i18nChangeLanguage(lang);
};

export { hasSelectedLanguage, setLanguageSelected };
