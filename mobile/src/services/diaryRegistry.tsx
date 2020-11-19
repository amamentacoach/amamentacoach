import api from './api';

interface INewDiaryRegistry {
  babyId: number;
  breast: string;
  duration: number;
  quantity: number;
}

export interface IListDiaryEntry {
  id: number;
  baby_id: number;
  date: string;
  breast: string;
  duration: number;
  quantity: number;
}

// Cria um registro novo no diário.
export async function createNewDiaryRegistry({
  babyId,
  breast,
  duration,
  quantity,
}: INewDiaryRegistry): Promise<boolean> {
  try {
    await api.post(`/bebes/${babyId}`, {
      qtd_leite: quantity,
      mama: breast,
      duracao: duration,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Retorna todos os registros feitos no diário.
export async function listDiaryRegistries(
  babyId: number,
): Promise<IListDiaryEntry[]> {
  const { data } = await api.get(`/bebes/${babyId}/ordenhas`);
  return data.ordenhas.map((item: any) => ({
    id: item.id,
    baby_id: item.bebe_id,
    breast: item.mama,
    date: item.data_hora,
    duration: item.duracao,
    quantity: item.qtd_leite,
  }));
}
