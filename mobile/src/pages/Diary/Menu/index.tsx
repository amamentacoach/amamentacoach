import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useIsFirstRun } from '../../../contexts/firstRun';
import { setDiaryPageOpened } from '../../../services/telemetry';
import dateFormatVerbose from '../../../utils/date';
import OptionsList from '../../../components/OptionList';

import {
  ScrollView,
  Header,
  HeaderTitle,
  CalendarButton,
  DateText,
} from './styles';

import CalendarIcon from '../../../../assets/images/icons/ic_calendar.png';

const DiaryMenu: React.FC = () => {
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  const options = [
    {
      image: require('../../../../assets/images/premature_breastfeed.png'),
      title: 'Registro de amamentação',
      onPress: () =>
        navigation.navigate('DiaryBreastfeed', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      image: require('../../../../assets/images/premature_breastfeed.png'),
      title: 'Registro de retiradas de leite',
      onPress: () =>
        navigation.navigate('DiaryRegistry', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      image: require('../../../../assets/images/diary_smile.png'),
      title: 'Sentimentos',
      onPress: () => navigation.navigate('Feelings'),
    },
    {
      image: require('../../../../assets/images/diary_star.png'),
      title: 'Metas',
      onPress: () => navigation.navigate('Goals'),
    },
    {
      image: require('../../../../assets/images/premature_heart.png'),
      title: 'Ajuda recebida',
      onPress: () => navigation.navigate('HelpReceived'),
    },
    {
      image: require('../../../../assets/images/emotions_info.png'),
      title: 'Relatório',
      onPress: () => navigation.navigate('Report'),
    },
  ];

  useEffect(() => {
    if (isFirstRun.temporary.diary) {
      setDiaryPageOpened();
      setTemporaryNotFirstRun('diary');
    }
  }, []);

  function handleDateSelected(date?: Date) {
    setShowCalendar(false);
    if (date) {
      setSelectedDate(moment(date));
    }
  }

  return (
    <ScrollView>
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate.toDate()}
          mode="date"
          maximumDate={new Date()}
          onChange={(_: Event, date?: Date) => handleDateSelected(date)}
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
      <DateText>{dateFormatVerbose(selectedDate)}</DateText>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default DiaryMenu;
