import api from './api';

// Enviar que o usuário assistiu um vídeo inteiro.
export default async function setUserVideoSeen(): Promise<boolean> {
  try {
    await api.post('/acessos/videos');
    return true;
  } catch (error) {
    return false;
  }
}
