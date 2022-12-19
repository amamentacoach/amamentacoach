import { format } from 'date-fns';

import api from 'services/api';

export interface BabyLocationUpdate {
  id: number;
  newLocation: string;
  date?: Date;
  reason?: string;
}

// Atualiza a localização de um bebê.
export async function updateBabyLocation({
  id,
  newLocation,
  date,
  reason,
}: BabyLocationUpdate): Promise<boolean> {
  const updatedLocation = {
    local: newLocation,
    data: date ? format(date, 'yyyy-MM-dd') : '',
    motivo: reason ?? '',
  };
  try {
    await api.post(`/bebes/${id}/alta`, updatedLocation);
    return true;
  } catch (error) {
    return false;
  }
}
