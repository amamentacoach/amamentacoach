import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';
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

  useEffect(() => {
    async function checkDataInStorage() {
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');

      if (storageToken) {
        setToken(storageToken);
        api.defaults.headers.common.Authorization = storageToken;
      }
      setLoading(false);
    }

    checkDataInStorage();
  });

  async function signIn(email: string, password: string) {
    const userToken = await auth.signIn(email, password);
    if (userToken === null) {
      return false;
    }

    await AsyncStorage.setItem('@AmamentaCoach:token', userToken);
    setToken(userToken);
    api.defaults.headers.common.Authorization = userToken;
    return true;
  }

  async function signOut() {
    await AsyncStorage.removeItem('@AmamentaCoach:token');
    setToken(null);
    api.defaults.headers.common.Authorization = null;
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
