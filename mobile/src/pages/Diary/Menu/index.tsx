import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useAuth } from '../../../contexts/auth';
import { useIsFirstRun } from '../../../contexts/firstRun';
import { setDiaryPageOpened } from '../../../services/telemetry';
import { checkOneDayPassed, dateFormatVerbose } from '../../../utils/date';
import OptionsList from '../../../components/OptionList';

import {
  ScrollView,
  Header,
  HeaderTitle,
  CalendarButton,
  DateText,
} from './styles';

import CalendarIcon from '../../../../assets/images/icons/ic_calendar.png';
import Modal from '../../../components/Modal';

const DiaryMenu: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();

  const [isModalVisible, setIsModalVisible] = useState(false);
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
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (await checkOneDayPassed('@AmamentaCoach:DiaryFeelingsLastDate')) {
          navigation.navigate('Feelings');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: require('../../../../assets/images/diary_star.png'),
      title: 'Metas',
      onPress: () => navigation.navigate('Goals'),
    },
    {
      image: require('../../../../assets/images/premature_heart.png'),
      title: 'Ajuda recebida',
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          await checkOneDayPassed('@AmamentaCoach:DiaryHelpReceivedLastDate')
        ) {
          navigation.navigate('HelpReceived');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: require('../../../../assets/images/emotions_info.png'),
      title: 'Meu Desempenho',
      onPress: () => navigation.navigate('Report'),
    },
  ];

  // Exibe o upload de imagem do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options.splice(5, 0, {
      image: require('../../../../assets/images/father.png'),
      title: 'Participação do Pai',
      // @ts-ignore
      subtitle: 'Registre e acompanhe a participação do papai',
      onPress: () => navigation.navigate('UploadFatherPhoto'),
    });
  }

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
    <>
      <Modal
        content="Ops! Você já respondeu a enquete hoje. Volte novamente amanhã."
        options={[
          {
            text: 'Fechar',
            onPress: () => setIsModalVisible(false),
          },
        ]}
        visible={isModalVisible}
      />
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
    </>
  );
};

export default DiaryMenu;
