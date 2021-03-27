import api from './api';

// Enviar que o usuário assistiu um vídeo inteiro.
export async function setUserVideoSeen(): Promise<boolean> {
  try {
    await api.post('/acessos/videos');
    return true;
  } catch (error) {
    return false;
  }
}

export default setUserVideoSeen;
