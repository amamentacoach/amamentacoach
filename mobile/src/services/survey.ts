import api from './api';

export interface ISurveyQuestion {
  id: number;
  target: string;
  category: number;
  description: string;
  options: string[];
  displayOther: boolean;
  multipleSelection: boolean;
}

export interface ISurveyStatistics {
  id: number;
  question: string;
  options: {
    description: string;
    value: number;
  }[];
}

export interface IAnswerFeedback {
  feedback: string;
  redirect: string;
}

// Registra a resposta do usuário para uma pergunta.
export async function answerQuestion(questionId: number, answers: string[]) {
  try {
    const { data } = await api.post(`/responder/${questionId}`, {
      respostas: answers,
    });
    return data !== 'OK' ? data : undefined;
  } catch (error) {
    return null;
  }
}

// Retorna todos as perguntas feitas no diário.
export async function listQuestions(
  questionCategory: number,
): Promise<ISurveyQuestion[] | null> {
  try {
    const { data } = await api.get(`/perguntas/${questionCategory}`);
    const surveyQuestions = data.map((question: any) => ({
      id: question.id,
      target: question.alvo,
      category: question.categoria,
      description: question.descricao,
      options: question.alternativas,
      displayOther: question.outro,
      multipleSelection: question.multiplas,
    }));
    return surveyQuestions;
  } catch (error) {
    return null;
  }
}

// Retorna as estatísticas das respostas da enquete.
export async function listSurveyStatistics(): Promise<
  ISurveyStatistics[] | null
> {
  try {
    const { data } = await api.get(`/amamentacao/resultados`);
    const surveyStatistics = data.map((question: any) => ({
      id: question.id,
      question: question.pergunta,
      options: question.alternativas.map((option: any) => ({
        description: option.descricao,
        value: parseInt(option.total, 10),
      })),
    }));
    return surveyStatistics;
  } catch (error) {
    return null;
  }
}
