import { useTranslation } from 'react-i18next';
import i18n, {
  changeLanguage as i18nChangeLanguage,
  hasSelectedLanguage as i18nHasSelectedLanguage,
  setLanguageSelected as i18nSetLanguageSelected,
  SUPPORTED_LANGUAGES,
  isRtl,
  type SupportedLanguage,
} from '../i18n';

const LANGUAGE_KEY = 'taskflow_language';

export const useLanguage = () => {
  const { t, i18n: i18nInstance } = useTranslation();

  const currentLanguage: SupportedLanguage = (i18nInstance.language || 'en') as SupportedLanguage;

  const changeLanguage = async (lang: string) => {
    await i18nChangeLanguage(lang);
  };

  return {
    t,
    i18n: i18nInstance,
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isSpanish: currentLanguage === 'es',
    isRtl: isRtl(currentLanguage),
    setLanguageSelected: i18nSetLanguageSelected,
    hasSelectedLanguage: i18nHasSelectedLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};

export const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANGUAGE_KEY) || 'en';
};

export const changeLanguage = (lang: string) => {
  return i18nChangeLanguage(lang);
};

export { hasSelectedLanguage, setLanguageSelected } from '../i18n';
