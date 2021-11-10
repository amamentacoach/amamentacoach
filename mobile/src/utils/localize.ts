import { enCA, ptBR } from 'date-fns/locale';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import { dateFNSSetLocale } from 'lib/date-fns';

export enum SupportedLocales {
  EN = 'en',
  PT = 'pt',
}

type Translation = {
  [key in SupportedLocales]: {
    getTranslation: () => object;
    dateLocale: Locale;
  };
};

interface LocaleInfo {
  languageTag: SupportedLocales;
  isRTL: boolean;
}

// Retorna a linguagem suportada pelo app apropriada para o usuário.
// Caso nenhuma língua seja encontrada é utilizado português.
export function getBestLocale(): LocaleInfo {
  const fallback = { languageTag: 'pt', isRTL: false };
  const bestMatch = RNLocalize.findBestAvailableLanguage(
    Object.values(SupportedLocales),
  );
  return (bestMatch as LocaleInfo) || fallback;
}

// Carrega o idioma e locale correto de acordo com a linguagem do usuário.
export function setI18nConfig() {
  const translationPaths: Translation = {
    pt: {
      getTranslation: () => require('@assets/locales/pt.json'),
      dateLocale: ptBR,
    },
    en: {
      getTranslation: () => require('@assets/locales/en.json'),
      dateLocale: enCA,
    },
  };

  const { languageTag, isRTL } = getBestLocale();

  I18nManager.forceRTL(isRTL);
  i18n.translations = {
    [languageTag]: translationPaths[languageTag].getTranslation(),
  };
  i18n.locale = languageTag;
  dateFNSSetLocale(translationPaths[languageTag].dateLocale);
}
