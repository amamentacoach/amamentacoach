import surveyPt from '@common/perguntas';
import surveyEn from '@common/perguntas-en';

import { getBestLocale, SupportedLocales } from 'utils/localize';

import type { MotherInfo } from 'services/auth';

export interface SurveyQuestion {
  id: string;
  target: string;
  category: number;
  description: string;
  options: string[];
  displayOther: boolean;
  multipleSelection: boolean;
}

interface GetSurveyQuestionOptions {
  motherInfo?: MotherInfo;
  category?: number;
  id?: number;
}

type Surveys = Record<SupportedLocales, typeof surveyPt>;

// Retorna todos as perguntas de uma categoria que se aplicam a mãe.
export function getSurveyQuestions({
  id,
  category,
  motherInfo,
}: GetSurveyQuestionOptions): SurveyQuestion[] {
  const { languageTag } = getBestLocale();

  const surveys: Surveys = {
    en: surveyEn,
    pt: surveyPt,
  };

  return surveys[languageTag]
    .filter(question => {
      if (id && id !== question.id) {
        return false;
      }
      if (category && category !== question.categoria) {
        return false;
      }
      // Caso o alvo seja UCI ou UTI e a mãe não possua bebês em nenhum dos dois essa pergunta não
      // deve ser retornada.
      if (
        motherInfo &&
        !motherInfo.babiesBirthLocations.UCI &&
        !motherInfo.babiesBirthLocations.UTI &&
        question.alvo === 'UCI/UTI'
      ) {
        return false;
      }
      return true;
    })
    .map(question => ({
      id: question.id.toString(),
      target: question.alvo,
      category: question.categoria,
      description: question.descricao,
      options: question.alternativas.split('|'),
      displayOther: question.outro,
      multipleSelection: question.multiplas,
    }));
}
