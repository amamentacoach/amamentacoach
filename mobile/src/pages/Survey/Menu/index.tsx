import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import { useAuth } from 'contexts/auth';
import { storageIsToday } from 'lib/date-fns';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import { Header, HeaderTitle, ScrollView } from './styles';

import SurveysFour from '@assets/images/surveys_four.svg';
import SurveysOne from '@assets/images/surveys_one.svg';
import SurveysThree from '@assets/images/surveys_three.svg';
import SurveysTwo from '@assets/images/surveys_two.svg';

const SurveyMenu: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);

  let options: OptionListEntry[] = [
    {
      image: SurveysOne,
      title: i18n.t('PrematureBreastfeed'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          !(await storageIsToday(
            '@AmamentaCoach:DiarySurveyBreastfeedLastDate',
          ))
        ) {
          navigation.navigate('SurveyBreastfeed');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: SurveysTwo,
      title: i18n.t('SurveyTitles.SurveyMotivation'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (
          !(await storageIsToday(
            '@AmamentaCoach:DiarySurveyMotivationLastDate',
          ))
        ) {
          navigation.navigate('SurveyMotivation');
        } else {
          setIsModalVisible(true);
        }
      },
    },
    {
      image: SurveysThree,
      title: i18n.t('SurveyTitles.SurveyHelp'),
      onPress: async () => {
        // Checa se o usuário já respondeu o formulário no dia.
        if (!(await storageIsToday('@AmamentaCoach:DiarySurveyHelpLastDate'))) {
          navigation.navigate('SurveyHelp');
        } else {
          setIsModalVisible(true);
        }
      },
    },
  ];

  // Exibe o formulário de participação do pai apenas se a mãe tem um companheiro.
  if (motherInfo.partner) {
    options = [
      ...options,
      {
        image: SurveysFour,
        title: i18n.t('SurveyMenuPage.Father'),
        onPress: async () => {
          // Checa se o usuário já respondeu o formulário no dia.
          if (
            !(await storageIsToday('@AmamentaCoach:DiarySurveyFatherLastDate'))
          ) {
            navigation.navigate('SurveyFather');
          } else {
            setIsModalVisible(true);
          }
        },
      },
    ];
  }

  useEffect(() => {
    if (isFocused) {
      createTelemetryAction({
        action: Action.Opened,
        context: { screen: AppScreen.SurveyMenu },
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
      <ScrollView>
        <Header>
          <HeaderTitle>{i18n.t('Surveys', { count: 2 })}</HeaderTitle>
        </Header>
        <OptionsList options={options} />
      </ScrollView>
    </>
  );
};

export default SurveyMenu;
