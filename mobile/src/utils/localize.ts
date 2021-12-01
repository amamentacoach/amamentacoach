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
  getAppTranslation: () => object;
}

type Translations = {
  [key in SupportedLocales]: Translation;
};

// Arquivos de tradução para cada idioma.
const translations: Translations = {
  en: {
    getDateLocale: () => require('date-fns/locale/en-CA'),
    getSurvey: () => require('@common/perguntas-en').default,
    getAppTranslation: () => require('@assets/locales/en'),
  },
  pt: {
    getDateLocale: () => require('date-fns/locale/pt-BR'),
    getSurvey: () => require('@common/perguntas-pt').default,
    getAppTranslation: () => require('@assets/locales/pt'),
  },
};

// Idioma usado caso o usuário não utilize um idioma suportado pelo aplicativo.
const fallbackLanguage: SupportedLocales = SupportedLocales.EN;

interface LocaleInfo {
  languageTag: SupportedLocales;
  isRTL: boolean;
}

// Retorna a linguagem suportada pelo app apropriada para o usuário.
// Caso nenhuma língua suportada pelo app seja encontrada é retornado o idioma de fallback.
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
    [languageTag]: translations[languageTag].getAppTranslation(),
  };
  i18n.locale = languageTag;
  // Define o formato de data utilizado pelo date-fns.
  dateFNSSetLocale(translations[languageTag].getDateLocale());
}

// Retorna o objeto de tradução para o idioma do usuário.
export function getTranslationFiles(): Translation {
  const { languageTag } = getBestLocale();
  return translations[languageTag];
}
