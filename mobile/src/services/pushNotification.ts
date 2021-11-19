import api from 'services/api';

async function pushNotificationSubscribe(
  userOneSignalId: string,
): Promise<void> {
  await api.post('/subscribe', {
    userId: userOneSignalId,
  });
}

export default pushNotificationSubscribe;
