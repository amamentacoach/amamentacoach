import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerUserAction } from 'services/telemetry';

import type { TelemetryPayload } from '@common/Telemetria';

// Armazena um novo registro telemetria que o usuário realizou uma ação.
export async function createTelemetryAction(
  action: Omit<TelemetryPayload, 'created_at'>,
) {
  let telemetryActions: TelemetryPayload[] = [];
  const storageActions = await AsyncStorage.getItem(
    '@AmamentaCoach:telemetryActions',
  );
  if (storageActions) {
    telemetryActions = JSON.parse(storageActions);
  }
  const newTelemetryAction: TelemetryPayload = {
    ...action,
    created_at: new Date(),
  };

  telemetryActions = [...telemetryActions, newTelemetryAction];
  await AsyncStorage.setItem(
    '@AmamentaCoach:telemetryActions',
    JSON.stringify(telemetryActions),
  );
}

// Envia as ações de telemetria armazenadas para o backend.
export async function submitTelemetryActions(
  actionsToSubmit = 50,
): Promise<boolean> {
  const storageActions = await AsyncStorage.getItem(
    '@AmamentaCoach:telemetryActions',
  );
  if (!storageActions) {
    return false;
  }

  const telemetryActions: TelemetryPayload[] = JSON.parse(storageActions);
  if (telemetryActions.length === 0) {
    return false;
  }

  // Envia as n primeiras ações de telemetria armazenadas.
  const payload = telemetryActions.splice(0, actionsToSubmit);
  const status = await registerUserAction(payload);
  if (!status) {
    return false;
  }

  // Remove as ações de telemetria enviadas do armazenamento.
  await AsyncStorage.setItem(
    '@AmamentaCoach:telemetryActions',
    JSON.stringify(telemetryActions),
  );
  return true;
}
