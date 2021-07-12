import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';

import api from '../services/api';
import * as auth from '../services/auth';
import { MotherInfo, LoginStatus } from '../services/auth';
import pushNotificationSubscribe from '../services/pushNotification';

interface AuthContextData {
  isSigned: boolean;
  motherInfo: MotherInfo;
  updateMotherInfo: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<LoginStatus>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [motherInfo, setMotherInfo] = useState<MotherInfo>({} as MotherInfo);
  const [isLoading, setIsLoading] = useState(true);

  async function initPushNotifications() {
    const { userId } = await OneSignal.getDeviceState();
    await pushNotificationSubscribe(userId);
    OneSignal.disablePush(false);
  }

  async function initMotherInfo() {
    const storageMotherInfo = await AsyncStorage.getItem(
      '@AmamentaCoach:motherInfo',
    );
    if (storageMotherInfo) {
      const savedMotherInfo: MotherInfo = JSON.parse(storageMotherInfo);
      if (!savedMotherInfo.birthday) {
        await AsyncStorage.removeItem('@AmamentaCoach:motherInfo');
        await initMotherInfo();
        return;
      }
      setMotherInfo(savedMotherInfo);
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
        setToken(storageToken);
      }

      setIsLoading(false);
    }

    OneSignal.setAppId('8b92a77f-f327-48be-b2c2-d938aad5a0ab');
    checkLoginDataInStorage();
  }, []);

  async function signIn(email: string, password: string): Promise<LoginStatus> {
    const { token: newToken, status } = await auth.signIn(email, password);
    if (status === LoginStatus.Success) {
      api.defaults.headers.common.Authorization = newToken;
      await initMotherInfo();

      await initPushNotifications();

      await AsyncStorage.setItem('@AmamentaCoach:token', newToken);
      setToken(newToken);
    }
    return status;
  }

  async function signOut(): Promise<void> {
    OneSignal.disablePush(true);

    await AsyncStorage.removeItem('@AmamentaCoach:motherInfo');
    setMotherInfo({} as MotherInfo);

    await AsyncStorage.removeItem('@AmamentaCoach:token');
    api.defaults.headers.common.Authorization = null;
    setToken(null);
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
      {!isLoading && children}
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
