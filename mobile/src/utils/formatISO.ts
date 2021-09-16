import { format } from 'lib/date-fns';

// Retorna uma string no formato ISO-8601 ("yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), contendo informação
// sobre o fuso horário do usuário.
export default function formatISO(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}
