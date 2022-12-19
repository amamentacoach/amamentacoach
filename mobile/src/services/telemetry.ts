import api from 'services/api';

import type { TelemetryPayload } from '@common/telemetria';

export type PendingForms = '1D' | '15D' | '1M' | null;

// Enviar que o usuário começou a assistir um vídeo.
async function setUserTelemetry(route: string): Promise<boolean> {
  try {
    await api.post(`/acessos/${route}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Enviar que o usuário começou a assistir um vídeo.
export async function setUserVideoStarted(): Promise<boolean> {
  return setUserTelemetry('videos-inicio');
}

// Enviar que o usuário assistiu um vídeo inteiro.
export async function setUserVideoSeen(): Promise<boolean> {
  return setUserTelemetry('videos');
}

// Marca que o usuário abriu o aplicativo.
export async function setHomePageOpened(): Promise<PendingForms> {
  try {
    const { data } = await api.post('/acessos/app');
    return data.acao || null;
  } catch (error) {
    return null;
  }
}

// Marca que o usuário realizou uma ação.
export async function registerUserAction(
  telemetryActions: TelemetryPayload[],
): Promise<boolean> {
  try {
    await api.post('/telemetria', telemetryActions);
    return true;
  } catch (error) {
    return false;
  }
}
