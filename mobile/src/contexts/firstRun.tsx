import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type IIsFirstRun = {
  introduction: boolean;
  diary: boolean;
  statusForm: boolean;
};

interface IIsFirstRunContextData {
  isFirstRun: IIsFirstRun;
  setNotFirstRun: (
    field: 'introduction' | 'diary' | 'statusForm',
  ) => Promise<void>;
}

const IsFirstRun = createContext<IIsFirstRunContextData>(
  {} as IIsFirstRunContextData,
);

export const IsFirstRunProvider: React.FC = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<IIsFirstRun>({
    introduction: true,
    diary: true,
    statusForm: true,
  });

  useEffect(() => {
    async function checkDataInStorage() {
      const isFirstRunStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:isFirstRun',
      );

      await AsyncStorage.removeItem('@AmamentaCoach:isFirstRun');
      if (isFirstRunStorage) {
        setIsFirstRun({ ...isFirstRun, ...JSON.parse(isFirstRunStorage) });
      }
    }
    checkDataInStorage();
  }, []);

  // Marca um campo como já executado.
  async function setNotFirstRun(
    field: 'introduction' | 'diary' | 'statusForm',
  ) {
    const copy = { ...isFirstRun };
    copy[field] = false;
    await AsyncStorage.setItem(
      '@AmamentaCoach:isFirstRun',
      JSON.stringify(copy),
    );
    setIsFirstRun(copy);
  }

  return (
    <IsFirstRun.Provider
      value={{
        isFirstRun,
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
