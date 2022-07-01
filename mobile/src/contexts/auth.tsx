import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';

import api from 'services/api';
import { LoginStatus, signIn as authSignIn } from 'services/signIn';
import { Institution, getUserInfo, isUserInfo } from 'services/user';
import initPushNotifications from 'utils/notifications';

import type { UserInfo } from 'services/user';

interface AuthContextData {
  isSigned: boolean;
  userInfo: UserInfo;
  refreshUserInfo: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<LoginStatus>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const defaultUserInfo: UserInfo = {
  birthday: new Date(),
  institution: Institution.HU_UEL,
  email: '',
  hasPartner: false,
  name: '',
  userType: '',
  babies: [],
  babiesBirthLocations: {
    AC: false,
    UCI: false,
    UCIN: false,
    UTI: false,
  },
  images: {
    mother: null,
    baby: null,
    father: null,
  },
};

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Verifica se os dados do usuário já estão salvos no dispositivo.
  async function loadUserInfoFromStorage(): Promise<UserInfo | null> {
    const storageUserInfo = await AsyncStorage.getItem(
      '@AmamentaCoach:userInfo',
    );
    if (!storageUserInfo) {
      return null;
    }
    const savedUserInfo = JSON.parse(storageUserInfo);
    // Verifica se os dados salvos possuem todos os campos necessários.
    if (!isUserInfo(savedUserInfo)) {
      await AsyncStorage.removeItem('@AmamentaCoach:userInfo');
      return null;
    }
    return savedUserInfo;
  }

  // Carrega os dados do usuário.
  async function loadUserInfo(): Promise<boolean> {
    let info = await loadUserInfoFromStorage();
    // Não existe dados salvos, consulta a API.
    if (!info) {
      const apiUserInfo = await getUserInfo();
      if (!apiUserInfo) {
        return false;
      }
      info = apiUserInfo;
      await AsyncStorage.setItem(
        '@AmamentaCoach:userInfo',
        JSON.stringify(apiUserInfo),
      );
    }
    setUserInfo(info);
    return true;
  }

  async function refreshUserInfo(): Promise<boolean> {
    await AsyncStorage.removeItem('@AmamentaCoach:userInfo');
    return loadUserInfo();
  }

  async function signIn(email: string, password: string): Promise<LoginStatus> {
    const { token: newToken, status } = await authSignIn(email, password);
    if (status === LoginStatus.Success) {
      api.defaults.headers.common.Authorization = newToken;
      const userInfoStatus = await loadUserInfo();
      // Não foi possível carregar os dados do usuário.
      if (!userInfoStatus) {
        api.defaults.headers.common.Authorization = null;
        return LoginStatus.FailedToConnect;
      }

      await initPushNotifications(navigation);
      await AsyncStorage.setItem('@AmamentaCoach:token', newToken);
      setToken(newToken);
    }
    return status;
  }

  async function signOut(): Promise<void> {
    OneSignal.disablePush(true);

    await AsyncStorage.removeItem('@AmamentaCoach:userInfo');
    setUserInfo(defaultUserInfo);

    await AsyncStorage.removeItem('@AmamentaCoach:token');
    api.defaults.headers.common.Authorization = null;
    setToken(null);
  }

  useEffect(() => {
    // Carrega o token de identificação e os dados do usuário.
    async function loadLoginDataInStorage(): Promise<void> {
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');
      if (storageToken) {
        api.defaults.headers.common.Authorization = storageToken;
        const userInfoStatus = await loadUserInfo();
        if (userInfoStatus) {
          setToken(storageToken);
        } else {
          // Os dados do usuário não estão armazenados no dispositivo e não foi possível consultar a
          // API.
          await AsyncStorage.removeItem('@AmamentaCoach:token');
          api.defaults.headers.common.Authorization = null;
        }
      }
      setIsLoading(false);
    }

    OneSignal.setAppId('8b92a77f-f327-48be-b2c2-d938aad5a0ab');
    loadLoginDataInStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!token,
        userInfo,
        refreshUserInfo,
        signIn,
        signOut,
      }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
