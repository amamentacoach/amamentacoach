import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type IIsFirstRun = {
  persistent: {
    appIntroduction: boolean;
    diaryIntroduction: boolean;
    statusFormIntroduction: boolean;
  };
  temporary: {
    home: boolean;
    extraction: boolean;
    diary: boolean;
    messages: boolean;
  };
};

interface IIsFirstRunContextData {
  isFirstRun: IIsFirstRun;
  // Marca um campo como executado até o aplicativo ser aberto novamente.
  setTemporaryNotFirstRun: (
    field: 'diary' | 'extraction' | 'home' | 'messages',
  ) => void;
  // Marca um campo como executado permanentemente.
  setPersistentNotFirstRun: (
    field: 'diaryIntroduction' | 'appIntroduction' | 'statusFormIntroduction',
  ) => Promise<void>;
}

const IsFirstRun = createContext<IIsFirstRunContextData>(
  {} as IIsFirstRunContextData,
);

export const IsFirstRunProvider: React.FC = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<IIsFirstRun>({
    persistent: {
      appIntroduction: true,
      diaryIntroduction: true,
      statusFormIntroduction: true,
    },
    temporary: { home: true, extraction: true, diary: true, messages: true },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkDataInStorage() {
      const isFirstRunStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:isFirstRun',
      );

      if (isFirstRunStorage) {
        const firstRun = { ...isFirstRun };
        firstRun.persistent = {
          ...firstRun.persistent,
          ...JSON.parse(isFirstRunStorage),
        };
        setIsFirstRun(firstRun);
      }
      setIsLoading(false);
    }
    checkDataInStorage();
  }, []);

  // Marca um campo como já executado até o aplicativo ser iniciado novamente.
  function setTemporaryNotFirstRun(
    field: 'diary' | 'extraction' | 'home' | 'messages',
  ) {
    const copy = { ...isFirstRun };
    copy.temporary[field] = false;
    setIsFirstRun(copy);
  }

  // Marca um campo como já executado permanentemente.
  async function setPersistentNotFirstRun(
    field: 'diaryIntroduction' | 'appIntroduction' | 'statusFormIntroduction',
  ) {
    const copy = { ...isFirstRun };
    copy.persistent[field] = false;
    await AsyncStorage.setItem(
      '@AmamentaCoach:isFirstRun',
      JSON.stringify(copy.persistent),
    );
    setIsFirstRun(copy);
  }

  return (
    <IsFirstRun.Provider
      value={{
        isFirstRun,
        setTemporaryNotFirstRun,
        setPersistentNotFirstRun,
      }}>
      {!isLoading && children}
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
