import api from 'services/api';

export interface Message {
  id: string;
  name: string;
  content: string;
  date: string;
}

// Envia uma mensagem do usuário.
export async function createMessage(message: string): Promise<boolean> {
  try {
    await api.post('/mensagens', {
      conteudo: message,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna as mensagens enviadas pelos usuários.
export async function listMessages(page: number): Promise<Message[] | null> {
  try {
    const { data } = await api.get(`/mensagens?page=${page}`);
    const messages = data.map((question: any) => ({
      id: question.id.toString(),
      name: question.nome,
      content: question.conteudo,
      date: question.data,
    }));
    return messages;
  } catch (error) {
    return null;
  }
}
