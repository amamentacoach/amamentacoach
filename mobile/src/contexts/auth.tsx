import React, { createContext, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface IAuthContextData {
  signed: boolean;
  token: string | null;
  id: number | null;
  signUp(motherInfo: auth.IMotherInfo): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [id, setId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function checkDataInStorage() {
      const storageId = await AsyncStorage.getItem('@AmamentaCoach:id');
      const storageToken = await AsyncStorage.getItem('@AmamentaCoach:token');

      if (storageId && storageToken) {
        setId(parseInt(storageId, 10));
        setToken(storageToken);
        api.defaults.headers.common.Authorization = storageToken;
      }
    }

    checkDataInStorage();
  });

  async function signUp(motherInfo: auth.IMotherInfo) {
    const userId = await auth.signUp(motherInfo);
    setId(userId);
    await AsyncStorage.setItem('@AmamentaCoach:id', userId.toString());
  }

  async function signIn(email: string, password: string) {
    const userToken = await auth.signIn(email, password);
    await AsyncStorage.setItem('@AmamentaCoach:token', userToken);
    setToken(userToken);
    api.defaults.headers.common.Authorization = userToken;
  }

  async function signOut() {
    await AsyncStorage.removeItem('@AmamentaCoach:id');
    await AsyncStorage.removeItem('@AmamentaCoach:token');
    setToken(null);
    setId(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!token, id, token, signUp, signIn, signOut }}>
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
