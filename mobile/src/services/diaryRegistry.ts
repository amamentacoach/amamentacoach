import api from './api';

export interface IExtractionEntry {
  id: number;
  baby_id: number;
  breast: 'D' | 'E';
  date: string;
  duration: number;
  quantity: number;
}

export interface IBreastfeedEntry {
  id: number;
  name: string;
  entries: {
    id: number;
    baby_id: number;
    breast: 'D' | 'E';
    date: string;
    duration: number;
  }[];
}

// Cria um novo registro de ordenha no diário.
export async function createExtractionEntry(
  breast: string,
  duration: number,
  quantity: number,
  time: Date,
): Promise<boolean> {
  try {
    await api.post('/maes/ordenhas', {
      qtd_leite: quantity,
      mama: breast,
      duracao: duration,
      data_hora: time,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todas as ordenhas realizadas pela mãe.
export async function listExtractionsEntries(): Promise<IExtractionEntry[]> {
  const { data } = await api.get('/maes/ordenhas');
  return data.ordenhas.map((item: any) => ({
    id: item.id,
    baby_id: item.bebe_id,
    breast: item.mama,
    date: item.data_hora,
    duration: item.duracao,
    quantity: item.qtd_leite,
  }));
}

// Cria um novo registro de amamentação.
export async function createBreastfeedEntry(
  babyId: number,
  breast: string,
  duration: number,
  time: Date,
): Promise<boolean> {
  try {
    await api.post(`/bebes/${babyId}/mamadas`, {
      mama: breast,
      duracao: duration,
      data_hora: time,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todos os registros de amamentação feitos no diário.
export async function listBreastfeedEntries(
  babyId: number,
): Promise<IBreastfeedEntry> {
  const { data } = await api.get(`/bebes/${babyId}/mamadas`);
  return {
    id: data.id,
    name: data.nome,
    entries: data.mamadas.map((entry: any) => ({
      id: entry.id,
      baby_id: entry.bebe_id,
      date: entry.data_hora,
      duration: entry.duracao,
      breast: entry.mama,
    })),
  };
}
