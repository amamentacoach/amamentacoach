import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useAuth } from '../../../contexts/auth';
import { useIsFirstRun } from '../../../contexts/firstRun';
import { setDiaryPageOpened } from '../../../services/telemetry';
import { checkOneDayPassed, dateFormatVerbose } from '../../../utils/date';
import OptionsList, { OptionList } from '../../../components/OptionList';
import Modal from '../../../components/Modal';

import {
  ScrollView,
  Header,
  HeaderTitle,
  CalendarButton,
  DateText,
} from './styles';

import Baby from '../../../../assets/images/canguru.svg';
import CalendarIcon from '../../../../assets/images/icons/ic_calendar.svg';
import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';
import DiarySmile from '../../../../assets/images/diary_smile.svg';
import DiaryStar from '../../../../assets/images/diary_star.svg';
import PrematureHeart from '../../../../assets/images/premature_heart.svg';
import Report from '../../../../assets/images/report.svg';
import Father from '../../../../assets/images/father.svg';

const DiaryMenu: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  const options: OptionList[] = [
    {
      Image: PrematureBreastfeed,
      title: 'Registro de amamentação',
      onPress: () =>
        navigation.navigate('DiaryBreastfeed', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      Image: PrematureBreastfeed,
      title: 'Registro de retiradas de leite',
      onPress: () =>
        navigation.navigate('DiaryRegistry', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      Image: DiarySmile,
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
      Image: DiaryStar,
      title: 'Metas',
      onPress: () => navigation.navigate('Goals'),
    },
    {
      Image: PrematureHeart,
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
      Image: Baby,
      title: 'Meu Bebê Hoje',
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (await checkOneDayPassed('@AmamentaCoach:DiaryDiaryBabyLastDate')) {
          navigation.navigate('DiaryBaby');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      Image: Report,
      title: 'Meu Desempenho',
      onPress: () => navigation.navigate('Report'),
    },
  ];

  // Exibe o upload de imagem do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options.splice(6, 0, {
      Image: Father,
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
            <CalendarIcon />
          </CalendarButton>
        </Header>
        <DateText>{dateFormatVerbose(selectedDate)}</DateText>
        <OptionsList options={options} />
      </ScrollView>
    </>
  );
};

export default DiaryMenu;
