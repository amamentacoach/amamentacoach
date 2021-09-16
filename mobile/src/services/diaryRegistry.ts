import { formatISO } from 'date-fns';

import api from 'services/api';

type Breast = 'D' | 'E';

export interface ExtractionEntry {
  id: number;
  baby_id: number;
  breasts: Breast[];
  date: string;
  duration: number;
  quantity: number;
}

export interface BreastfeedEntry {
  id: number;
  name: string;
  entries: {
    id: number;
    baby_id: number;
    breasts: Breast[];
    date: string;
    duration: number;
  }[];
}

// Cria um novo registro de ordenha no diário.
export async function createExtractionEntry(
  breasts: string,
  duration: number,
  quantity: number,
  time: Date,
): Promise<boolean> {
  try {
    await api.post('/maes/ordenhas', {
      qtd_leite: quantity,
      mama: breasts,
      duracao: duration,
      data_hora: time,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todas as ordenhas realizadas pela mãe em uma data.
export async function listExtractionsEntries(
  date: Date,
): Promise<ExtractionEntry[]> {
  const { data } = await api.get(`/maes/ordenhas/${formatISO(date)}`);
  return data.map((entry: any) => ({
    id: entry.id,
    baby_id: entry.bebe_id,
    breasts: entry.mama.split(','),
    date: entry.data_hora,
    duration: entry.duracao,
    quantity: entry.qtd_leite,
  }));
}

// Cria um novo registro de amamentação.
export async function createBreastfeedEntry(
  babyId: number,
  breasts: string,
  duration: number,
  time: Date,
): Promise<boolean> {
  try {
    await api.post(`/bebes/${babyId}/mamadas`, {
      mama: breasts,
      duracao: duration,
      data_hora: time,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todos os registros de amamentação feitos no diário em uma data.
export async function listBreastfeedEntries(
  babyId: number,
  date: Date,
): Promise<BreastfeedEntry> {
  const { data } = await api.get(`/bebes/${babyId}/mamadas/${formatISO(date)}`);
  return {
    id: data.id,
    name: data.nome,
    entries: data.mamadas.map((entry: any) => ({
      id: entry.id,
      baby_id: entry.bebe_id,
      date: entry.data_hora,
      duration: entry.duracao,
      breasts: entry.mama.split(','),
    })),
  };
}
