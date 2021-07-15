import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList, { Options } from '../../../components/OptionList';

import ScrollView from './styles';

import IcVideo from '../../../../assets/images/ic_video.svg';
import PrematureSurvey from '../../../../assets/images/premature_survey.svg';
import PrematureBreastfeed from '../../../../assets/images/premature_breastfeed.svg';

const ThePremature: React.FC = () => {
  const navigation = useNavigation();
  const options: Options[] = [
    {
      image: IcVideo,
      title: 'Vídeo “Muito prazer, eu sou o prematuro”',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: PrematureSurvey,
      title: 'Enquete: Amamentar um prematuro',
      onPress: () => navigation.navigate('SurveyBreastfeed'),
    },
    {
      image: PrematureBreastfeed,
      title: 'Infográfico: 6 passos para a amamentação',
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
