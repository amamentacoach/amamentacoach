import React, { useState } from 'react';
import { Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import OptionsList from '../../components/OptionList';

import {
  ScrollView,
  Header,
  HeaderTitle,
  CalendarButton,
  DateText,
} from './styles';

import CalendarIcon from '../../../assets/images/icons/ic_calendar.png';

const HowToBreastFeed: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());

  const options = [
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Registro de retiradas de leite',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/diary_smile.png'),
      title: 'Sentimentos',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/diary_star.png'),
      title: 'Metas',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_heart.png'),
      title: 'Ajuda recebida',
      onPress: () => {},
    },
  ];

  function formatCurrentDate() {
    const day = currentDate.format('DD');
    const dayName = currentDate.format('dddd');
    const capitalizedDayName =
      dayName.charAt(0).toUpperCase() + dayName.slice(1);

    const month = currentDate.format('MMMM').toString();
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    const year = currentDate.format('YYYY');

    return `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
  }

  function handleDateSelected(selectedDate?: Date) {
    if (selectedDate) {
      setCurrentDate(moment(selectedDate));
    }
    setShowCalendar(false);
  }

  return (
    <ScrollView>
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentDate.toDate()}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={(_: Event, selectedDate?: Date | undefined) =>
            handleDateSelected(selectedDate)
          }
        />
      )}

      <Header>
        <HeaderTitle>Diário</HeaderTitle>
        <CalendarButton
          onPress={() => setShowCalendar(true)}
          activeOpacity={0.7}>
          <Image source={CalendarIcon} />
        </CalendarButton>
      </Header>
      <DateText>{formatCurrentDate()}</DateText>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default HowToBreastFeed;
