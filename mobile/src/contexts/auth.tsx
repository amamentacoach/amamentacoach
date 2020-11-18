import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash';
// @ts-ignore
import OneSignal from 'react-native-onesignal';

import api from '../services/api';
import * as auth from '../services/auth';
import pushNotificationSubscribe from '../services/pushNotification';

interface IAuthContextData {
  isSigned: boolean;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [oneSignalId, setOneSignalId] = useState('');

  async function initPushNotifications() {
    OneSignal.init('8b92a77f-f327-48be-b2c2-d938aad5a0ab');
    OneSignal.setSubscription(true);
    OneSignal.getPermissionSubscriptionState((status: any) => {
      setOneSignalId(status.userId);
    });
    await pushNotificationSubscribe(oneSignalId);
  }

  useEffect(() => {
    async function checkLoginDataInStorage() {
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');

      if (storageToken) {
        setToken(storageToken);
        api.defaults.headers.common.Authorization = storageToken;
        initPushNotifications();
      }
      RNBootSplash.hide({ duration: 250 });
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
    OneSignal.setSubscription(false);
  }

  // if (loading) {
  //   return <SplashScreen />;
  // }

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!token,
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
