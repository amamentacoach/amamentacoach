import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import OneSignal from 'react-native-onesignal';

import * as auth from '../services/auth';
import api from '../services/api';
import pushNotificationSubscribe from '../services/pushNotification';
import SplashScreen from '../pages/SplashScreen';

interface IAuthContextData {
  isSigned: boolean;
  token: string | null;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [oneSignalId, setOneSignalId] = useState('');

  async function initPushNotifications() {
    const oneSignalIdStorage = await AsyncStorage.getItem(
      '@AmamentaCoach:oneSignalId',
    );

    if (!oneSignalIdStorage) {
      OneSignal.init('8b92a77f-f327-48be-b2c2-d938aad5a0ab');
      OneSignal.getPermissionSubscriptionState((status: any) => {
        setOneSignalId(status.userId);
      });
      await AsyncStorage.setItem('@AmamentaCoach:oneSignalId', oneSignalId);
      await pushNotificationSubscribe(oneSignalId);
    }
  }

  useEffect(() => {
    async function checkLoginDataInStorage() {
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');

      if (storageToken) {
        setToken(storageToken);
        api.defaults.headers.common.Authorization = storageToken;
      }
      await initPushNotifications();
      setLoading(false);
    }

    checkLoginDataInStorage();
  });

  async function signIn(email: string, password: string): Promise<boolean> {
    const userToken = await auth.signIn(email, password);
    if (userToken === null) {
      return false;
    }

    await AsyncStorage.setItem('@AmamentaCoach:token', userToken);
    setToken(userToken);
    api.defaults.headers.common.Authorization = userToken;
    await initPushNotifications();
    return true;
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem('@AmamentaCoach:token');
    setToken(null);
    api.defaults.headers.common.Authorization = null;
    setOneSignalId('');
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!token,
        token,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export default AuthContext;
