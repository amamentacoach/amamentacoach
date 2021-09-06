import perguntas from '../../../backend/common/perguntas';
import { MotherInfo } from '../services/auth';

export interface SurveyQuestion {
  id: string;
  target: string;
  category: number;
  description: string;
  options: string[];
  displayOther: boolean;
  multipleSelection: boolean;
}

// Retorna todos as perguntas de uma categoria que se aplicam a mãe.
export async function getSurveyQuestions(
  motherInfo: MotherInfo,
  options: { category?: number; id?: number },
): Promise<SurveyQuestion[]> {
  return perguntas
    .filter(pergunta => {
      if (options.id && options.id !== pergunta.id) {
        return false;
      }
      if (options.category && options.category !== pergunta.categoria) {
        return false;
      }
      // Caso o alvo seja UCI ou UTI e a mãe não possua bebês em nenhum dos dois essa pergunta não
      // deve ser retornada.
      if (
        pergunta.alvo === 'UCI/UTI' &&
        !motherInfo.babiesBirthLocations.UCI &&
        !motherInfo.babiesBirthLocations.UTI
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
