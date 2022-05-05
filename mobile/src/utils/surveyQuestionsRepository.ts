import { getTranslationFiles } from 'utils/localize';

import type { MotherInfo } from 'services/user';

export interface SurveyQuestion {
  id: number;
  target: string;
  category: number;
  description: string;
  options: string[];
  displayOther: boolean;
  multipleSelection: boolean;
}

class SurveyQuestionsRepository {
  private survey: SurveyQuestion[];

  constructor(motherInfo?: MotherInfo) {
    this.survey = this.loadQuestions(motherInfo);
  }

  private loadQuestions(motherInfo?: MotherInfo): SurveyQuestion[] {
    const { getSurvey } = getTranslationFiles();
    let questions = getSurvey().map(question => ({
      id: question.id,
      target: question.alvo,
      category: question.categoria,
      description: question.descricao,
      options: question.alternativas.split('|'),
      displayOther: question.outro,
      multipleSelection: question.multiplas,
    }));

    // Filtra as questões com base nos dados da mãe.
    if (motherInfo) {
      questions = questions.filter(question => {
        // Caso o alvo seja UCI ou UTI e a mãe não possua bebês em nenhum dos dois essa pergunta não
        // deve ser retornada.
        if (
          question.target === 'UCI/UTI' &&
          motherInfo &&
          !motherInfo.babiesBirthLocations.UCI &&
          !motherInfo.babiesBirthLocations.UCIN &&
          !motherInfo.babiesBirthLocations.UTI
        ) {
          return false;
        }
        return true;
      });
    }
    return questions;
  }

  findById(id: number): SurveyQuestion | null {
    const matchingQuestions = this.survey.filter(
      question => question.id === id,
    );
    if (matchingQuestions.length === 0) {
      return null;
    }
    return matchingQuestions[0];
  }

  findByCategory(category: number): SurveyQuestion[] {
    return this.survey.filter(question => question.category === category);
  }
}

export default SurveyQuestionsRepository;
