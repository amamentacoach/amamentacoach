import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  differenceInYears as _differenceInYears,
  format as _format,
  isToday as _isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

let currentLocale: Locale = ptBR;

export function dateFNSSetLocale(locale: Locale) {
  currentLocale = locale;
}

// Define um locale padrão para todos as funções do date-fns.
function addDefaultLocale<T extends (...args: any[]) => any>(func: T): T {
  function localeAdded(...args: Parameters<typeof _format>) {
    const functionArgs: any[] = [...args];
    const lastParameterIndex = _format.length - 1;
    functionArgs[lastParameterIndex] = {
      locale: currentLocale,
      ...functionArgs[lastParameterIndex],
    };
    return func(...functionArgs);
  }
  return localeAdded as T;
}

export const format = addDefaultLocale(_format);
export const isToday = addDefaultLocale(_isToday);
export const differenceInYears = addDefaultLocale(_differenceInYears);

// Formata uma data no formato $DiaSemana, $DiaMes de $Mes de $Ano
export function dateFormatVerbose(date: Date) {
  const dateString = format(date, 'PPPP');
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

// Verifica se a diferença entra a data atual e uma data armazenada no AsyncStorage é maior ou igual
// a 1 dia.
// Caso o valor não exista retorna false.
export async function storageIsToday(storageId: string) {
  const storageString = await AsyncStorage.getItem(storageId);
  if (!storageString) {
    return false;
  }
  return isToday(new Date(storageString));
}
