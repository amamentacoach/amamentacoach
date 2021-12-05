import { Action, AppScreen } from '@common/telemetria';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import { useAuth } from 'contexts/auth';
import { dateFormatVerbose, storageIsToday } from 'lib/date-fns';
import { PaddedScrollView } from 'lib/SharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { CalendarButton, DateText, Header, HeaderTitle } from './styles';

import Baby from '@assets/images/canguru.svg';
import DiarySmile from '@assets/images/diary_smile.svg';
import DiaryStar from '@assets/images/diary_star.svg';
import Father from '@assets/images/father.svg';
import CalendarIcon from '@assets/images/icons/ic_calendar.svg';
import PrematureBreastfeed from '@assets/images/premature_breastfeed.svg';
import PrematureHeart from '@assets/images/premature_heart.svg';
import Report from '@assets/images/report.svg';

const DiaryMenu: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const options: OptionListEntry[] = [
    {
      image: PrematureBreastfeed,
      title: i18n.t('DiaryMenuPage.Option1'),
      onPress: () =>
        navigation.navigate('DiaryBreastfeed', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      image: PrematureBreastfeed,
      title: i18n.t('DiaryMenuPage.Option2'),
      onPress: () =>
        navigation.navigate('DiaryRegistry', {
          date: selectedDate.toISOString(),
        }),
    },
    {
      image: DiarySmile,
      title: i18n.t('DiaryMenuPage.Option3'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (!(await storageIsToday('@AmamentaCoach:DiaryFeelingsLastDate'))) {
          navigation.navigate('Feelings');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: DiaryStar,
      title: i18n.t('DiaryMenuPage.Option4'),
      onPress: () => navigation.navigate('Goals'),
    },
    {
      image: PrematureHeart,
      title: i18n.t('DiaryMenuPage.Option5'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          !(await storageIsToday('@AmamentaCoach:DiaryHelpReceivedLastDate'))
        ) {
          navigation.navigate('HelpReceived');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: Baby,
      title: i18n.t('DiaryMenuPage.Option6'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (!(await storageIsToday('@AmamentaCoach:DiaryBabyLastDate'))) {
          navigation.navigate('DiaryBaby');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: Baby,
      title: i18n.t('DiaryMenuPage.Option7'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (!(await storageIsToday('@AmamentaCoach:DiaryActionsLastDate'))) {
          navigation.navigate('DiaryActions');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: Report,
      title: i18n.t('DiaryMenuPage.Option8'),
      onPress: () => navigation.navigate('Report'),
    },
  ];

  // Exibe o upload de imagem do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options.splice(7, 0, {
      image: Father,
      title: i18n.t('DiaryMenuPage.Option9'),
      subtitle: i18n.t('DiaryMenuPage.SubtextOption9'),
      onPress: () => navigation.navigate('UploadFatherPhoto'),
    });
  }

  function handleDateSelected(date?: Date): void {
    setShowCalendar(false);
    if (date) {
      setSelectedDate(new Date(date));
    }
  }

  useEffect(() => {
    if (isFocused) {
      createTelemetryAction({
        action: Action.Opened,
        context: { screen: AppScreen.DiaryMenu },
      });
    }
  }, [isFocused]);

  return (
    <>
      <Modal
        content={i18n.t('ErrorSurveyAlreadyAnswered')}
        options={[
          {
            text: i18n.t('Close'),
            onPress: () => setIsModalVisible(false),
          },
        ]}
        visible={isModalVisible}
      />
      <PaddedScrollView>
        {showCalendar && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            maximumDate={new Date()}
            onChange={(_: Event, date?: Date) => handleDateSelected(date)}
          />
        )}

        <Header>
          <HeaderTitle>{i18n.t('Diary')}</HeaderTitle>
          <CalendarButton
            onPress={() => setShowCalendar(true)}
            activeOpacity={0.7}>
            <CalendarIcon />
          </CalendarButton>
        </Header>
        <DateText>{dateFormatVerbose(selectedDate)}</DateText>
        <OptionsList options={options} />
      </PaddedScrollView>
    </>
  );
};

export default DiaryMenu;
