import { format } from 'date-fns';

import api from 'services/api';

// Atualiza a localização de um bebê.
export async function updateBabyLocation(
  id: number,
  newLocation: string,
  date: Date,
  reason: string,
): Promise<boolean> {
  try {
    await api.post(`/bebes/${id}/alta`, {
      local: newLocation,
      data: format(date, 'yyyy-MM-dd'),
      motivo: reason,
    });
    return true;
  } catch (error) {
    return false;
  }
}
