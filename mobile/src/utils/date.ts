import { Moment } from 'moment';
import 'moment/locale/pt-br';

// Formata uma data no formato Quarta-Feira, 01 de Janeiro de 2020
function dateFormatVerbose(date: Moment) {
  const day = date.format('DD');
  const dayName = date.format('dddd');
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  const month = date.format('MMMM').toString();
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const year = date.format('YYYY');

  return `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
}

export default dateFormatVerbose;
