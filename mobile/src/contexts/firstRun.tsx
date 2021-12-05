import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type TemporaryField = 'home';
type PermanentField =
  // Usuário já viu a introdução do diário.
  | 'diaryIntroduction'
  // Usuário já viu a introdução do app.
  | 'appIntroduction'
  // Usuário já viu a introdução do formulário de escala.
  | 'statusFormIntroduction';

interface IsFirstRunValues {
  // Valores que são salvos permanentemente.
  persistent: {
    [key in PermanentField]: boolean;
  };
  // Valores que são reiniciados ao fechar o app.
  temporary: {
    [key in TemporaryField]: boolean;
  };
}

interface IsFirstRunContextData {
  isFirstRun: IsFirstRunValues;
  // Marca um campo como executado até o aplicativo ser aberto novamente.
  setTemporaryNotFirstRun: (field: TemporaryField) => void;
  // Marca um campo como executado permanentemente.
  setPersistentNotFirstRun: (field: PermanentField) => Promise<void>;
}

const IsFirstRun = createContext<IsFirstRunContextData>(
  {} as IsFirstRunContextData,
);

export const IsFirstRunProvider: React.FC = ({ children }) => {
  const [isFirstRun, setIsFirstRun] = useState<IsFirstRunValues>({
    persistent: {
      appIntroduction: true,
      diaryIntroduction: true,
      statusFormIntroduction: true,
    },
    temporary: { home: true },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkDataInStorage(): Promise<void> {
      const persistentFirstRunStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:isFirstRun',
      );

      if (persistentFirstRunStorage) {
        const firstRun = { ...isFirstRun };
        firstRun.persistent = {
          ...firstRun.persistent,
          ...JSON.parse(persistentFirstRunStorage),
        };
        setIsFirstRun(firstRun);
      }
      setIsLoading(false);
    }
    checkDataInStorage();
  }, []);

  // Marca um campo como já executado até o aplicativo ser iniciado novamente.
  function setTemporaryNotFirstRun(field: TemporaryField): void {
    const copy = { ...isFirstRun };
    copy.temporary[field] = false;
    setIsFirstRun(copy);
  }

  // Marca um campo como já executado permanentemente.
  async function setPersistentNotFirstRun(
    field: PermanentField,
  ): Promise<void> {
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

export function useIsFirstRun(): IsFirstRunContextData {
  const context = useContext(IsFirstRun);
  if (!context) {
    throw new Error('useIsFirstRun must be used within an IsFirstRunProvider.');
  }
  return context;
}
