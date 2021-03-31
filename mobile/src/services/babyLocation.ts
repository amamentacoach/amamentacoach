import api from './api';

export interface IBabyStatus {
  id: string;
  name: string;
  location: 'alojamento conjunto' | 'uci neonatal' | 'uti neonatal';
  date: string;
}

// Lista os bebês que podem receber alta.
export async function checkBabiesLocation(): Promise<IBabyStatus[] | null> {
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

export default checkBabiesLocation;
