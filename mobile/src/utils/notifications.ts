import OneSignal from 'react-native-onesignal';

import pushNotificationSubscribe from 'services/pushNotification';

import type { NavigationProp } from '@react-navigation/native';

async function initPushNotifications(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
): Promise<void> {
  const { userId } = await OneSignal.getDeviceState();
  await pushNotificationSubscribe(userId);

  OneSignal.setNotificationOpenedHandler(openedEvent => {
    const {
      notification: { launchURL },
    } = openedEvent;
    if (launchURL) {
      const [, , action, target] = launchURL.split('/');
      switch (action) {
        case 'screen':
          navigation.navigate(target as any);
          break;
      }
    }
  });
  OneSignal.disablePush(false);
}

export default initPushNotifications;
