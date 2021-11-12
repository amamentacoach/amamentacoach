import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerUserAction } from 'services/telemetry';

import type { TelemetryPayload } from '@common/Telemetria';

type PayloadWithoutDate = Omit<TelemetryPayload, 'created_at'>;

// Armazena um novo registro telemetria indicando que o usuário realizou uma ação.
export async function createTelemetryAction(action: PayloadWithoutDate) {
  const storageActions = await AsyncStorage.getItem(
    '@AmamentaCoach:telemetryActions',
  );

  const newTelemetryAction: TelemetryPayload = {
    ...action,
    created_at: new Date(),
  };

  let telemetryActions: TelemetryPayload[] = [];
  if (storageActions) {
    telemetryActions = JSON.parse(storageActions);
  }
  telemetryActions = [...telemetryActions, newTelemetryAction];
  // Limita o array a 500 elementos.
  if (telemetryActions.length > 500) {
    telemetryActions.splice(0, telemetryActions.length - 500);
  }

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
