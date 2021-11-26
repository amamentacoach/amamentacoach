import i18n from 'i18n-js';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import { dateFNSSetLocale } from 'lib/date-fns';

import type { Pergunta } from '@common/perguntas';

// Idiomas suportados pelo app.
export enum SupportedLocales {
  EN = 'en',
  PT = 'pt',
}

interface Translation {
  // Objeto de locale do date-fns.
  getDateLocale: () => Locale;
  // Tradução das enquetes.
  getSurvey: () => Pergunta[];
  // Tradução das telas do aplicativo.
  getTranslation: () => object;
}

type Translations = {
  [key in SupportedLocales]: Translation;
};

// Arquivos de tradução para cada idioma.
const translations: Translations = {
  en: {
    getDateLocale: () => require('date-fns/locale/en-CA'),
    getSurvey: () => require('@common/perguntas-en').default,
    getTranslation: () => require('@assets/locales/en'),
  },
  pt: {
    getDateLocale: () => require('date-fns/locale/pt-BR'),
    getSurvey: () => require('@common/perguntas-pt').default,
    getTranslation: () => require('@assets/locales/pt'),
  },
};

// Idioma usado caso o usuário não utilize um idioma suportado pelo aplicativo.
const fallbackLanguage: SupportedLocales = SupportedLocales.PT;

interface LocaleInfo {
  languageTag: SupportedLocales;
  isRTL: boolean;
}

// Retorna a linguagem suportada pelo app apropriada para o usuário.
// Caso nenhuma língua seja encontrada é utilizado português.
export function getBestLocale(): LocaleInfo {
  const fallbackLocale = { languageTag: fallbackLanguage, isRTL: false };
  const bestMatch = RNLocalize.findBestAvailableLanguage(
    Object.values(SupportedLocales),
  );
  return (bestMatch as LocaleInfo) || fallbackLocale;
}

// Carrega o idioma e locale da data de acordo com a linguagem do usuário.
export function setI18nConfig(): void {
  const { languageTag, isRTL } = getBestLocale();
  I18nManager.forceRTL(isRTL);
  // Define o idioma do aplicativo.
  i18n.translations = {
    [languageTag]: translations[languageTag].getTranslation(),
  };
  i18n.locale = languageTag;
  // Define o formato de data utilizado pelo date-fns.
  dateFNSSetLocale(translations[languageTag].getDateLocale());
}

// Retorna um objeto de tradução.
export function getTranslation(key: SupportedLocales): Translation {
  return translations[key] || translations[fallbackLanguage];
}
