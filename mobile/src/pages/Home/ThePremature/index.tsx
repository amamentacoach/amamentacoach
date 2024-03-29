import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import OptionsList from 'components/OptionList';
import PaddedScrollView from 'components/PaddedScrollView';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import IcVideo from '@assets/images/ic_video.svg';
import PrematureBreastfeed from '@assets/images/premature_breastfeed.svg';
import PrematureSurvey from '@assets/images/premature_survey.svg';

const ThePremature: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const options: OptionListEntry[] = [
    {
      image: { source: IcVideo },
      title: i18n.t('ThePrematurePage.Option1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: { source: PrematureSurvey },
      title: i18n.t('ThePrematurePage.Option2'),
      onPress: () => navigation.navigate('SurveyBreastfeed'),
    },
    {
      image: { source: PrematureBreastfeed },
      title: i18n.t('ThePrematurePage.Option3'),
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.ThePremature },
    });
  }, []);

  return (
    <PaddedScrollView>
      <OptionsList options={options} />
    </PaddedScrollView>
  );
};

export default ThePremature;
