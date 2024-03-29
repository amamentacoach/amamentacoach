import AsyncStorage from '@react-native-async-storage/async-storage';
import { format as _format, isToday } from 'date-fns';
import { enCA } from 'date-fns/locale';

type DateFromStorageFunc = (storageObject: Record<string, any>) => string;

let currentLocale: Locale = enCA;

export function dateFNSSetLocale(locale: Locale): void {
  currentLocale = locale;
}

// Define um locale padrão para todos as funções do date-fns.
function addDefaultLocale<T extends (...args: any[]) => any>(func: T): T {
  function localeAdded(...args: Parameters<typeof func>): T {
    const functionArgs: any[] = [...args];
    const lastParameterIndex = func.length - 1;
    functionArgs[lastParameterIndex] = {
      locale: currentLocale,
      ...functionArgs[lastParameterIndex],
    };
    return func(...functionArgs);
  }
  return localeAdded as T;
}

export const formatWithLocale = addDefaultLocale(_format);

// Formata uma data no formato $DiaSemana, $DiaMes de $Mes de $Ano
export function dateFormatVerbose(date: Date): string {
  const dateString = formatWithLocale(date, 'PPPP');
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

// Retorna uma string no formato ISO-8601 ("yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), contendo informação
// sobre o fuso horário do usuário.
export function formatISOWithTimezone(date: Date): string {
  return formatWithLocale(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

// Verifica se a diferença entra a data atual e uma data armazenada no AsyncStorage é maior ou igual
// a 1 dia.
// Caso a data esteja armazenada em um objeto é possível fornecer uma função para acessa-la.
// Caso o valor não exista retorna false.
export async function storageIsToday(
  storageId: string,
  getDateFromStorage?: DateFromStorageFunc,
): Promise<boolean> {
  const storageString = await AsyncStorage.getItem(storageId);
  if (!storageString) {
    return false;
  }
  let storageDate = storageString;
  if (getDateFromStorage) {
    storageDate = getDateFromStorage(JSON.parse(storageString));
  }
  return isToday(new Date(storageDate));
}
