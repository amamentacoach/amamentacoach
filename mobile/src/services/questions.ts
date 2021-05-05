import api from './api';

export interface FAQ {
  question: string;
  answer: string;
}

// Cria uma nova pergunta do usuário.
export async function createQuestion(question: string): Promise<boolean> {
  try {
    await api.post('/duvidas', {
      descricao: question,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna as perguntas frequentes e suas respostas.
export async function listQuestions(): Promise<FAQ[] | null> {
  try {
    const { data } = await api.get('/duvidas/frequentes');
    const questions = data.map((question: any) => ({
      question: question.descricao,
      answer: question.resposta,
    }));
    return questions;
  } catch (error) {
    return null;
  }
}
