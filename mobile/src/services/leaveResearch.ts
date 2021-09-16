import api from 'services/api';

// Marca que uma mãe deseja abandonar a pesquisa.
async function leaveResearch(message: string): Promise<boolean> {
  try {
    await api.post('/maes/revogar', {
      motivo: message,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default leaveResearch;
