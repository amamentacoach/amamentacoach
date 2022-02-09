import api from 'services/api';

export type StatusFormSituation = 'ALTA' | '1D' | '15D' | '1M' | null;

export interface SurveyStatistics {
  id: number;
  question: string;
  options: {
    description: string;
    value: number;
  }[];
}

export interface AnswerFeedback {
  feedback: string;
  redirect: string;
}

// Registra a resposta do usuário para uma pergunta.
export async function answerQuestion(
  questionId: number,
  answers: string[],
): Promise<AnswerFeedback | undefined | null> {
  try {
    const { data } = await api.post(`/responder/${questionId}`, {
      respostas: answers,
    });
    return data !== 'OK' ? data : undefined;
  } catch (error) {
    return null;
  }
}

// Retorna as estatísticas das respostas da enquete.
export async function listSurveyStatistics(): Promise<
  SurveyStatistics[] | null
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

// Envia as resposta do usuário para o formulário de escala.
export async function answerStatusForm(
  situation: StatusFormSituation,
  answers: { id: number; content: string }[],
): Promise<number | null> {
  try {
    const response = await api.post('/responder/escala', {
      ocasiao: situation,
      respostas: answers.map(question => ({
        pergunta_id: question.id,
        descricao: question.content,
      })),
    });
    return response.data.score;
  } catch (error) {
    return null;
  }
}

// Envia as resposta do usuário para o formulário de alimentação.
export async function answerFeedingForm(
  situation: Exclude<StatusFormSituation, '1D'>,
  answers: string[],
): Promise<boolean> {
  try {
    await api.post('/responder/alimentacao', {
      ocasiao: situation,
      respostas: answers,
    });
    return true;
  } catch (error) {
    return false;
  }
}
