import React from 'react';
import { useNavigation } from '@react-navigation/native';

import OptionsList from '../../components/OptionList';

import ScrollView from './styles';

const ThePremature: React.FC = () => {
  const navigation = useNavigation();
  const options = [
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Vídeo “Muito prazer, eu sou o prematuro”',
      onPress: () =>
        navigation.navigate('VideoPage', { videos: ['w2rbi3aW-rA'] }),
    },
    {
      image: require('../../../assets/images/premature_survey.png'),
      title: 'Enquete: Amamentar um prematuro',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
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
