import api from './api';

export interface IMessage {
  name: string;
  content: string;
  date: string;
}

// Retorna as mensagens enviadas pelos usuários.
export async function listMessages(page: number): Promise<IMessage[] | null> {
  try {
    const { data } = await api.get(`/mensagens?page=${page}`);
    const messages = data.map((question: any) => ({
      name: question.nome,
      content: question.conteudo,
      date: question.data,
    }));
    return messages;
  } catch (error) {
    return null;
  }
}
