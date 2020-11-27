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

// Registra a resposta do usuário para uma pergunta.
export async function answerQuestion(
  questionId: number,
  answers: string[],
): Promise<boolean> {
  try {
    await api.post(`/responder/${questionId}`, {
      respostas: answers,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todos as perguntas registros feitos no diário.
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
