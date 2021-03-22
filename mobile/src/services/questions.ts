import api from './api';

export interface IFAQ {
  id: number;
  description: string;
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
export async function listQuestions(): Promise<IFAQ[] | null> {
  try {
    const { data } = await api.get('/duvidas/frequentes');
    const questions = data.map((question: any) => ({
      id: question.id,
      description: question.descricao,
      answer: question.resposta,
    }));
    return questions;
  } catch (error) {
    return null;
  }
}
