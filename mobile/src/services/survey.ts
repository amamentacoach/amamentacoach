import api from './api';

export interface SurveyQuestion {
  id: number;
  target: string;
  category: number;
  description: string;
  options: string[];
  displayOther: boolean;
  multipleSelection: boolean;
}

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

export interface StatusForm {
  statusQuestions: SurveyQuestion[];
  feedingQuestion: SurveyQuestion;
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
): Promise<SurveyQuestion[] | null> {
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

// Retorna todos as perguntas da escala e alimentação.
export async function listStatusFormQuestions(): Promise<StatusForm | null> {
  try {
    const { data } = await api.get('/perguntas/escalaealimentacao');
    const statusQuestions = data.escala.map((field: any) => ({
      id: field.id,
      target: field.alvo,
      category: field.categoria,
      description: field.descricao,
      options: field.alternativas,
      displayOther: field.outro,
      multipleSelection: field.multiplas,
    }));
    const feedingQuestion = {
      id: data.alimentacao.id,
      target: data.alimentacao.alvo,
      category: data.alimentacao.categoria,
      description: data.alimentacao.descricao,
      options: data.alimentacao.alternativas,
      displayOther: data.alimentacao.outro,
      multipleSelection: data.alimentacao.multiplas,
    };
    return {
      statusQuestions,
      feedingQuestion,
    };
  } catch (error) {
    return null;
  }
}

// Envia as resposta do usuário para o formulário de escala.
export async function answerStatusForm(
  situation: 'ALTA' | '1D' | '15D' | '1M',
  answers: { id: number; content: string }[],
): Promise<boolean> {
  try {
    await api.post('/responder/escala', {
      ocasiao: situation,
      respostas: answers.map(question => ({
        pergunta_id: question.id,
        descricao: question.content,
      })),
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Envia as resposta do usuário para o formulário de alimentação.
export async function answerFeedingForm(
  situation: 'ALTA' | '15D' | '1M',
  answer: string,
): Promise<boolean> {
  try {
    await api.post('/responder/alimentacao', {
      ocasiao: situation,
      descricao: answer,
    });
    return true;
  } catch (error) {
    return false;
  }
}
