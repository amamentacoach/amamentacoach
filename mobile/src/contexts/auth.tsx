import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash';
// @ts-ignore
import OneSignal from 'react-native-onesignal';

import api from '../services/api';
import * as auth from '../services/auth';
import { IMotherInfo, LoginStatus } from '../services/auth';
import pushNotificationSubscribe from '../services/pushNotification';

interface IAuthContextData {
  isSigned: boolean;
  motherInfo: IMotherInfo;
  updateMotherInfo: () => Promise<void>;
  signIn(email: string, password: string): Promise<LoginStatus>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [motherInfo, setMotherInfo] = useState<IMotherInfo>({} as IMotherInfo);
  const [oneSignalId, setOneSignalId] = useState('');

  async function initPushNotifications() {
    OneSignal.init('8b92a77f-f327-48be-b2c2-d938aad5a0ab');
    OneSignal.setSubscription(true);
    OneSignal.getPermissionSubscriptionState((status: any) => {
      setOneSignalId(status.userId);
    });
    await pushNotificationSubscribe(oneSignalId);
  }

  async function initMotherInfo() {
    const storageMotherInfo = await AsyncStorage.getItem(
      '@AmamentaCoach:motherInfo',
    );
    if (storageMotherInfo) {
      setMotherInfo(JSON.parse(storageMotherInfo));
    } else {
      const apiMotherInfo = await auth.getMotherInfo();
      if (apiMotherInfo) {
        setMotherInfo(apiMotherInfo);
        await AsyncStorage.setItem(
          '@AmamentaCoach:motherInfo',
          JSON.stringify(apiMotherInfo),
        );
      }
    }
  }

  // Atualiza o valor the motherInfo armazenado no AsyncStorage com o valor atual.
  async function updateMotherInfo() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:motherInfo',
      JSON.stringify(motherInfo),
    );
  }

  useEffect(() => {
    async function checkLoginDataInStorage() {
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');

      if (storageToken) {
        api.defaults.headers.common.Authorization = storageToken;
        await initMotherInfo();
        initPushNotifications();
        setToken(storageToken);
      }
      RNBootSplash.hide({ duration: 250 });
    }

    checkLoginDataInStorage();
  }, []);

  async function signIn(email: string, password: string): Promise<LoginStatus> {
    const login = await auth.signIn(email, password);
    if (login.status !== LoginStatus.Success) {
      return login.status;
    }
    api.defaults.headers.common.Authorization = login.token;
    await initMotherInfo();

    await AsyncStorage.setItem('@AmamentaCoach:token', login.token);
    setToken(login.token);

    initPushNotifications();
    return login.status;
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem('@AmamentaCoach:token');
    setToken(null);
    api.defaults.headers.common.Authorization = null;
    setMotherInfo({} as IMotherInfo);
    await AsyncStorage.removeItem('@AmamentaCoach:motherInfo');
    setOneSignalId('');
    OneSignal.setSubscription(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!token,
        motherInfo,
        updateMotherInfo,
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
