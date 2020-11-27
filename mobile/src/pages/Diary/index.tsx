import React, { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../utils/date';
import OptionsList from '../../components/OptionList';

import {
  ScrollView,
  Header,
  HeaderTitle,
  CalendarButton,
  DateText,
} from './styles';

import CalendarIcon from '../../../assets/images/icons/ic_calendar.png';

const Diary: React.FC = () => {
  const navigation = useNavigation();
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());

  const options = [
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Registro de retiradas de leite',
      onPress: () => {
        navigation.navigate('DiaryRegistry');
      },
    },
    {
      image: require('../../../assets/images/diary_smile.png'),
      title: 'Sentimentos',
      onPress: () => {
        navigation.navigate('Feelings');
      },
    },
    {
      image: require('../../../assets/images/diary_star.png'),
      title: 'Metas',
      onPress: () => {
        navigation.navigate('Goals');
      },
    },
    {
      image: require('../../../assets/images/premature_heart.png'),
      title: 'Ajuda recebida',
      onPress: () => {
        navigation.navigate('HelpReceived');
      },
    },
  ];

  function handleDateSelected(selectedDate?: Date) {
    setShowCalendar(false);
    if (selectedDate) {
      setCurrentDate(moment(selectedDate));
    }
  }

  return (
    <ScrollView>
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentDate.toDate()}
          mode="date"
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
      <DateText>{dateFormatVerbose(currentDate)}</DateText>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default Diary;
