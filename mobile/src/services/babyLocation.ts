import api from './api';

export interface BabyStatus {
  id: string;
  name: string;
  location: 'alojamento conjunto' | 'uci neonatal' | 'uti neonatal';
  date: string;
}

// Lista os bebês que podem receber alta.
export async function checkBabiesLocation(): Promise<BabyStatus[] | null> {
  try {
    const { data } = await api.get('/bebes/alta');
    const babies = data.map((baby: any) => ({
      id: baby.id.toString(),
      name: baby.nome,
      location: baby.local.toLowerCase(),
      date: baby.data_parto,
    }));
    return babies;
  } catch (error) {
    return null;
  }
}

// Atualiza a localização de um bebê.
export async function updateBabyLocation(
  id: string,
  newLocation: string,
): Promise<boolean> {
  try {
    await api.post(`/bebes/${id}/alta`, {
      local: newLocation,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default checkBabiesLocation;
