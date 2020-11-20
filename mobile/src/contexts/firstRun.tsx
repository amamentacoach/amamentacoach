import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type IIsFirstRun = {
  introduction: boolean;
  diary: boolean;
};

interface IIsFirstRunContextData {
  isFirstRun: IIsFirstRun;
  setIntroductionNotFirstRun: () => Promise<void>;
  setDiaryNotFirstRun: () => Promise<void>;
}

const IsFirstRun = createContext<IIsFirstRunContextData>(
  {} as IIsFirstRunContextData,
);

export const IsFirstRunProvider: React.FC = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<IIsFirstRun>({
    introduction: true,
    diary: true,
  });

  useEffect(() => {
    async function checkDataInStorage() {
      const isFirstRunStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:isFirstRun',
      );
      if (isFirstRunStorage) {
        setIsFirstRun(JSON.parse(isFirstRunStorage));
      }
    }
    checkDataInStorage();
  }, []);

  async function setIntroductionNotFirstRun() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:isFirstRun',
      JSON.stringify({ ...isFirstRun, introduction: false }),
    );
    setIsFirstRun({ ...isFirstRun, introduction: false });
  }

  async function setDiaryNotFirstRun() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:isFirstRun',
      JSON.stringify({ ...isFirstRun, diary: false }),
    );
    setIsFirstRun({ ...isFirstRun, diary: false });
  }

  return (
    <IsFirstRun.Provider
      value={{
        isFirstRun,
        setIntroductionNotFirstRun,
        setDiaryNotFirstRun,
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
