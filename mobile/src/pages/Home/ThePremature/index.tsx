import React from 'react';

import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import IcVideo from '../../../../assets/images/ic_video.svg';
import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';
import PrematureSurvey from '../../../../assets/images/premature_survey.svg';

const ThePremature: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: IcVideo,
      title: i18n.t('ThePrematurePage.Option1'),
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: PrematureSurvey,
      title: i18n.t('ThePrematurePage.Option2'),
      onPress: () => navigation.navigate('SurveyBreastfeed'),
    },
    {
      image: PrematureBreastfeed,
      title: i18n.t('ThePrematurePage.Option3'),
      onPress: () => navigation.navigate('StepByStepPremature'),
    },
  ];

  return (
    <ScrollView>
      <OptionsList options={options} />
    </ScrollView>
  );
};

export default ThePremature;
