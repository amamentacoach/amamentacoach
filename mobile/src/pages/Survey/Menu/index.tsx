import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import PaddedScrollView from 'components/PaddedScrollView';
import { useAuth } from 'contexts/auth';
import { storageIsToday } from 'lib/date-fns';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackParamList, RootStackProps } from 'routes/app';

import { Header, HeaderTitle } from './styles';

import SurveysFour from '@assets/images/surveys_four.svg';
import SurveysOne from '@assets/images/surveys_one.svg';
import SurveysThree from '@assets/images/surveys_three.svg';
import SurveysTwo from '@assets/images/surveys_two.svg';

const SurveyMenu: React.FC = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation<RootStackProps>();
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function navigateIfFirstRun(
    storageId: string,
    pageName: keyof RootStackParamList,
  ): Promise<void> {
    if (!(await storageIsToday(storageId))) {
      navigation.navigate(pageName);
    } else {
      setIsModalVisible(true);
    }
  }

  let options: OptionListEntry[] = [
    {
      image: { source: SurveysOne },
      title: i18n.t('SurveyTitles.SurveyBreastfeed'),
      onPress: () =>
        navigateIfFirstRun(
          '@AmamentaCoach:DiarySurveyBreastfeedLastDate',
          'SurveyBreastfeed',
        ),
    },
    {
      image: { source: SurveysTwo },
      title: i18n.t('SurveyTitles.SurveyMotivation'),
      onPress: () =>
        navigateIfFirstRun(
          '@AmamentaCoach:DiarySurveyMotivationLastDate',
          'SurveyMotivation',
        ),
    },
    {
      image: { source: SurveysThree },
      title: i18n.t('SurveyTitles.SurveyHelp'),
      onPress: () =>
        navigateIfFirstRun(
          '@AmamentaCoach:DiarySurveyHelpLastDate',
          'SurveyHelp',
        ),
    },
  ];

  // Exibe o formulário de participação do pai apenas se a mãe tem um companheiro.
  if (userInfo.hasPartner) {
    options = [
      ...options,
      {
        image: { source: SurveysFour },
        title: i18n.t('SurveyMenuPage.Father'),
        onPress: () =>
          navigateIfFirstRun(
            '@AmamentaCoach:DiarySurveyFatherLastDate',
            'SurveyFather',
          ),
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
      <PaddedScrollView>
        <Header>
          <HeaderTitle>{i18n.t('Survey', { count: 2 })}</HeaderTitle>
        </Header>
        <OptionsList options={options} />
      </PaddedScrollView>
    </>
  );
};

export default SurveyMenu;
