import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../pages/SplashScreen';

interface IIsFirstRunContextData {
  isFirstRun: boolean;
  setNotFirstRun: () => void;
}

const IsFirstRun = createContext<IIsFirstRunContextData>(
  {} as IIsFirstRunContextData,
);

export const IsFirstRunProvider: React.FC = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<boolean | null>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkDataInStorage() {
      const isFirstRunStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:isFirstRun',
      );

      if (isFirstRunStorage) {
        setIsFirstRun(isFirstRunStorage === null);
      }
      setLoading(false);
    }

    checkDataInStorage();
  });

  async function setNotFirstRun() {
    await AsyncStorage.setItem('@AmamentaCoach:isFirstRun', 'false');
    setIsFirstRun(false);
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <IsFirstRun.Provider
      value={{
        isFirstRun: !!isFirstRun,
        setNotFirstRun,
      }}>
      {children}
    </IsFirstRun.Provider>
  );
};

export function useIsFirstRun() {
  const context = useContext(IsFirstRun);
  if (!context) {
    throw new Error('useIsFirstRun must be used within an IsFirstRunProvider.');
  }
  return context;
}

export default IsFirstRun;
